const obj1 = {
  1: 10,
  2: 10,
  3: 10,
};
const obj2 = {
  1: 10,
  2: 10,
  3: 10,
};
const obj3 = Object.fromEntries(
  Object.entries(obj2).map(([k, v]) => [k, v - obj1[k]]),
);

console.log(obj3);
