const form = document.getElementById("form");
const billVal = document.getElementById("bill");
const tipBtns = document.querySelectorAll(".tip-buttons button");
const inputs = document.querySelectorAll(".input");
const people = document.getElementById("people");
const custom = document.getElementById("custom");
const reset = document.getElementById("reset");
let tipAmount = document.getElementById("tip-val");
let total = document.getElementById("total-val");

let tipVal = 0;
let result;

form.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    const input = e.target;
    if (isNaN(input.value) || input.value.includes(" ")) {
      input.value = "";

      input.classList.add("shake", "error");
      input.placeholder = "enter valid number";

      input.addEventListener(
        "animationend",
        () => {
          input.classList.remove("shake", "error");
          input.placeholder = "0";
        },
        { once: true }
      );
    } else {
      input.classList.remove("error");
    }
  }
});

custom.addEventListener("click", () => {
  tipBtns.forEach((element) => {
    element.id = "";
  });
});
custom.addEventListener("input", () => {
  tipBtns.forEach((element) => {
    element.id = "";
  });
  tipVal = parseFloat(custom.value) / 100;
});
tipBtns.forEach((element) => {
  element.addEventListener("click", () => {
    tipVal = parseFloat(element.innerText) / 100;

    tipBtns.forEach((element) => {
      element.id = "";
    });

    element.id = "selected-tip";
    CalculateResults();
  });
});

form.addEventListener("input", CalculateResults);

function CalculateResults() {
  let bill = parseFloat(billVal.value);
  let PeopleNum = parseInt(people.value);

  if (bill > 0 && PeopleNum > 0 && !isNaN(bill) && !isNaN(PeopleNum)) {
    tipAmount;
    result = (bill + tipVal * bill) / PeopleNum;

    if (tipVal > 0) {
      tipAmount.innerText = "$" + ((tipVal * bill) / PeopleNum).toFixed(2);
    }

    total.innerText = "$" + result.toFixed(2);
  }
}
reset.addEventListener("click", () => {
  billVal.value = "";
  people.value = "";
  custom.value = "";
  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
  tipVal = 0;
  result = 0;

  CalculateResults();
});
