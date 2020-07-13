function toPositive(n) {
  if (n === 0) {
    return 0;
  }
  if (n < 0) {
    return n * -1;
  }
  return n;
}

afterMonth = {
  1: 3,
  2: 3,
  3: 3,
}
currentMonth = {
  1: 1,
  2: 1,
  3: 1,
}
const consume = Object.fromEntries(
  Object.entries(currentMonth).map(([k, v]) => [k, toPositive(v - afterMonth[k])]),
);

console.log(consume);


