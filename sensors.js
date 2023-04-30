class Sensors {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLen = 150;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }
  update(roadBorders) {
    this.#castRays();
    this.readings = [];
    this.rays.forEach((item) => {
      this.readings.push(this.#getReading(item, roadBorders));
    });
  }
  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        linearInterpolate(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLen,
        y: this.car.y - Math.cos(rayAngle) * this.rayLen,
      };
      this.rays.push([start, end]);
    }
  }
  #getReading(ray, roadBorders) {
    const touches = [];
    roadBorders.forEach((border) => {
      const touch = getIntersection(ray[0], ray[1], border[0], border[1]);
      if (touch) touches.push(touch);
    });
    if (touches.length === 0) return null;
    else {
      const offsets = touches.map((e) => e.offset);
      const minOffset = Math.min(...offsets);
      return touches.find((e) => e.offset === minOffset);
    }
  }
  draw(ctx) {
    this.rays.forEach((item, i) => {
      const start = item[0];
      let end = item[1];
      if (this.readings[i]) {
        end = this.readings[i];
      }
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      //Drawing touching distance
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(item[1].x, item[1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  }
}
