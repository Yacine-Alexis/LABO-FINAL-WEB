/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/chat-api.js":
/*!********************************!*\
  !*** ./client/src/chat-api.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   chatMessageLoop: () => (/* binding */ chatMessageLoop),\n/* harmony export */   membersLoop: () => (/* binding */ membersLoop),\n/* harmony export */   register: () => (/* binding */ register),\n/* harmony export */   registerCallbacks: () => (/* binding */ registerCallbacks),\n/* harmony export */   sendMessage: () => (/* binding */ sendMessage),\n/* harmony export */   signin: () => (/* binding */ signin),\n/* harmony export */   signout: () => (/* binding */ signout)\n/* harmony export */ });\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! md5 */ \"./node_modules/md5/md5.js\");\n/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nlet newMessageCallack = null;\r\nlet memberListUpdateCallback = null;\r\n\r\nconst BASE_API_URL = \"https://apps-de-cours.com/web-chat/server/api\";\r\n\r\nconst findGetParameter = parameterName => {\r\n    var result = null,\r\n        tmp = [];\r\n    location.search\r\n        .substr(1)\r\n        .split(\"&\")\r\n        .forEach(function (item) {\r\n          tmp = item.split(\"=\");\r\n          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);\r\n        });\r\n    return result;\r\n}\r\n\r\nlet k = findGetParameter(\"k\");\r\n\r\nif (k != null) {\r\n    localStorage[\"chat_key\"] = k;\r\n    localStorage[\"username\"] = findGetParameter(\"u\");\r\n    window.location.href = \"chat.html\";\r\n}\r\n\r\nconst signin = formNode => {\r\n    localStorage[\"username\"] = formNode.username.value;\r\n\r\n    let formData = new FormData();\r\n    formData.append('username', formNode.username.value);\r\n    formData.append('password', md5__WEBPACK_IMPORTED_MODULE_0___default()(formNode.password.value));\r\n\r\n    fetch(BASE_API_URL + \"/login\", {\r\n        method: \"POST\",\r\n        body: formData,\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        if (data.length == 32) {\r\n            localStorage[\"chat_key\"] = data;\r\n            window.location.href = \"chat.html?k=\" + localStorage[\"chat_key\"] + \"&u=\" + localStorage[\"username\"];\r\n        }\r\n        else {\r\n            document.querySelector(\"#api-message\").innerText = data;\r\n        }\r\n    });\r\n\r\n    return false;\r\n}\r\n\r\nconst signout = () => {\r\n    let formData = new FormData();\r\n    formData.append('key', localStorage[\"chat_key\"]);\r\n\r\n    fetch(BASE_API_URL + \"/logout\", {\r\n        method: \"POST\",\r\n        body: formData\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        localStorage.removeItem(\"chat_key\");\r\n        window.location.href = \"index.html\";\r\n    });\r\n\r\n    return false;\r\n}\r\n\r\nconst register = formNode => {\r\n    let formData = new FormData();\r\n    formData.append(\"username\", formNode.username.value);\r\n    formData.append(\"password\", md5__WEBPACK_IMPORTED_MODULE_0___default()(formNode.password.value));\r\n    formData.append(\"no\", formNode.no.value);\r\n    formData.append(\"welcomeText\", formNode.welcomeText.value);\r\n    formData.append(\"firstName\", formNode.firstName.value);\r\n    formData.append(\"lastName\", formNode.lastName.value);\r\n\r\n    fetch(BASE_API_URL + \"/register\", {\r\n        method: \"POST\",\r\n        body: formData\r\n    })\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        document.querySelector(\"#api-message\").innerText = data;\r\n    });\r\n\r\n    return false;\r\n}\r\n\r\nconst chatMessageLoop = () => {\r\n    let formData = new FormData();\r\n    formData.append('key', localStorage[\"chat_key\"]);\r\n\r\n    setTimeout(() => {\r\n        fetch(BASE_API_URL + \"/read-messages\", {\r\n            method: \"POST\",\r\n            body: formData\r\n        })\r\n        .then(response => response.json())\r\n        .then(data => {\r\n            if (data instanceof Array) {\r\n                data.forEach(msg => {\r\n                    newMessageCallack(msg.nomUsager, msg.message, msg.prive === \"true\");\r\n                });\r\n\r\n                membersLoop();\r\n            }\r\n            else {\r\n                localStorage.removeItem(\"key\");\r\n                window.location.href = \"index.html\";\r\n            }\r\n        });\r\n    },  1000);\r\n}\r\n\r\nconst membersLoop = () => {\r\n    let formData = new FormData();\r\n    formData.append('key', localStorage[\"chat_key\"]);\r\n\r\n    setTimeout(() => {\r\n        fetch(BASE_API_URL + \"/read-members\", {\r\n            method: \"POST\",\r\n            body: formData\r\n        })\r\n        .then(response => response.json())\r\n        .then(data => {\r\n            if (data instanceof Array) {\r\n                memberListUpdateCallback(data);\r\n                chatMessageLoop();\r\n            }\r\n            else {\r\n                localStorage.removeItem(\"chat_key\");\r\n                window.location.href = \"index.html\";\r\n            }\r\n        });\r\n    },  1000);\r\n}\r\n\r\nconst sendMessage = (event, fieldNode) => {\r\n    if (event.which === 13) {\r\n        let val = fieldNode.value;\r\n        fieldNode.value = \"\";\r\n\r\n        val = val.replace(/\\n+$/, \"\");\r\n\r\n        let formData = new FormData();\r\n        formData.append('key', localStorage[\"chat_key\"]);\r\n        formData.append('message', val);\r\n\r\n        fetch(BASE_API_URL + \"/write-message\", {\r\n            method: \"POST\",\r\n            body: formData\r\n        })\r\n        .then(response => response.json())\r\n        .then(data => {\r\n\t\t\tval = val.replace(\"/w \" + localStorage[\"username\"], \"\");\r\n            newMessageCallack(localStorage[\"username\"], val, val.indexOf(\"/w\") === 0);\r\n        });\r\n    }\r\n\r\n    return false;\r\n}\r\n\r\nconst registerCallbacks = (newMessage, memberListUpdate) => {\r\n    newMessageCallack = newMessage;\r\n    memberListUpdateCallback = memberListUpdate;\r\n}\n\n//# sourceURL=webpack://labfinal/./client/src/chat-api.js?");

/***/ }),

/***/ "./client/src/page-chat.js":
/*!*********************************!*\
  !*** ./client/src/page-chat.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat-api */ \"./client/src/chat-api.js\");\n\r\n\r\n\r\nlet selectedPiece = null;\r\nwindow.addEventListener(\"load\", () => {\r\n    document.querySelector(\"textarea\").onkeyup = function (evt) {\r\n        (0,_chat_api__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(evt, this)\r\n    };\r\n    document.querySelector(\"#sign-out-btn\").onclick = _chat_api__WEBPACK_IMPORTED_MODULE_0__.signout;\r\n    (0,_chat_api__WEBPACK_IMPORTED_MODULE_0__.registerCallbacks)(newMessage, memberListUpdate);\r\n    (0,_chat_api__WEBPACK_IMPORTED_MODULE_0__.chatMessageLoop)();\r\n\r\n\r\n//  --------------- NEW -------------------\r\n    const chessboard = document.getElementById(\"board\")\r\n    initializeChessboard();\r\n    \r\n    initializePieces();\r\n    chessboard.addEventListener('click', handleSquareClick());\r\n\r\n})\r\nconst initializeChessboard  = () => {\r\n    const chessboard = document.getElementById('board')\r\n    for (let row = 0; row < 8; row++) {\r\n        for (let col = 0; col < 8; col++) {\r\n          const square = document.createElement('div');\r\n          square.classList.add('cell');\r\n          square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');\r\n          square.dataset.row = row;\r\n          square.dataset.col = col;\r\n          // Add click event listener for moves\r\n          square.addEventListener('click', (event) => {\r\n            const clickedSquare = event.target;\r\n            const row = parseInt(clickedSquare.dataset.row, 10);\r\n            const col = parseInt(clickedSquare.dataset.col, 10);\r\n            handleSquareClick(row,col);\r\n          });\r\n          chessboard.appendChild(square);\r\n        }\r\n      }\r\n}\r\nconst getPiece = (row, col) => {\r\n  const pieces = [\r\n    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',\r\n    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',\r\n    '', '', '', '', '', '', '', '',\r\n    '', '', '', '', '', '', '', '',\r\n    '', '', '', '', '', '', '', '',\r\n    '', '', '', '', '', '', '', '',\r\n    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',\r\n    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',\r\n  ];\r\n\r\nreturn pieces[row * 8 + col];\r\n}\r\nconst initializePieces = () => {\r\n    const pieces = [\r\n      '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',\r\n      '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',\r\n      '', '', '', '', '', '', '', '',\r\n      '', '', '', '', '', '', '', '',\r\n      '', '', '', '', '', '', '', '',\r\n      '', '', '', '', '', '', '', '',\r\n      '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',\r\n      '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',\r\n    ];\r\n\r\n    const squares = document.querySelectorAll('.cell');\r\n    squares.forEach((square, index) => {\r\n      if (pieces[index] !== '') {\r\n        const piece = document.createElement('div');\r\n        piece.innerText = pieces[index];\r\n        square.appendChild(piece);\r\n      }\r\n    });\r\n  }\r\n// Handle square click event\r\nconst handleSquareClick = (row, col) => {\r\n  const clickedPiece = getPiece(row, col)\r\n\r\n  if (selectedPiece) {\r\n    console.log(`Move ${selectedPiece} from (${selectedPiece.dataset.row}, ${selectedPiece.dataset.col}) to (${row}, ${col})`);\r\n    selectedPiece = null;\r\n  } else if (clickedPiece !== '') {\r\n    console.log(`Select ${clickedPiece} at (${row}, ${col})`);\r\n    selectedPiece = { row, col, piece: clickedPiece };\r\n}\r\n}\r\n\r\n// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée\r\nconst newMessage = (fromUser, message, isPrivate) => {\r\n    let parentNode = document.querySelector(\".chat\");\r\n    let nodeDiv = document.createElement(\"div\");\r\n    let nodeMessage = document.createElement(\"span\");\r\n\r\n    nodeMessage.innerText = String(fromUser) + \" : \" + String(message);\r\n    \r\n    nodeDiv.appendChild(nodeMessage);\r\n    parentNode.appendChild(nodeDiv);\r\n}\r\n// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres connectés dans votre interface.\r\n\r\nconst memberListUpdate = members => {\r\n  let parentNode = document.querySelector(\".members-container\");\r\n  // Clear existing content in .members-container\r\n  parentNode.innerHTML = \"\";\r\n  for (let i = 0; i < members.length; i++) {\r\n      let nodeDiv = document.createElement(\"div\");\r\n\r\n      // Create an image element and append it to the nodeDiv\r\n      let nodeImg = document.createElement(\"img\");\r\n      nodeImg.src = \"img/greenCircle.png\";\r\n      nodeImg.alt = \"Member Image\";\r\n      nodeImg.style.width = \"8px\"; \r\n      nodeImg.style.margin = \"4px\";\r\n      nodeDiv.appendChild(nodeImg);\r\n\r\n      let nodeName = document.createElement(\"span\");\r\n      nodeName.innerText = String(members[i]);\r\n      nodeDiv.appendChild(nodeName);\r\n      parentNode.appendChild(nodeDiv);\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://labfinal/./client/src/page-chat.js?");

/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/***/ ((module) => {

eval("var charenc = {\n  // UTF-8 encoding\n  utf8: {\n    // Convert a string to a byte array\n    stringToBytes: function(str) {\n      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));\n    },\n\n    // Convert a byte array to a string\n    bytesToString: function(bytes) {\n      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));\n    }\n  },\n\n  // Binary encoding\n  bin: {\n    // Convert a string to a byte array\n    stringToBytes: function(str) {\n      for (var bytes = [], i = 0; i < str.length; i++)\n        bytes.push(str.charCodeAt(i) & 0xFF);\n      return bytes;\n    },\n\n    // Convert a byte array to a string\n    bytesToString: function(bytes) {\n      for (var str = [], i = 0; i < bytes.length; i++)\n        str.push(String.fromCharCode(bytes[i]));\n      return str.join('');\n    }\n  }\n};\n\nmodule.exports = charenc;\n\n\n//# sourceURL=webpack://labfinal/./node_modules/charenc/charenc.js?");

/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/***/ ((module) => {

eval("(function() {\n  var base64map\n      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',\n\n  crypt = {\n    // Bit-wise rotation left\n    rotl: function(n, b) {\n      return (n << b) | (n >>> (32 - b));\n    },\n\n    // Bit-wise rotation right\n    rotr: function(n, b) {\n      return (n << (32 - b)) | (n >>> b);\n    },\n\n    // Swap big-endian to little-endian and vice versa\n    endian: function(n) {\n      // If number given, swap endian\n      if (n.constructor == Number) {\n        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;\n      }\n\n      // Else, assume array and swap all items\n      for (var i = 0; i < n.length; i++)\n        n[i] = crypt.endian(n[i]);\n      return n;\n    },\n\n    // Generate an array of any length of random bytes\n    randomBytes: function(n) {\n      for (var bytes = []; n > 0; n--)\n        bytes.push(Math.floor(Math.random() * 256));\n      return bytes;\n    },\n\n    // Convert a byte array to big-endian 32-bit words\n    bytesToWords: function(bytes) {\n      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)\n        words[b >>> 5] |= bytes[i] << (24 - b % 32);\n      return words;\n    },\n\n    // Convert big-endian 32-bit words to a byte array\n    wordsToBytes: function(words) {\n      for (var bytes = [], b = 0; b < words.length * 32; b += 8)\n        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);\n      return bytes;\n    },\n\n    // Convert a byte array to a hex string\n    bytesToHex: function(bytes) {\n      for (var hex = [], i = 0; i < bytes.length; i++) {\n        hex.push((bytes[i] >>> 4).toString(16));\n        hex.push((bytes[i] & 0xF).toString(16));\n      }\n      return hex.join('');\n    },\n\n    // Convert a hex string to a byte array\n    hexToBytes: function(hex) {\n      for (var bytes = [], c = 0; c < hex.length; c += 2)\n        bytes.push(parseInt(hex.substr(c, 2), 16));\n      return bytes;\n    },\n\n    // Convert a byte array to a base-64 string\n    bytesToBase64: function(bytes) {\n      for (var base64 = [], i = 0; i < bytes.length; i += 3) {\n        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];\n        for (var j = 0; j < 4; j++)\n          if (i * 8 + j * 6 <= bytes.length * 8)\n            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));\n          else\n            base64.push('=');\n      }\n      return base64.join('');\n    },\n\n    // Convert a base-64 string to a byte array\n    base64ToBytes: function(base64) {\n      // Remove non-base-64 characters\n      base64 = base64.replace(/[^A-Z0-9+\\/]/ig, '');\n\n      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;\n          imod4 = ++i % 4) {\n        if (imod4 == 0) continue;\n        bytes.push(((base64map.indexOf(base64.charAt(i - 1))\n            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))\n            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));\n      }\n      return bytes;\n    }\n  };\n\n  module.exports = crypt;\n})();\n\n\n//# sourceURL=webpack://labfinal/./node_modules/crypt/crypt.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack://labfinal/./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("(function(){\r\n  var crypt = __webpack_require__(/*! crypt */ \"./node_modules/crypt/crypt.js\"),\r\n      utf8 = (__webpack_require__(/*! charenc */ \"./node_modules/charenc/charenc.js\").utf8),\r\n      isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\"),\r\n      bin = (__webpack_require__(/*! charenc */ \"./node_modules/charenc/charenc.js\").bin),\r\n\r\n  // The core\r\n  md5 = function (message, options) {\r\n    // Convert to byte array\r\n    if (message.constructor == String)\r\n      if (options && options.encoding === 'binary')\r\n        message = bin.stringToBytes(message);\r\n      else\r\n        message = utf8.stringToBytes(message);\r\n    else if (isBuffer(message))\r\n      message = Array.prototype.slice.call(message, 0);\r\n    else if (!Array.isArray(message) && message.constructor !== Uint8Array)\r\n      message = message.toString();\r\n    // else, assume byte array already\r\n\r\n    var m = crypt.bytesToWords(message),\r\n        l = message.length * 8,\r\n        a =  1732584193,\r\n        b = -271733879,\r\n        c = -1732584194,\r\n        d =  271733878;\r\n\r\n    // Swap endian\r\n    for (var i = 0; i < m.length; i++) {\r\n      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |\r\n             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;\r\n    }\r\n\r\n    // Padding\r\n    m[l >>> 5] |= 0x80 << (l % 32);\r\n    m[(((l + 64) >>> 9) << 4) + 14] = l;\r\n\r\n    // Method shortcuts\r\n    var FF = md5._ff,\r\n        GG = md5._gg,\r\n        HH = md5._hh,\r\n        II = md5._ii;\r\n\r\n    for (var i = 0; i < m.length; i += 16) {\r\n\r\n      var aa = a,\r\n          bb = b,\r\n          cc = c,\r\n          dd = d;\r\n\r\n      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);\r\n      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);\r\n      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);\r\n      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);\r\n      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);\r\n      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);\r\n      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);\r\n      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);\r\n      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);\r\n      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);\r\n      c = FF(c, d, a, b, m[i+10], 17, -42063);\r\n      b = FF(b, c, d, a, m[i+11], 22, -1990404162);\r\n      a = FF(a, b, c, d, m[i+12],  7,  1804603682);\r\n      d = FF(d, a, b, c, m[i+13], 12, -40341101);\r\n      c = FF(c, d, a, b, m[i+14], 17, -1502002290);\r\n      b = FF(b, c, d, a, m[i+15], 22,  1236535329);\r\n\r\n      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);\r\n      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);\r\n      c = GG(c, d, a, b, m[i+11], 14,  643717713);\r\n      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);\r\n      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);\r\n      d = GG(d, a, b, c, m[i+10],  9,  38016083);\r\n      c = GG(c, d, a, b, m[i+15], 14, -660478335);\r\n      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);\r\n      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);\r\n      d = GG(d, a, b, c, m[i+14],  9, -1019803690);\r\n      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);\r\n      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);\r\n      a = GG(a, b, c, d, m[i+13],  5, -1444681467);\r\n      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);\r\n      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);\r\n      b = GG(b, c, d, a, m[i+12], 20, -1926607734);\r\n\r\n      a = HH(a, b, c, d, m[i+ 5],  4, -378558);\r\n      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);\r\n      c = HH(c, d, a, b, m[i+11], 16,  1839030562);\r\n      b = HH(b, c, d, a, m[i+14], 23, -35309556);\r\n      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);\r\n      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);\r\n      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);\r\n      b = HH(b, c, d, a, m[i+10], 23, -1094730640);\r\n      a = HH(a, b, c, d, m[i+13],  4,  681279174);\r\n      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);\r\n      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);\r\n      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);\r\n      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);\r\n      d = HH(d, a, b, c, m[i+12], 11, -421815835);\r\n      c = HH(c, d, a, b, m[i+15], 16,  530742520);\r\n      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);\r\n\r\n      a = II(a, b, c, d, m[i+ 0],  6, -198630844);\r\n      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);\r\n      c = II(c, d, a, b, m[i+14], 15, -1416354905);\r\n      b = II(b, c, d, a, m[i+ 5], 21, -57434055);\r\n      a = II(a, b, c, d, m[i+12],  6,  1700485571);\r\n      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);\r\n      c = II(c, d, a, b, m[i+10], 15, -1051523);\r\n      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);\r\n      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);\r\n      d = II(d, a, b, c, m[i+15], 10, -30611744);\r\n      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);\r\n      b = II(b, c, d, a, m[i+13], 21,  1309151649);\r\n      a = II(a, b, c, d, m[i+ 4],  6, -145523070);\r\n      d = II(d, a, b, c, m[i+11], 10, -1120210379);\r\n      c = II(c, d, a, b, m[i+ 2], 15,  718787259);\r\n      b = II(b, c, d, a, m[i+ 9], 21, -343485551);\r\n\r\n      a = (a + aa) >>> 0;\r\n      b = (b + bb) >>> 0;\r\n      c = (c + cc) >>> 0;\r\n      d = (d + dd) >>> 0;\r\n    }\r\n\r\n    return crypt.endian([a, b, c, d]);\r\n  };\r\n\r\n  // Auxiliary functions\r\n  md5._ff  = function (a, b, c, d, x, s, t) {\r\n    var n = a + (b & c | ~b & d) + (x >>> 0) + t;\r\n    return ((n << s) | (n >>> (32 - s))) + b;\r\n  };\r\n  md5._gg  = function (a, b, c, d, x, s, t) {\r\n    var n = a + (b & d | c & ~d) + (x >>> 0) + t;\r\n    return ((n << s) | (n >>> (32 - s))) + b;\r\n  };\r\n  md5._hh  = function (a, b, c, d, x, s, t) {\r\n    var n = a + (b ^ c ^ d) + (x >>> 0) + t;\r\n    return ((n << s) | (n >>> (32 - s))) + b;\r\n  };\r\n  md5._ii  = function (a, b, c, d, x, s, t) {\r\n    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;\r\n    return ((n << s) | (n >>> (32 - s))) + b;\r\n  };\r\n\r\n  // Package private blocksize\r\n  md5._blocksize = 16;\r\n  md5._digestsize = 16;\r\n\r\n  module.exports = function (message, options) {\r\n    if (message === undefined || message === null)\r\n      throw new Error('Illegal argument ' + message);\r\n\r\n    var digestbytes = crypt.wordsToBytes(md5(message, options));\r\n    return options && options.asBytes ? digestbytes :\r\n        options && options.asString ? bin.bytesToString(digestbytes) :\r\n        crypt.bytesToHex(digestbytes);\r\n  };\r\n\r\n})();\r\n\n\n//# sourceURL=webpack://labfinal/./node_modules/md5/md5.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/page-chat.js");
/******/ 	
/******/ })()
;