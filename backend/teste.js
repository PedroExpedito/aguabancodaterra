const obj1 = {
  1: 10,
  2: 10,
  3: 10,
  4: 10,
  5: 10,
  6: 10,
  7: 10,
  8: 10,
  10: 10,
};

const obj2 = {
  1: 30,
  2: 30,
  3: 30,
  4: 30,
  5: 30,
  6: 30,
  7: 30,
  8: 30,
  10: 30,
};

const sum = Object.values(spent).reduce((a, b) => a + b);


const result = obj2 - obj1;

const newObj = {};
for (const p in obj2) {
  newObj[p] = obj2[p] - obj1[p];
}
console.log(newObj);

/* output is:
{
    1:20,
    2: 20,
    3: 20,
    4: 20,
    5: 20,
    6: 20,
    7: 20,
    8: 20,
    20: 10,
    11: 20,
    12: 20,
    13: 20,
    14: 20,
};
*/
