const billInput = document.querySelector("#bill"),
  tipInput = document.querySelector("#tip"),
  peopleInput = document.querySelector("#numPeople"),
  tipButtons = document.querySelectorAll(".billing button"),
  tipAmount = document.querySelector("#tipAmount"),
  totalAmount = document.querySelector("#totalAmount"),
  pplLabel = document.querySelector(".peopleLabel"),
  resetButton = document.querySelector(".reset-button");

let tipValue, tip, total;

function calculate() {
  if (peopleInput.value > 0 && tipValue && billInput.value) {
    removeError();
    tip = parseFloat(billInput.value) * tipValue;
    tip /= parseInt(peopleInput.value);
    tipAmount.textContent = (Math.floor(tip * 100) / 100).toFixed(2);
    calculateTotal();
  } else if (peopleInput.value == 0 || peopleInput.value == "") {
    peopleInput.classList.add("error-border");
    pplLabel.classList.add("not-zero");
  }
}

function calculateTotal() {
  total = parseFloat(billInput.value) / parseInt(peopleInput.value) + tip;
  totalAmount.textContent = (Math.floor(total * 100) / 100).toFixed(2);
}

function removeColor() {
  if (tipInput.classList.contains("toggle-custom-tip")) {
    tipInput.classList.remove("toggle-custom-tip");
  }

  tipButtons.forEach((tipButton) => {
    if (tipButton.classList.contains("toggleButton")) {
      tipButton.classList.remove("toggleButton");
    }
  });
}

function removeError() {
  pplLabel.classList.remove("not-zero");
  peopleInput.classList.remove("error-border");
}

function reset() {
  removeColor();
  [billInput.value, peopleInput.value, tipInput.value] = Array(3).fill("");
  [tipValue, tip, total] = Array(3).fill(undefined);
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
}

for (let tipButton of tipButtons) {
  tipButton.addEventListener("click", function () {
    removeColor();
    this.classList.add("toggleButton");
    tipValue = parseFloat(this.innerText) / 100;
    calculate();
  });
}

tipInput.addEventListener("click", removeColor);

tipInput.addEventListener("focusout", function () {
  tipValue = parseFloat(this.value) / 100;
  this.classList.add("toggle-custom-tip");
  calculate();
});

if (!tipValue) {
  billInput.addEventListener("focusout", calculate);

  peopleInput.addEventListener("focusout", () => {
    if (peopleInput.value > 0) removeError();
    calculate();
  });
}

resetButton.addEventListener("click", reset);
