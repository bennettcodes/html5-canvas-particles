if (collisionActive) {
    //            LEFT COLLISION - UPPER
    if (((mouseX > this.x * this.xOffset) && (mouseX < this.x + this.wFive)) && ((mouseY > this.y * this.yOffset + this.wFive) && (mouseY < this.y + (((this.h - (this.wFive * 2)) * 0.33) + this.wFive)))) {
        this.xv = this.speed;
        this.yv = this.speed;
    }
    //            LEFT COLLISION - MIDDLE
    if (((mouseX > this.x * this.xOffset) && (mouseX < this.x + this.wFive)) && ((mouseY > this.y * this.yOffset + ((this.h - (this.wFive * 2)) * 0.33) + this.wFive) && (mouseY < this.y + ((this.h - (this.wFive * 2)) * 0.66) + this.wFive))) {
        this.xv = this.speed;
    }
    //            LEFT COLLISION - LOWER
    if (((mouseX > this.x * this.xOffset) && (mouseX < this.x + this.wFive)) && ((mouseY > this.y * this.yOffset + ((this.h - (this.wFive * 2)) * 0.66) + this.wFive) && (mouseY < this.y + (this.h - this.wFive)))) {
        this.xv = this.speed;
        this.yv = this.reverseSpeed;
    }
    //            RIGHT COLLISION - UPPER
    if (((mouseX > this.x * this.xOffset + (this.w - this.wFive)) && (mouseX < this.x + this.w)) && ((mouseY > this.y * this.yOffset + this.wFive) && (mouseY < this.y + (((this.h - (this.wFive * 2)) * 0.33) + this.wFive)))) {
        this.xv = this.reverseSpeed;
        this.yv = this.speed;
    }
    //            RIGHT COLLISION - MIDDLE
    if (((mouseX > this.x * this.xOffset + (this.w - this.wFive)) && (mouseX < this.x + this.w)) && ((mouseY > this.y * this.yOffset + ((this.h - (this.wFive * 2)) * 0.33) + this.wFive) && (mouseY < this.y + ((this.h - (this.wFive * 2)) * 0.66) + this.wFive))) {
        this.xv = this.reverseSpeed;
    }
    //            RIGHT COLLISION - LOWER
    if (((mouseX > this.x * this.xOffset + (this.w - this.wFive)) && (mouseX < this.x + this.w)) && ((mouseY > this.y * this.yOffset + ((this.h - (this.wFive * 2)) * 0.66) + this.wFive) && (mouseY < this.y + (this.h - this.wFive)))) {
        this.xv = this.reverseSpeed;
        this.yv = this.reverseSpeed;
    }

    //            TOP COLLISION - LEFT
    if (((mouseX > this.x * this.xOffset + this.wFive) && (mouseX < this.x + ((this.w - (this.wFive * 2)) * 0.33) + this.wFive)) && ((mouseY > this.y * this.yOffset) && (mouseY < this.y + this.wFive))) {
        this.xv = this.speed;
        this.yv = this.speed;
    }

    //            TOP COLLISION - MIDDLE
    if (((mouseX > this.x * this.xOffset + ((this.w - (this.wFive * 2)) * 0.33) + this.wFive) && (mouseX < this.x + ((this.w - (this.wFive * 2)) * 0.66) + this.wFive)) && ((mouseY > this.y * this.yOffset) && (mouseY < this.y + this.wFive))) {
        this.yv = this.speed;
    }

    //            TOP COLLISION - RIGHT
    if (((mouseX > this.x * this.xOffset + ((this.w - (this.wFive * 2)) * 0.66) + this.wFive) && (mouseX < this.x + this.w - this.wFive)) && ((mouseY > this.y * this.yOffset) && (mouseY < this.y + this.wFive))) {
        this.xv = this.reverseSpeed;
        this.yv = this.speed;
    }

    //            BOTTOM COLLISION - LEFT
    if (((mouseX > this.x * this.xOffset + this.wFive) && (mouseX < this.x + ((this.w - (this.wFive * 2)) * 0.33) + this.wFive)) && ((mouseY > this.y * this.yOffset + this.h - this.wFive) && (mouseY < this.y + this.h))) {
        this.xv = this.speed;
        this.yv = this.reverseSpeed;
    }

    //            BOTTOM COLLISION - MIDDLE
    if (((mouseX > this.x * this.xOffset + ((this.w - (this.wFive * 2)) * 0.33) + this.wFive) && (mouseX < this.x + ((this.w - (this.wFive * 2)) * 0.66) + this.wFive)) && ((mouseY > this.y * this.yOffset + this.h - this.wFive) && (mouseY < this.y + this.h))) {
        this.yv = this.reverseSpeed;
    }

    //            BOTTOM COLLISION - RIGHT
    if (((mouseX > this.x * this.xOffset + ((this.w - (this.wFive * 2)) * 0.66) + this.wFive) && (mouseX < this.x + this.w - this.wFive)) && ((mouseY > this.y * this.yOffset + this.h - this.wFive) && (mouseY < this.y + this.h))) {
        this.xv = this.reverseSpeed;
        this.yv = this.reverseSpeed;
    }
}

if (collisionActive) {
    if ((mouseX > this.x - (this.w * 2)) && (mouseX < this.x + this.w + (this.w * 2)) && (mouseY > this.y - (this.h * 2)) && (mouseY < this.y + this.h + (this.h * 2))) {
        //                this.xv = this.speed;
        //                this.yv = this.speed;
        console.log('over');
        switch (true) {
        case mouseUpRight:
            this.xv = this.speed;
            this.yv = this.reverseSpeed;
            break;
        case mouseDownRight:
            this.xv = this.speed;
            this.yv = this.speed;
            break;
        case mouseDownLeft:
            this.xv = this.reverseSpeed;
            this.yv = this.speed;
            break;
        case mouseUpLeft:
            this.xv = this.reverseSpeed;
            this.yv = this.reverseSpeed;
            break;
        }
    }
}