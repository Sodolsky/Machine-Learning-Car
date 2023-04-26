const canvas = document.querySelector("#gameCanvas");
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
const update = () => {
  car.update();
  canvas.height = window.innerHeight;
  car.draw(ctx);

  requestAnimationFrame(update);
};
update();
