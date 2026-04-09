let firstName = "                              Sayandeep              ";

let lastName = "Paul";

let fullName = firstName + lastName;
console.log("My Name is:", fullName);

// methods to declare string using the String class instance
console.log(fullName.length);

let modifiedFirstName = firstName.trim();
let modifiedLastName = lastName.trim();
let modifiedName = modifiedFirstName + " " + modifiedLastName;
console.log("My modified Name is:", modifiedName);
console.log(modifiedName.length);

console.log(modifiedName.toUpperCase());
console.log(modifiedName.toLowerCase());
console.log(modifiedName.includes("PAUL"));
console.log(modifiedName.charAt(2));
// console.log(modifiedName.charCodeAt("S"));       // Need to visit

// 0    1   2   3   4   5   6   7   8   9   10  11  12  13
// S    a   y   a   n   d   e   e   p       P   a   u   l

console.log(modifiedName.substring(0, 9)); // last index in substring is excluded

console.log(modifiedName.indexOf("e"));
console.log(modifiedName.lastIndexOf("e"));
