// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const dummyArr = [];

// //

// for (let i = 0; i < myNums.length; i++) {
//   if (dummyArr.length === 0) {
//     console.log(
//       "Inside the Dummy Array length is:",
//       dummyArr.length,
//       "Iteration for the element:",
//       myNums[i],
//       "for the index of:",
//       i,
//     );
//     if (myNums[i] > 5) {
//       console.log(
//         "Inside the If block the iteration is happening for",
//         myNums[i],
//         "for the index of:",
//         i,
//       );

//       dummyArr.push(myNums[i]);
//     }
//   } else {
//     console.log(
//       "Inside the Dummy Array length is:",
//       dummyArr.length,
//       "Iteration for the element:",
//       myNums[i],
//       "for the index of:",
//       i,
//     );
//     console.log("\n");
//     console.log(
//       "Inside the Else block the iteration is happening for",
//       myNums[i],
//       "for the index of:",
//       i,
//     );
//   }
// }

// console.log('Inside the dummy array element is',dummyArr[0])

// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const returnedValue = myNums.filter((elem) => {
//   if (elem > 5) {
//     return elem;
//   }
// });

// console.log((returnedValue))

// ********************************************** filter ****************************************************

// const books = [
//   {
//     title: "Atomic Habits",
//     author: "James Clear",
//     price: 899,
//     genre: "self-help",
//   },
//   {
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     price: 499,
//     genre: "fiction",
//   },
//   {
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     price: 1499,
//     genre: "programming",
//   },
//   {
//     title: "Deep Work",
//     author: "Cal Newport",
//     price: 1099,
//     genre: "productivity",
//   },
//   {
//     title: "Rich Dad Poor Dad",
//     author: "Robert Kiyosaki",
//     price: 799,
//     genre: "finance",
//   },
//   {
//     title: "The Pragmatic Programmer",
//     author: "Andrew Hunt",
//     price: 1599,
//     genre: "programming",
//   },
//   {
//     title: "Sherlock Holmes",
//     author: "Arthur Conan Doyle",
//     price: 699,
//     genre: "detective",
//   },
//   {
//     title: "Ikigai",
//     author: "Héctor García",
//     price: 599,
//     genre: "self-help",
//   },
//   {
//     title: "Zero to One",
//     author: "Peter Thiel",
//     price: 1199,
//     genre: "startup",
//   },
//   {
//     title: "The Silent Patient",
//     author: "Alex Michaelides",
//     price: 899,
//     genre: "thriller",
//   },
//   {
//     title: "You Don’t Know JS",
//     author: "Kyle Simpson",
//     price: 1399,
//     genre: "programming",
//   },
//   {
//     title: "Think and Grow Rich",
//     author: "Napoleon Hill",
//     price: 499,
//     genre: "motivation",
//   },
//   {
//     title: "Byomkesh Bokshi",
//     author: "Satyajit Ray",
//     price: 699,
//     genre: "detective",
//   },
//   {
//     title: "The Psychology of Money",
//     author: "Morgan Housel",
//     price: 999,
//     genre: "finance",
//   },
//   {
//     title: "Harry Potter",
//     author: "J.K. Rowling",
//     price: 1299,
//     genre: "fantasy",
//   },
//   {
//     title: "Start With Why",
//     author: "Simon Sinek",
//     price: 899,
//     genre: "leadership",
//   },
// ];

// console.log("Number of books exist in the Books Array:", books.length);

// const filteredBooks = books
//   .filter((book) => book.price < 800)
//   .filter((book) => book.genre === "detective")
//   .filter((book) => book.author === "Satyajit Ray");

// console.log(filteredBooks);

// console.log(
//   "Number of books exist in the Books Array after applying the filter:",
//   filteredBooks.length,
// );




// ********************************************** map ****************************************************





// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const dummyArr = []


// // for (let index = 0; index < myNums.length; index++) {
// //     let updatedValue = myNums[index]+10
// //     dummyArr.push(updatedValue)   
// // }
// // console.log('Original Array',myNums)
// // console.log('Dummy Array',dummyArr)

// const returnedValue = myNums.map((num)=>(num+10))
//                             .filter((elem)=>(elem>15))
//                             .map((elem)=>(elem/10))
// console.log(returnedValue)




// ********************************************** reduce ****************************************************
 

const priceArray = [100,200,300,400,500,1000]

const initialValue = 0

const total =priceArray.reduce((acc,currValue)=>{
    console.log(`acc =>${acc}, currValue =>${currValue}`)
    return acc + currValue
},initialValue)

console.log('Total is:',total)