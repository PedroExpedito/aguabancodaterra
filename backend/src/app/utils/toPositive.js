function toPositive(currentMonth, afterMonth) {
  if (currentMonth >= afterMonth) {
    return (currentMonth - afterMonth);
  }
  return (9999 - afterMonth + currentMonth);
}

export default toPositive;
