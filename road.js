class Road {
  constructor(x, w, laneCount) {
    this.x = x;
    this.w = w;
    this.laneCount = laneCount;
    this.left = x - w / 2;
    this.right = x + w / 2;
    const infinity = 1000000;
    this.top = -infinity;
    this.bot = infinity;
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomleft = { x: this.left, y: this.bot };
    const bottomRight = { x: this.right, y: this.bot };
    this.borders = [
      [topLeft, bottomleft],
      [topRight, bottomRight],
    ];
  }
  getLaneCenter(laneIndex) {
    const laneWidth = this.w / this.laneCount;
    return this.left + laneWidth / 2 + laneIndex * laneWidth;
  }
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = linearInterpolate(this.left, this.right, i / this.laneCount);
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bot);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    this.borders.forEach((item) => {
      ctx.beginPath();
      ctx.moveTo(item[0].x, item[0].y);
      ctx.lineTo(item[1].x, item[1].y);
      ctx.stroke();
    });
  }
}
