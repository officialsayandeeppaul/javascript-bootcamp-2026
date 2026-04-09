// Premitive datatypes
let name = "Arnab";
name = "Aditya"; // String
let myAge = 20; // Number
let arnabAge = myAge;

// console.log("My name is: ",name,"\nMy age is: ",arnabAge)
// console.log("The datatype of",name,"is: ",typeof(name),"\nThe datatype of",arnabAge,"is: ",typeof(arnabAge))

let isActive = true; // Boolean
let todaysShare = 16.8;

// console.log("The datatype of",isActive,"is: ",typeof(isActive))
// console.log("The datatype of",todaysShare,"is: ",typeof(todaysShare))

let pakistanLoan = 8000n;

// console.log("T/he datatype of",pakistanLoan,"is: ",typeof(pakistanLoan))

// null

let age;

// console.log("The datatype of",age,"is: ",typeof(age))                     // undefined

// Non Prmitive

//    index              0     1   2
let studentDetails = ["Arnab", 20, true];

// console.log('Printing the Array:',studentDetails,'& its type is:',typeof(studentDetails))

// How we can access our element inside the array?

// ans: Indexing
// console.log('I am printing the age:',studentDetails[1])
// console.log('I am printing the active status:',studentDetails[2])
// console.log('I am printing the name:',studentDetails[0])

let student1 = {
  name: "Aditya",
  age: 20,
  isActive: true,
  HQ: "BTech",
};

let student2 = {
  name: "Arnab",
  age: 22,
  isActive: false,
  HQ: "BA",
  mobile: "+91 9876543210",
};

// console.log('Printing student 1:',student1,'& its type is:',typeof(student1))
// console.log('Printing student 2:',student2,'& its type is:',typeof(student2))

// console.log('Printing student 2 name:',student2.name)
// console.log('Printing student 2 age:',student2.age)
// console.log('Printing student 1 name:',student1.name)

// function definition
function printName() {
  console.log("Hi this side Arnab");
}

// in order to execute the function we need to call
printName();
console.log("The type of printName function is:", typeof printName);
