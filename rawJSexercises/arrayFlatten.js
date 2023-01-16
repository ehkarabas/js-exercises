// Write a function that flattens an Array of Array objects into a flat Array. Your function must only do one level of flattening.


// flatten([1,2,3]) // => [1,2,3]
// flatten([[1,2,3],["a","b","c"],[1,2,3]])  // => [1,2,3,"a","b","c",1,2,3]
// flatten([[[1,2,3]]]) // => [[1,2,3]]

const flatten1 = function (array){
  return [].concat.apply([],array);
}

const flatten2 = function (array){
  return array.reduce((acc,item) => acc.concat(item), []);
}

const flatten3 = function (array){
  let result = []
  if (Array.isArray(array[0])) {
    for(const arr of array){
      arr.forEach(item => result.push(item))
    }
  } else {
    array.forEach(item => result.push(item))
  }
  return result
}

flatten3([1,2,3]) // => [1,2,3]
flatten2([[1,2,3],["a","b","c"],[1,2,3]])  // => [1,2,3,"a","b","c",1,2,3]
flatten1([[[1,2,3]]]) // => [[1,2,3]]


