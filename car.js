class Controls {
  constructor() {
    this.forward = false;
    this.reverse = false;
    this.left = false;
    this.right = false;
    this.#addListeners();
  }
  #addListeners() {
    document.addEventListener("keydown", (ev) => {
      switch (ev.key) {
        case "ArrowLeft":
        case "a":
          this.left = true;
          break;
        case "ArrowRight":
        case "d":
          this.right = true;
          break;
        case "ArrowUp":
        case "w":
          this.forward = true;
          break;
        case "ArrowDown":
        case "s":
          this.reverse = true;
          break;
      }
    });

    document.addEventListener("keyup", (ev) => {
      switch (ev.key) {
        case "ArrowLeft":
        case "a":
          this.left = false;
          break;
        case "ArrowRight":
        case "d":
          this.right = false;
          break;
        case "ArrowUp":
        case "w":
          this.forward = false;
          break;
        case "ArrowDown":
        case "s":
          this.reverse = false;
          break;
      }
    });
  }
}
class Car {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.controls = new Controls();
    this.speed = 0;
    this.acceleration = 0.08; // Normal value is 0.2
    this.maxSpeed = 12; // Normal value is 5
    this.maxReverseSpeed = -2;
    this.friction = 0.02;
    this.angle = 0;
    this.DOMSpeedCount = document.querySelector("#speedCount");
  }
  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < this.maxReverseSpeed) {
      this.speed = this.maxReverseSpeed;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    /*When you press the down button here basically the speed becomes negative and this.y-= tries to subtract from negative number 
       which becomes positive cause (-- = +) two minuses equal to plus and the car goes down the canvas as y increases
      */
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    this.DOMSpeedCount.innerHTML = `${Math.ceil(this.speed * 10 * 2)} km/h`;
  }
  update() {
    this.#move();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.fill();
    ctx.restore();
  }
}
