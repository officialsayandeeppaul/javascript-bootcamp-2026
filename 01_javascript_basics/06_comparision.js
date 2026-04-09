// light comparision --> only check the value
let a = 2;
let b = "2";

console.log(a == b);

// strict comparision --> it checks the value & datatype both
let c = 5;
let d = "5";
console.log(c === d);

// comparartor operator
console.log(2 >= 2); // OR GATE
// LHS > = RHS
// 2   >=    2

// input1       input2     output
// true         false      true
//false         true       true
//false         false      false
//true          true       true

console.log(2 < 2);
console.log(2 == 2);
console.log(2 === "2");
console.log(2 != 2);
// LHS                 RHS
// number 2     !=       number 2
console.log(2 !== "2");
// LHS                 RHS
// number 2     !==    string 2

console.log(null < 0);
console.log(null <= 0);
console.log(null == 0);
console.log(null != 0);
console.log(null >= 0);
console.log(null > 0);