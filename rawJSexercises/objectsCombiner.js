// Your task is to write a function that takes two or more objects and returns a new object which combines all the input objects.
// All input object properties will have only numeric values. Objects are combined together so that the values of matching keys are added together.
// An example:
// const objA = { a: 10, b: 20, c: 30 }
// const objB = { a: 3, c: 6, d: 3 }
// combine(objA, objB) // Returns { a: 13, b: 20, c: 36, d: 3 }
// The combine function should be a good citizen, so should not mutate the input objects.

const combiner = (...objects) => {
  const combinedObject = {};
  // arguments count validation
  if (objects.length <= 1)
    return "You need to pass in one or more objects as arguments, try again.";

  // looping on every arguments inputted
  for (const object of objects) {
    // argument type(object) validation
    if (typeof object !== "object" || Array.isArray(object) || object === null)
      return "You need to pass in only objects as arguments, try again.";
    // value type(number) validation
    const objectValues = Object.values(object);
    for (let value of objectValues) {
      if (!Number.isFinite(value)) {
        return "Object values must be number, try again with different values.";
      }
    }

    // storing keys and their total values in an object
    const objectEntries = Object.entries(object);

    for (const [key, value] of objectEntries) {
      if (!combinedObject[key]) {
        combinedObject[key] = value;
      } else {
        combinedObject[key] += value;
      }
    }
  }
  // returning the combined object
  return combinedObject;
};

console.log(combiner({ a: 10, b: 20, c: 30 }, { a: 3, c: 6, d: 3 })); // { a: 13, b: 20, c: 36, d: 3 }
