// Singleton

// Object Literals

const zomatoUserActivity = {
  // Key: Value
  name: "Arnab",
  age: 20,
  email: "arnab@gmail.com",
  isLoggedin: true,
  likedFoods: ["Chicken Biriyani", "Chicken Chaap", "Chilli Chicken"],
  address: {
    // Key: Value
    city: "Asansol",
    pinCode: 713303,
    State: "West Benagl",
  },
  customerRating: 4.6,
};

// console.log("Before Changing name --->", zomatoUserActivity);
zomatoUserActivity.name = "Arnab Das";
// console.log("After Changing name --->", zomatoUserActivity);

// console.log("Before Changing Liked Foods --->", zomatoUserActivity);
// Object.freeze(zomatoUserActivity);
// It's use to freeze data in object,, after doing this operation we can't modify our object
// zomatoUserActivity.likedFoods = ["Sayandeep", "Aditya", "Subhayan"];
// console.log("After Changing Liked Foods --->", zomatoUserActivity);

zomatoUserActivity.greetings = function () {
  console.log(`Welcome to Zomato: ${this.name}`);
};

// console.log('After adding a new key greetings the object will look like:',zomatoUserActivity)
// console.log('Calling the greetings method:',zomatoUserActivity.greetings())

const obj1 = {
  1: "a",
  2: "b",
};

const obj2 = {
  3: "c",
  4: "d",
};

const obj3 = {
  5: "e",
  6: "f",
};

const obj4 = Object.assign(obj1,obj2,obj3)
// console.log(obj4)

console.log(Object.keys(obj4))
console.log(Object.values(obj4))