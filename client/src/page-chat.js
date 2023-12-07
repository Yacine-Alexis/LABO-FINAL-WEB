import {registerCallbacks, sendMessage, signout, chatMessageLoop} from './chat-api';


let selectedPiece = null;
window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();


//  --------------- NEW -------------------
    const chessboard = document.getElementById("board")
    initializeChessboard();
    
    initializePieces();
    chessboard.addEventListener('click', handleSquareClick());

})
const initializeChessboard  = () => {
    const chessboard = document.getElementById('board')
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = document.createElement('div');
          square.classList.add('cell');
          square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
          square.dataset.row = row;
          square.dataset.col = col;
          // Add click event listener for moves
          square.addEventListener('click', (event) => {
            const clickedSquare = event.target;
            const row = parseInt(clickedSquare.dataset.row, 10);
            const col = parseInt(clickedSquare.dataset.col, 10);
            handleSquareClick(row,col);
          });
          chessboard.appendChild(square);
        }
      }
}
const getPiece = (row, col) => {
  const pieces = [
    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
  ];

return pieces[row * 8 + col];
}
const initializePieces = () => {
    const pieces = [
      '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
      '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
      '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
    ];

    const squares = document.querySelectorAll('.cell');
    squares.forEach((square, index) => {
      if (pieces[index] !== '') {
        const piece = document.createElement('div');
        piece.innerText = pieces[index];
        square.appendChild(piece);
      }
    });
  }
// Handle square click event
const handleSquareClick = (row, col) => {
  const clickedPiece = getPiece(row, col)

  if (selectedPiece) {
    console.log(`Move ${selectedPiece} from (${selectedPiece.dataset.row}, ${selectedPiece.dataset.col}) to (${row}, ${col})`);
    selectedPiece = null;
  } else if (clickedPiece !== '') {
    console.log(`Select ${clickedPiece} at (${row}, ${col})`);
    selectedPiece = { row, col, piece: clickedPiece };
}
}

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
    let parentNode = document.querySelector(".chat");
    let nodeDiv = document.createElement("div");
    let nodeMessage = document.createElement("span");

    nodeMessage.innerText = String(fromUser) + " : " + String(message);
    
    nodeDiv.appendChild(nodeMessage);
    parentNode.appendChild(nodeDiv);
}
// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres connectés dans votre interface.

const memberListUpdate = members => {
  let parentNode = document.querySelector(".members-container");
  // Clear existing content in .members-container
  parentNode.innerHTML = "";
  for (let i = 0; i < members.length; i++) {
      let nodeDiv = document.createElement("div");

      // Create an image element and append it to the nodeDiv
      let nodeImg = document.createElement("img");
      nodeImg.src = "img/greenCircle.png";
      nodeImg.alt = "Member Image";
      nodeImg.style.width = "8px"; 
      nodeImg.style.margin = "4px";
      nodeDiv.appendChild(nodeImg);

      let nodeName = document.createElement("span");
      nodeName.innerText = String(members[i]);
      nodeDiv.appendChild(nodeName);
      parentNode.appendChild(nodeDiv);
  }
}

