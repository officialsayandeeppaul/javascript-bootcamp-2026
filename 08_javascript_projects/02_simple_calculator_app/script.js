document.addEventListener("DOMContentLoaded", function () {
  console.log("heelo");
  const display = document.querySelector("#display");

  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let operator = "";
  let previousInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  function handleButtonClick(e) {
    const buttonValue = e.target.textContent;

    // 1    2   3   4   5   6   7   8   9   0               +   -   *   /   =
    // choose   3
    //      isNaN(3)    !false => true

    if (!isNaN(buttonValue) || buttonValue === ".") {
      currentInput = currentInput + buttonValue;
    } else if (buttonValue === "C") {
      clearCalculator();
    } else if (buttonValue === "=") {
      performCalculation();
    } else {
      handleOperator(buttonValue);
    }

    updateDisplay();
  }

  function handleOperator(op) {
    if (operator && currentInput) {
      performCalculation();
      previousInput = currentInput;
      currentInput = "";
      //  5 *  5 =    25
      //  25 * 2 =    50
    } else {
      previousInput = currentInput || "0";
      currentInput = "";
    }

    operator = op;
  }

  function clearCalculator() {
    currentInput = "";
    operator = "";
    previousInput = "";
  }

  function updateDisplay() {
    display.innerText = currentInput || "0";
    console.log(display.innerText);
  }
});
