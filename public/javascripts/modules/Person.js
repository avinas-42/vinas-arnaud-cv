var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
  
class Person {
    constructor(color) {
        this.x = (Math.random() * canvas.width) - 1;
        this.y = (Math.random() * canvas.width) - 1;
        this.vx = (Math.random() * 2) - 1;
        this.vy = (Math.random() * 2) - 1;
        this.radius = 4;
        this.color = color;
        this.imuniser = false;
        this._id = Person.incrementId()
    }
    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
      }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += (Math.random() * 2) - 1;
        this.vy += (Math.random() * 2) - 1;
        
        if(this.vx > 2 || this.vx < -2)
        {
            this.vx = (Math.random() * 2) - 1;
        }
        if(this.vy > 2 || this.vy < -2)
        {
            this.vy = (Math.random() * 2) - 1;
        }
        
        if (this.y + this.vy > ctx.canvas.height || this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > ctx.canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }
    }
    draw(imageData, issick, isimuniser) {

        //bleu
        for(let i=Math.floor(this.x) - 3; i < Math.floor(this.x) + 3; i++)
        {
            for(let j=Math.floor(this.y) -3; j < Math.floor(this.y) + 3; j++)
            {
                //bleu
                if(issick)
                {
                    imageData.data[((i * (imageData.width * 4)) + (j * 4))] = 255;
                }
                else
                {
                    if(isimuniser)
                    {
                        imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 1] = 255;
                    }
                    else
                    {
                        imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 2] = 255;
                    }
                    
                }
                //alpha
                imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 3] = 255;
            }

        }
        return(imageData);
    }
}
export { Person };