import md5 from 'md5';

let newMessageCallack = null;
let memberListUpdateCallback = null;

const BASE_API_URL = "https://apps-de-cours.com/web-chat/server/api";

const findGetParameter = parameterName => {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

let k = findGetParameter("k");

if (k != null) {
    localStorage["chat_key"] = k;
    localStorage["username"] = findGetParameter("u");
    window.location.href = "chat.html";
}

export const signin = formNode => {
    localStorage["username"] = formNode.username.value;

    let formData = new FormData();
    formData.append('username', formNode.username.value);
    formData.append('password', md5(formNode.password.value));

    fetch(BASE_API_URL + "/login", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.length == 32) {
            localStorage["chat_key"] = data;
            window.location.href = "chat.html?k=" + localStorage["chat_key"] + "&u=" + localStorage["username"];
        }
        else {
            document.querySelector("#api-message").innerText = data;
        }
    });

    return false;
}

export const signout = () => {
    let formData = new FormData();
    formData.append('key', localStorage["chat_key"]);

    fetch(BASE_API_URL + "/logout", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        localStorage.removeItem("chat_key");
        window.location.href = "index.html";
    });

    return false;
}

export const register = formNode => {
    let formData = new FormData();
    formData.append("username", formNode.username.value);
    formData.append("password", md5(formNode.password.value));
    formData.append("no", formNode.no.value);
    formData.append("welcomeText", formNode.welcomeText.value);
    formData.append("firstName", formNode.firstName.value);
    formData.append("lastName", formNode.lastName.value);

    fetch(BASE_API_URL + "/register", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector("#api-message").innerText = data;
    });

    return false;
}

export const chatMessageLoop = () => {
    let formData = new FormData();
    formData.append('key', localStorage["chat_key"]);

    setTimeout(() => {
        fetch(BASE_API_URL + "/read-messages", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data instanceof Array) {
                data.forEach(msg => {
                    newMessageCallack(msg.nomUsager, msg.message, msg.prive === "true");
                });

                membersLoop();
            }
            else {
                localStorage.removeItem("key");
                window.location.href = "index.html";
            }
        });
    },  1000);
}

export const membersLoop = () => {
    let formData = new FormData();
    formData.append('key', localStorage["chat_key"]);

    setTimeout(() => {
        fetch(BASE_API_URL + "/read-members", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data instanceof Array) {
                memberListUpdateCallback(data);
                chatMessageLoop();
            }
            else {
                localStorage.removeItem("chat_key");
                window.location.href = "index.html";
            }
        });
    },  1000);
}

export const sendMessage = (event, fieldNode) => {
    if (event.which === 13) {
        let val = fieldNode.value;
        fieldNode.value = "";

        val = val.replace(/\n+$/, "");

        let formData = new FormData();
        formData.append('key', localStorage["chat_key"]);
        formData.append('message', val);

        fetch(BASE_API_URL + "/write-message", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
			val = val.replace("/w " + localStorage["username"], "");
            newMessageCallack(localStorage["username"], val, val.indexOf("/w") === 0);
        });
    }

    return false;
}

export const registerCallbacks = (newMessage, memberListUpdate) => {
    newMessageCallack = newMessage;
    memberListUpdateCallback = memberListUpdate;
}