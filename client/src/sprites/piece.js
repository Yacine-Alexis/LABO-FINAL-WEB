let score = 0;

class Piece {
    constructor(x, y){
        this.id = "piece";
        this.score_increment = 1;
        
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

        this.opacity = 1;
        this.opacity_decrementation = 0.2

        this.bigger = false;
        this.reverse = false;
        this.drag = false;
        this.node = document.createElement("div");

        
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";

        this.node.classList.add(this.pieceNames[this.pieceNumber]);
        this.node.classList.add("piece");

        if (this.easter_egg()){
            this.bigger = true;
            this.node.style.width += "100px"
            this.node.style.height += "100px"
        }

        document.body.append(this.node);
        
        this.node.onclick = e => this.click(e)
        this.node.addEventListener('mousedown', e => this.startDrag(e));
        document.addEventListener('mousemove', e => this.dragging(e));
        document.addEventListener('mouseup', () => this.endDrag());
    }

    // Function to start dragging when mouse is pressed on the piece
    startDrag(e) {
        this.drag = true;

        // Calculate the offset between the mouse position and the piece position
        this.offsetX = e.clientX - this.x;
        this.offsetY = e.clientY - this.y;
    }

    // Function to update piece position while dragging
    dragging(e) {
        if (this.drag) {
            // Update piece position based on mouse position and offset
            this.x = e.clientX - this.offsetX;
            this.y = e.clientY - this.offsetY;

            // Update the visual position of the piece
            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
        }
    }

    // Function to stop dragging when mouse is released
    endDrag() {
        this.drag = false;
    }

    click(){
        if (this.bigger){
            this.opacity -= this.opacity_decrementation;
            this.node.style.opacity = this.opacity;
            if (this.opacity <= 0){
                this.node.remove();
                score += this.score_increment;
                document.getElementById("score").innerHTML = "Score : " + score
                if (score == 3){
                    
                }
            }
        }
    }

    easter_egg() {
        let a = Math.floor(Math.random() * 4);
        if (a == 3){
            return true;
        }
    }

    tick() {
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

        
        let alive = this.x > window.innerWidth-10
        let alivee = this.x < -10

        if (alive || alivee){
            this.node.remove()
        }
    }
}