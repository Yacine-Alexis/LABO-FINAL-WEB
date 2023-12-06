class Piece {
    constructor(x, y){
        this.pieceNames = [ "roiBlanc", "roiNoir", "reineblanc", "reineNoir", 
        "fouBlanc", "fouNoir", "cavalierBlanc", "cavalierNoir", 
        "tourBlanc", "tourNoir", "pionBlanc", "pionNoir" ] ;
        this.pieceNumber = Math.floor(Math.random() * this.pieceNames.length);

        if (this.pieceNames[this.pieceNumber].endsWith('r')){
            this.x = x + 700
        }
        else {
            this.x = x + 600;
        }
       
        this.y = y + 100;
        
        this.speedX = 0.07;
        this.speedY = 0.07;

        

        this.node = document.createElement("div");

        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
        
        this.node.classList.add(this.pieceNames[this.pieceNumber]);
        this.node.classList.add("piece");

        this.reverse = false;
        document.body.append(this.node);
    }
    tick() {
        console.log(this.x, this.y);
        let directionX = Math.floor(Math.random() * 2) - 1; // entre -1 et 1
        let directionY = Math.floor(Math.random() * 2) - 1; 

        if (this.y > 200){
            this.speedY = -0.07 + directionY;
        }
        if (this.y < 0){
            this.speedY = 0.07;
        }

        
        
        if (this.pieceNames[this.pieceNumber].endsWith('r')){ // black pieces
            this.x += this.speedX + directionX;  // left
            if (this.x < 0){
                this.speedX = 0.07
                this.reverse = true;
            }
        }
        else {
            this.x -= this.speedX + directionX;  // right ..... white pieces
            if (this.x > 800){
                this.speedX = -0.07
                this.reverse = true;
            }
        }

        this.y += this.speedY;
        

        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";


        let alive = this.y < 1000

        if (!alive){
            this.node.remove()
        }
    }
}