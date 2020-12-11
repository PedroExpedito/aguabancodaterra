"use strict";Object.defineProperty(exports, "__esModule", {value: true});function toPositive(currentMonth, afterMonth) {
  if (currentMonth >= afterMonth) {
    return (currentMonth - afterMonth);
  }
  return (9999 - afterMonth + currentMonth);
}

exports. default = toPositive;
