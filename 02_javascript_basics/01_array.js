let myArr1 = ["Sayandeep", 20, 95.5, true];
//                  0       1    2    3
let myArr2 = ["Arnab", 22, 99.5, false];

console.log(myArr1, "&", myArr2);

// Array method
myArr1.push("Aditya");
myArr1.push("Subhayan");

// when we use push method it'll add the newest data in the last position of the array
console.log("After using PUSH method:", myArr1);

myArr1.pop();
myArr1.pop();

// when we use pop method it'll remove the data from the last position of the array
console.log("After using POP method:", myArr1);

myArr1.unshift("Barsha");
myArr1.unshift("Aditi");

// when we use unshift method it'll add the newest data in the first position of the array
console.log("After using UNSHIFT method:", myArr1);

myArr1.shift();
myArr1.shift();

// when we use shift method it'll remove the data from the first position of the array
console.log("After using SHIFT method:", myArr1);

// Boolean value return
console.log("After using INCLUDES method:", myArr1.includes("Sayandeep"));

// Return the index of that particular element inside the array if exist, if not return -1
console.log("After using INDEXOF method:", myArr1.indexOf("Sayandeep"));

console.log("Before using JOIN method:", myArr1, "&", myArr2);

let myArr3 = myArr1.join(myArr2);
console.log("After using JOIN method:", myArr3);

console.log("Before using CONCAT method:", myArr1, "&", myArr2);
let myArr4 = myArr1.concat(myArr2);
console.log("After using CONCAT method:", myArr4);
// [ 'Sayandeep', 20, 95.5, true, 'Arnab', 22, 99.5, false ]
//       0        1    2     3      4      5   6      7

// Slice and Splice
console.log("After using SLICE method:", myArr4.slice(1, 5));
console.log("After using SLICE method our main Array:", myArr4);
// slice excludes last index

console.log("After using SPLICE method:", myArr4.splice(1, 5));
// splice includes the last index
// main array violate
console.log("After using SPLICE method our main Array:", myArr4);

let myArr5 = [{},{},{}]
console.log(myArr5)