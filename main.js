const canvas = document.querySelector("#gameCanvas");
canvas.width = 400;
const ctx = canvas.getContext("2d");
const numberOfLanes = 6;
const road = new Road(canvas.width / 2, canvas.width * 0.9, numberOfLanes);
const car = new Car(
  road.getLaneCenter(Math.floor(numberOfLanes / 2)),
  100,
  30,
  50
);
const update = () => {
  car.update();
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(update);
};
update();
