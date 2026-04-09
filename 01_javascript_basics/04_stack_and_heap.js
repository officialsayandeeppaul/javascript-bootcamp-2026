// stack                store all the premitive data

let a = 2;
let b = a;

a = a + 2;

console.log("The value of a is:", a, "and the value of b is:", b);

// heap                 store all the non-premitive data

let userOne = {
  email: "sayandeep775@gmail.com",
};

let userTwo = userOne;

userOne.email = 'arnab75@gmail.com'

console.log(
  "The email of userOne is:",
  userOne.email,
  "and the email of userTwo is:",
  userTwo.email,
);
