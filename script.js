const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const previousDisplayText = document.querySelector("[data-previous-display]");
const currentDisplayText = document.querySelector("[data-current-display]");

class Calc {
  constructor(previousDisplayText, currentDisplayText) {
    this.previousDisplayText = previousDisplayText;
    this.currentDisplayText = currentDisplayText;
    this.clear();
  }

  clear() {
    this.previousDisplay = "";
    this.currentDisplay = "";
    this.operation = undefined;
  }

  delete() {}

  appendNumber(number) {
    if (number === "." && this.currentDisplay.includes(".")) return;
    this.currentDisplay = this.currentDisplay.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentDisplay === "") return;
    if (this.previousDisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousDisplay = this.currentDisplay;
    this.currentDisplay = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousDisplay);
    const current = parseFloat(this.currentDisplay);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
    }
  }

  updateDisplay() {
    this.currentDisplayText.innerText = this.currentDisplay;
    this.previousDisplayText = this.previousDisplay;
  }
}

const calculator = new Calc(previousDisplayText, currentDisplayText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
