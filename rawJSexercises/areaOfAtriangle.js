function triangleAreaCalc(base, height) {
  //   argument validation block
  if (base == undefined || height == undefined) {
    const undefinedErrorLog =
      "You need to call this function with base as first argument and height as second argument. Try to call it again!";
    console.log(undefinedErrorLog);
    return undefinedErrorLog;
  } else if (isNaN(base) || isNaN(height)) {
    const NaNErrorLog = "You need to enter numbers only. Try to call it again!";
    console.log(NaNErrorLog);
    return NaNErrorLog;
  } else if (base <= 0 || height <= 0) {
    const negativeError =
      "You need to enter positive numbers as base and height. Try to call it again!";
    console.log(negativeError);
    return negativeError;
  //   calculation, output and then return
  } else {
    const area = ((base * height) / 2).toFixed(2);
    // console.log(typeof area, area);
    console.log(
      `Base Edge of The Triangle : ${base}\nHeight of The Triangle : ${height}\nArea of The Triangle : ${area}`
    );
    return Number(area);
  }
}

// calling the function
triangleAreaCalc(3); // You need to call this function with base as first argument and height as second argument. Try to call it again!
triangleAreaCalc(3, "a"); // You need to enter numbers only. Try to call it again!
triangleAreaCalc(3, 0); // You need to enter positive numbers as base and height. Try to call it again!
triangleAreaCalc(3, 6); // 9.00
