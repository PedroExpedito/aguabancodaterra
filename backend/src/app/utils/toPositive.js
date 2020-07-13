function toPositive(n) {
  if (n === 0) {
    return 0;
  }
  if (n < 0) {
    return n * -1;
  }
  return n;
}

export default toPositive;
