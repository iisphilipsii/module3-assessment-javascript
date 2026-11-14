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

// Rebuilds whole list from the transactions array, so page always matches the data
function renderTransactions() {
  const list = document.getElementById("transaction-list");
  // Empty the list first, or else every render would add all the old rows again
  list.textContent = "";

  for (let i = 0; i < transactions.length; i++) {
    const item = document.createElement("li");

    const descriptionText = document.createElement("span");
    descriptionText.classList.add("transaction-description");
    descriptionText.textContent = transactions[i].description;

    const amountText = document.createElement("span");
    amountText.classList.add("transaction-amount");
    amountText.textContent = formatMoney(transactions[i].amount);

    item.appendChild(descriptionText);
    item.appendChild(amountText);
    // A delete button for this row; the aria-label tells screen readers which expense it removes
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("secondary-button", "delete-button");
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete " + transactions[i].description);
    // This runs later, when the button is clicked, and remembers this row's i
    deleteButton.addEventListener("click", function () {
      deleteTransaction(i);
    });
    item.appendChild(deleteButton);

    list.appendChild(item);
  }
}

// Works out the totals from the data and shows them in the summary card
function updateSummary() {
  // A running total: start at 0 and add each expense's amount in turn
  let expenses = 0;
  for (let i = 0; i < transactions.length; i++) {
    expenses = expenses + transactions[i].amount;
  }

  // Round to whole cents, so tiny floating-point leftovers (0.1 + 0.2 is 0.30000000000000004) can't make it look negative
  const balance = Math.round((income - expenses) * 100) / 100;

  document.getElementById("income-total").textContent = formatMoney(income);
  document.getElementById("expense-total").textContent = formatMoney(expenses);

  const balanceElement = document.getElementById("balance");
  balanceElement.textContent = formatMoney(balance);

  // Red only when below zero; a balance of exactly €0.00 isn't overspending
  if (balance < 0) {
    balanceElement.classList.add("negative");
  } else {
    balanceElement.classList.remove("negative");
  }
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
  renderTransactions();
  updateSummary();

  // Clear the form and put the cursor back in the first box, ready for the next expense
  descriptionInput.value = "";
  amountInput.value = "";
  descriptionInput.focus();

  showMessage(messageElement, "Added " + description + " (" + formatMoney(amount) + ").", "success");
}

// Removes one expense by its position in the array, then redraws the list and the totals
function deleteTransaction(index) {
  // Keep the description before it's removed, for the message
  const description = transactions[index].description;
  // splice(index, 1) removes 1 item, starting at that position
  transactions.splice(index, 1);
  renderTransactions();
  updateSummary();
  showMessage(document.getElementById("expense-message"), "Deleted " + description + ".", "success");
}

// Runs when the income form is submitted: adds up every week box and sets the month's income
function setIncome(event) {
  event.preventDefault();

  const messageElement = document.getElementById("income-message");
  // Every week box has the week-pay class, so this finds 4 boxes now, or 5 boxes once week 5 is added
  const weekInputs = document.querySelectorAll(".week-pay");
  let total = 0;
  let filledBoxes = 0;

  for (let i = 0; i < weekInputs.length; i++) {
    const input = weekInputs[i];

    // badInput is true when the box holds something the browser can't read as a number, like "1e"
    if (input.validity.badInput) {
      showMessage(messageElement, "Week " + (i + 1) + " isn't a valid number.", "error");
      input.focus();
      return;
    }

    // An empty box counts as €0, so it's skipped; income can be set part-way through the month
    if (input.value !== "") {
      const pay = Number(input.value);
      if (pay < 0) {
        showMessage(messageElement, "Week " + (i + 1) + " can't be negative.", "error");
        input.focus();
        return;
      }
      total = total + pay;
      filledBoxes = filledBoxes + 1;
    }
  }

  if (filledBoxes === 0) {
    showMessage(messageElement, "Enter your take-home pay for at least one week.", "error");
    weekInputs[0].focus();
    return;
  }

  // Replace the old income rather than adding to it, so clicking again recalculates from the boxes
  income = total;
  updateSummary();
  showMessage(messageElement, "Income updated: " + formatMoney(income) + ".", "success");
}

// This adds a fifth week box for months with five paydays, then hides the button so there can never be a sixth week
function addWeekFive() {
  // same structure as the four boxes in index.html: a div holding a label and a number input
  const field = document.createElement("div");
  field.classList.add("week-field");

  const label = document.createElement("label");
  label.setAttribute("for", "week-5");
  label.textContent = "Week 5 (€)";

  const input = document.createElement("input");
  input.type = "number";
  input.id = "week-5";
  input.classList.add("week-pay");
  input.placeholder = "0.00";
  input.min = "0";
  input.step = "0.01";

  field.appendChild(label);
  field.appendChild(input);
  document.getElementById("week-fields").appendChild(field);

  // A month has at most five paydays, so button's job is done
  document.getElementById("add-week-5").classList.add("hidden");
  // The button the user just pressed has gone, so move the cursor somewhere useful: the new box
  input.focus();
}

// Connect the forms to their function. Listening for "submit" catches the button and enter key
document.getElementById("expense-form").addEventListener("submit", addTransaction);
document.getElementById("income-form").addEventListener("submit", setIncome);
document.getElementById("add-week-5").addEventListener("click", addWeekFive);
// Show the starting figures from the data when the page first loads
updateSummary();
