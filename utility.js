const linearInterpolate = (A, B, t) => {
  return (1 - t) * A + t * B;
};
const formatSpeedValues = (value) => {
  return value * 10 * 2;
};
