let count = 0;

document.querySelector(".decrease").onclick = function () {
  console.log("current value of count:", count);
  count = count - 1;
  console.log("After decreament, the count value is:", count);
  document.querySelector(".changingVariable").innerText = count;
};

document.querySelector(".increase").onclick = function () {
  console.log("current value of count:", count);
  count = count + 1;
  console.log("After Increasing, the count value is:", count);
  document.querySelector(".changingVariable").innerText = count;
};
