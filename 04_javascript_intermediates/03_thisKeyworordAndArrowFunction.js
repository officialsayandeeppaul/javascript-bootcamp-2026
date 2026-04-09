const user = {
  //   userName: "Arnab",
  coursePrice: 9999,
  courseInstructor: "Sayandeep",
  courseName: "Javascript Masterclass",
  welcomeMessage: function () {
    console.log(`Welcome ${this.userName}`);
  },
};

const parent = {
  userName: "Akash",
  age: 50,
  child: user,
};

// console.log('User Details:',user.welcomeMessage())
console.log("Parent Details:", parent.child.welcomeMessage());

// Arrow function
// function sumOfTwo(num1,num2) {
//       let total = num1 + num2
//       return total
// }

const sumOfTwo = (num1, num2) => {
    let total = num1 + num2
    return total
};



