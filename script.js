// Getting all the elements from the HTML
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const netAmount = document.getElementById("net-amount");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const option = document.getElementById("type");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-btn");

// Radio buttons for history filters
const allHistoryRadio = document.getElementById("all-history-radio");
const incomeHistoryRadio = document.getElementById("income-history-radio");
const expenseHistoryRadio = document.getElementById("expense-history-radio");

// Sections to show all, income, and expense histories
const allHistorySection = document.getElementById("all-history-section");
const incomeHistorySection = document.getElementById("income-history-section");
const expenseHistorySection = document.getElementById(
  "expense-history-section"
);

// Variables to store all records and check editing state
let records = [];
let editId = null;

// Function to load data from local storage
function loadStorage() {
  const rawData = localStorage.getItem("records");
  if (rawData) {
    try {
      records = JSON.parse(rawData); //convert JSON data to array
    } catch {
      records = []; //if something goes wrong, reset to empty
    }
  }
}
loadStorage(); // load data when page starts
renderData(currentFilter()); // render the data on screen

// Function to save records into local storage
function saveStorage() {
  localStorage.setItem("records", JSON.stringify(records));
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault(); // stop form from refreshing the page

  const text = description.value.trim();
  const number = Number(amount.value);
  const type = option.value;

  // simple validation check
  if (!text || isNaN(number) || number <= 0) {
    message.textContent = "Please enter valid description and amount.";
    return;
  }
  message.textContent = "";

  // if editing an existing record
  if (editId) {
    const index = records.findIndex((r) => r.id === editId);
    if (index !== -1) {
      records[index].text = text;
      records[index].number = number;
      records[index].type = type;
    }
    editId = null;
  } else {
    records.push({ id: Date.now(), text, number, type }); // if adding a new record
  }

  // reset form and save data
  resetForm();
  saveStorage();
  renderData(currentFilter());
});

// Reset button clears the form
resetButton.addEventListener("click", resetForm);
function resetForm() {
  description.value = "";
  amount.value = "";
  option.value = "income";
  editId = null;
  message.textContent = "";
}

// Function to create each record row
function createRecord(ele) {
  const container = document.createElement("div");
  container.className = "records-row";

  // show description and amount with type color
  const span = document.createElement("span");
  span.textContent = `${ele.text} : ₹${ele.number.toFixed(2)}`;
  span.className = ele.type === "income" ? "income-item" : "expense-item";

  // edit button to modify data
  const editBtn = document.createElement("button");
  editBtn.textContent = "🖊️";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    description.value = ele.text;
    amount.value = ele.number;
    option.value = ele.type;
    editId = ele.id;
  });

  // delete button to remove record
  const delBtn = document.createElement("button");
  delBtn.textContent = "🚮";
  delBtn.className = "del-btn";
  delBtn.addEventListener("click", () => {
    records = records.filter((item) => item.id != ele.id);
    saveStorage();
    renderData(currentFilter());
  });

  // add buttons inside a container
  const containerBtn = document.createElement("div");
  containerBtn.className = "container-btn";

  container.appendChild(span);
  containerBtn.append(editBtn, delBtn);
  container.appendChild(containerBtn);
  return container;
}

// Function to show data on screen
function renderData(filter = "all") {
  let income = 0;
  let expense = 0;

  // clear all sections first
  allHistorySection.innerHTML = "";
  incomeHistorySection.innerHTML = "";
  expenseHistorySection.innerHTML = "";

  // loop through each record
  records.forEach((ele) => {
    if (ele.type === "income") income += ele.number;
    else expense += ele.number;

    // add record to correct section
    allHistorySection.appendChild(createRecord(ele));
    if (ele.type === "income")
      incomeHistorySection.appendChild(createRecord(ele));
    if (ele.type === "expense")
      expenseHistorySection.appendChild(createRecord(ele));
  });

  // show total income, expense, and balance
  incomeAmount.textContent = `${income.toFixed(2)}`;
  expenseAmount.textContent = `${expense.toFixed(2)}`;
  netAmount.textContent = `${(income - expense).toFixed(2)}`;

  // show only selected section
  showFilterSection(filter);
}

// Function to check which filter is selected
function currentFilter() {
  if (allHistoryRadio.checked) return "all";
  if (incomeHistoryRadio.checked) return "income";
  if (expenseHistoryRadio.checked) return "expense";
  return "all";
}

// Function to show/hide sections based on filter
function showFilterSection(filter) {
  allHistorySection.style.display = filter === "all" ? "block" : "none";
  incomeHistorySection.style.display = filter === "income" ? "block" : "none";
  expenseHistorySection.style.display = filter === "expense" ? "block" : "none";

  // make sure correct radio stays checked
  allHistoryRadio.checked = filter === "all";
  incomeHistoryRadio.checked = filter === "income";
  expenseHistoryRadio.checked = filter === "expense";
}

// When filter radio buttons are clicked
allHistoryRadio.addEventListener("change", () => renderData(currentFilter()));
incomeHistoryRadio.addEventListener("change", () =>
  renderData(currentFilter())
);
expenseHistoryRadio.addEventListener("change", () =>
  renderData(currentFilter())
);
