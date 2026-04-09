let a = "10abc";
console.log("the type of variable a is:", typeof a);

// string --> number
let b = Number(a);
console.log("the type of variable b is:", typeof b, "& the value of b is:", b);

// when we forcefully convert variale b into number it displays NaN because that string of original variale a contains number+characters

// boolean --> number
let c = false;
console.log("the type of variable c is:", typeof c);

// boolena          true        false
//                   1            0

let d = Number(c);
console.log("the type of variable d is:", typeof d, "& the value of d is:", d);

// when we forefully convert variable d into number it displays 0 because that boolean value of original variale c contains false

let e = "Arnab";
console.log("the type of variable e is:", typeof e);

// string --> boolean
let f = Boolean(e);
console.log("the type of variable f is:", typeof f, "& the value of f is:", f);

// when we forefully convert variable f into boolean it displays true because that string value of original variale e contains a vaild charater stream inside the '...'

let g = 15;
console.log("the type of variable g is:", typeof g);

// number --> string
let h = String(g);
console.log("the type of variable h is:", typeof h, "& the value of h is:", h);

let i = "hello";
let j = "Aditya";

// string concatenation
let k = i + " " + j;
console.log("the type of variable k is:", typeof k, "& the value of k is:", k);

let l = "1" + 2 + 2;
// string + number + number
console.log("the type of variable l is:", typeof l, "& the value of l is:", l);

let m = 1 + 2 + "2";
// number + number + string
console.log("the type of variable m is:", typeof m, "& the value of m is:", m);

let n = 1 + "2" + 2;
// number + string + number
console.log("the type of variable n is:", typeof n, "& the value of n is:", n);