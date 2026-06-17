const apiKey = "901903a156a44a28a55f4c5a03c68271";
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

// Fetch currency data and populate dropdown
fetch(apiUrl)
  .then((response) => {
    const res = response.json();
    console.log("response", res);
  })
  .then((data) => {
    console.log("Data".data);
    const currencies = Object.keys(data.rates);
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.text = currency;
      fromCurrency.addEventListener(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.text = currency;
      toCurrency.addEventListener(option2);
    });
  });

function convertCurrency() {
  console.log("Inside function...");
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount === "" || isNaN(amount)) {
    alert("Please enter a valid number");
    return;
  }

  const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

  fetch(conversionUrl).then((response) => {
    const res = response.json();
    console.log(res);
  });
}
