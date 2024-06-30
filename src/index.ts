const inputsDiv = document.querySelectorAll("#read") as NodeListOf<HTMLDivElement>;

const button = document.querySelector("button") as HTMLButtonElement;

const result = document.querySelector("#result") as HTMLDivElement;

const repayment = document.querySelector("#repayment") as HTMLParagraphElement;

const totalRepayment = document.querySelector("#total-repayment") as HTMLParagraphElement;

const radioParent = document.querySelector("input[type='radio']")?.parentNode;

document.querySelector("form")?.addEventListener("submit", (e) => e.preventDefault())

document.querySelector("#clear")?.addEventListener("click", () => {
  inputsDiv.forEach((input) => {
    (input.children.item(1) as HTMLInputElement).value = "";
  })
  radioActions((repay, interest) => {
    repay.checked = false;
    interest.checked = false;
    return true;
  })
})

button.addEventListener("click", () => {
  let isValid = true;

  for (let i = 0; i < inputsDiv.length; i++) {
    const readInput = inputsDiv.item(i);

    const inputValue = readInput.children.item(1) as HTMLInputElement;

    if (inputValue.value !== "") continue;
    isValid = false

    const logoSpan = readInput.children.item(0) as HTMLSpanElement;

    readInput.style.borderColor = "hsl(4, 69%, 50%)"

    logoSpan.style.backgroundColor = 'hsl(4, 69%, 50%)'
    logoSpan.style.color = 'white'

    readInput.classList.remove("after:hidden")
  }

  const verifyRadio = radioActions((repay, intrest) => {
    const result = repay.checked || intrest.checked;
    
    if (result === false) {
      (repay.nextElementSibling as HTMLElement).classList.add("!border-red");
      (intrest.nextElementSibling as HTMLElement).classList.add("!border-red");
      repay.parentElement?.classList.remove("after:hidden")
    }
    return result;
  })

  if (!verifyRadio || !isValid) return;
  
  inputsDiv.forEach((input) => {
    (input.children.item(1) as HTMLInputElement).type = 'text';
  })
  
  const input = document.querySelectorAll("input");

  result.children.item(0)?.classList.add("hidden")

  result.children.item(1)?.classList.remove("hidden");

  result.classList.remove("lg:place-items-center")

  radioActions((repay, intrest) => {
    repayment.innerHTML = repaymentFormater(calculateRepayment(input));

    if (intrest.checked === true) {
      repayment.parentElement?.classList.remove("border-b");
      totalRepayment.parentElement?.classList.add("hidden");
      return false;
    }

    repayment.parentElement?.classList.add("border-b");
    totalRepayment.parentElement?.classList.remove("hidden");
    totalRepayment.innerHTML = repaymentFormater(calculateTotalRepayment(input));
    return true;
  })

  setTimeout(() => {
    inputsDiv.forEach((input) => {
      (input.children.item(1) as HTMLInputElement).type = 'number';
    })
  }, 1)
})

inputsDiv.forEach((div) => {
  const logoSpan = div.children.item(0) as HTMLSpanElement;
  const input = div.children.item(1) as HTMLInputElement;


  input.addEventListener("keyup", () => {
    if (input.value === "") return;

    div.style.borderColor = "hsl(200, 26%, 54%)"

    logoSpan.style.backgroundColor = 'hsl(202, 86%, 94%)'
    logoSpan.style.color = 'hsl(200, 24%, 40%)'
    input.parentElement?.classList.add("after:hidden")
  })
})

const calculateRepayment = function(inputs: NodeListOf<HTMLInputElement>): number {
  const amount: number = Number.parseFloat(inputs.item(0).value);
  const term: number = Number.parseFloat(inputs.item(1).value);
  const interst: number = Number.parseFloat(inputs.item(2).value);

  // Convert annual interest rate to monthly rate
  const monthlyInterestRate = interst / (12 * 100);

  // Calculate the total number of payments
  const totalPayments = term * 12;

  // Apply the mortgage payment formula
  const monthlyPayment = amount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalPayments)) / (Math.pow((1 + monthlyInterestRate), totalPayments) - 1);

  // Return the result rounded to 2 decimal places
  return monthlyPayment;
}

const calculateTotalRepayment = function(inputs: NodeListOf<HTMLInputElement>): number {
  const monthlyPayment = calculateRepayment(inputs);
  const amount: number = Number.parseFloat(inputs.item(0).value);
  const term: number = Number.parseFloat(inputs.item(1).value) * 12;

  const totalInterest = monthlyPayment * term - amount;

  // Return the result rounded to 2 decimal places
  return totalInterest + amount;
}

const repaymentFormater = (result: number): string => {
  return '₤' + result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const radioActions = function(callback: (repay: HTMLInputElement, interest: HTMLInputElement) => boolean) {
  const radios = document.querySelectorAll("input[type = 'radio']") as NodeListOf<HTMLInputElement>
  const repayment = radios.item(0)
  const interest = radios.item(1);

  return callback(repayment, interest)
}

radioActions((repay, intrest) => {
  repay.nextElementSibling?.addEventListener("click", () => {
    repay.parentElement?.classList.add("after:hidden");
    (repay.nextElementSibling as HTMLElement).classList.remove("!border-red");
    (intrest.nextElementSibling as HTMLElement).classList.remove("!border-red");
  })
  return true;
})