// The app's data. Several functions need these, so they live outside any function.
const transactions = [];
let income = 0;

// Turns a number into euro text with 2 decimal places, e.g. 5.5 becomes "€5.50" and -30 becomes "-€30.00"
function formatMoney(amount) {
  if (amount < 0) {
    return "-€" + Math.abs(amount).toFixed(2);
  }
  return "€" + amount.toFixed(2);
}

// This Shows feedback under a form. type is "success" or "error", which picks the colour class from style.css.
function showMessage(messageElement, text, type) {
  messageElement.textContent = text;

  messageElement.classList.remove("success", "error");
  messageElement.classList.add(type);
}

// Runs when the Add expense form is submitted, by clicking the button or pressing Enter
function addTransaction(event) {
  // Stop the browser's default submit, which would reload the page and lose everything
  event.preventDefault();

  const descriptionInput = document.getElementById("expense-description");
  const amountInput = document.getElementById("expense-amount");
  const messageElement = document.getElementById("expense-message");

  // trim() removes spaces from both ends, so a description of only spaces counts as empty
  const description = descriptionInput.value.trim();
  // Input values are always text, so convert the amount to a number before checking it
  const amount = Number(amountInput.value);

  if (description === "") {
    showMessage(messageElement, "Enter a description, for example Bus fare.", "error");
    descriptionInput.focus();
    return;
  }

  // An empty box becomes 0 and text becomes NaN; NaN fails every comparison. It needs its own check
  if (isNaN(amount) || amount <= 0) {
    showMessage(messageElement, "Enter an amount greater than €0.", "error");
    amountInput.focus();
    return;
  }

  transactions.push({ description: description, amount: amount });

  // Clear the form and put the cursor back in the first box, ready for the next expense
  descriptionInput.value = "";
  amountInput.value = "";
  descriptionInput.focus();

  showMessage(messageElement, "Added " + description + " (" + formatMoney(amount) + ").", "success");
}

// Connect the form to its function. Listening for "submit" catches the button and enter key
document.getElementById("expense-form").addEventListener("submit", addTransaction);
