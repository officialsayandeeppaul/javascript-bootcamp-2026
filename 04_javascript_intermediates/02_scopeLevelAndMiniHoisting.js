// function one() {
//   const userName = "Sayandeep";
//   function two() {
//     const userName = "Arnab";
//     function three() {
//       const email = "arnab@gmail.com";
//       console.log("My username is:", userName, "& my email is:", email);
//     }
//     three();
//   }
//   two();
// }

// one();

// closure
// variable that declare in the parent function or parent scope can be accessible anywhere into it's child scope or function but vice-versa is not possible

// console.log(a)

// let a = 10

greetMyName('sayandeep')

function greetMyName(userName) {
    console.log(`hello ${userName}`)
}