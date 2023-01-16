// Example 1
// [[1,2,3,4,5,6], [7,7,7,7,7,-7]], 0

// 1,2,3,4,5,6
// 7,7,7,7,7,-7

// --> [8,9,10,11,12,-1]

// Example 2
// [[1,2,3,4,5,6], [7,7,7,7,7,7]], 3

// 1,2,3,4,5,6
//       7,7,7,7,7,7

// --> [1,2,3,11,12,13,7,7,7]

// Example 3
// [[1,2,3,4,5,6], [7,7,7,-7,7,7], [1,1,1,1,1,1]], 3

// 1,2,3,4,5,6
//       7,7,7,-7,7,7
//             1,1,1,1,1,1

// --> [1,2,3,11,12,13,-6,8,8,1,1,1]

function addingShifted (arrayOfArrays, shift) {
  result = []
  for(let i in arrayOfArrays){
    for(let j in arrayOfArrays[i]){
      let iNum = Number(i)
      let jNum = Number(j)
      result[(jNum+(shift*iNum))] = result[(jNum+(shift*iNum))] ?? 0
      result[(jNum+(shift*iNum))]+=arrayOfArrays[iNum][jNum]
    }
  }
  return result
}

console.log(addingShifted([[1,2,3,4,5,6], [7,7,7,-7,7,7], [1,1,1,1,1,1]], 3)); // [ 1, 2, 3, 11, 12, 13, -6, 8, 8, 1, 1, 1 ]
