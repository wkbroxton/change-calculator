// Write your JavaScript here

const chaChing = new Audio(
  "https://docs.google.com/uc?export=download&id=1L6d0xtsOvnKTMnLSa1KidM09jcbXgQp-"
);

chaChing.volume = 0.1;

const player = new Audio();

const calculateChange = function (price, cash) {
  let returnValue = cash - price;

  // Values are defined in cents
  const currency = [
    { currencyType: "hundred", currencyValue: 100, count: 0 },
    { currencyType: "fifty", currencyValue: 50, count: 0 },
    { currencyType: "twenty", currencyValue: 20, count: 0 },
    { currencyType: "ten", currencyValue: 10, count: 0 },
    { currencyType: "five", currencyValue: 5, count: 0 },
    { currencyType: "dollar", currencyValue: 1, count: 0 },
    { currencyType: "quarter", currencyValue: 0.25, count: 0 },
    { currencyType: "dime", currencyValue: 0.1, count: 0 },
    { currencyType: "nickel", currencyValue: 0.05, count: 0 },
    { currencyType: "penny", currencyValue: 0.01, count: 0 },
  ];

  let amount;

  for (let i = 0; i < currency.length; i++) {
    amount = Math.floor(returnValue / currency[i]["currencyValue"]);
    if (amount > 0) {
      currency[i]["count"] = amount;
      returnValue = returnValue % currency[i]["currencyValue"];
    }
  }

  return currency;
};

function handleClickEvent() {
  chaChing.play();
  let price = document.getElementById("amount-due").value;
  let cash = document.getElementById("amount-received").value;
  let result = calculateChange(price, cash); // mutated array currency from line 38
  for (let i = 0; i < result.length; i++) {
    document.getElementById(result[i]["currencyType"]).innerHTML =
      result[i]["count"]; // the only reason this works is because the ID matches exactly on the HTML Document
  }
  document.getElementById("currency").innerHTML = `$${(cash - price).toFixed(
    2
  )}`;
}

let calcButton = document.getElementById("calculate-change");

calcButton.addEventListener("click", handleClickEvent);

console.log(calculateChange(1787, 2000));
console.log(calculateChange(2623, 4000));
console.log(calculateChange(501, 1000));
