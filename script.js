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

  delete() {
    this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentDisplay.includes(".")) return;
    this.currentDisplay = this.currentDisplay.toString() + number.toString();
    // this.computation = this.currentDisplay;
  }

  chooseOperation(operation) {
    if (operation == "/" && this.currentDisplayText.innerText === "0") {
      alert("Can't divide zero!");
      return;
    }
    if (this.currentDisplay === "") return;
    if (this.previousDisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousDisplay = this.currentDisplay;
    this.currentDisplay = "";
  }

  compute() {
    // this.computation = this.currentDisplay;
    let computation;
    const prev = parseFloat(this.previousDisplay);
    const current = parseFloat(this.currentDisplay);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }
    this.previousDisplay = "";
    this.currentDisplay = computation;
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplayText.innerText = this.getDisplayNumber(
      this.currentDisplay
    );
    if (this.operation != null) {
      this.previousDisplayText.innerText = `${this.getDisplayNumber(
        this.previousDisplay
      )} ${this.operation}`;
    } else {
      this.previousDisplayText.innerText = "";
    }
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

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
