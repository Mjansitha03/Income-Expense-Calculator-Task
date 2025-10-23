# Income Expense Calculator

Simple, client-side Income & Expense Calculator for tracking income, expenses and computing balance for a session task.

## Features
- Add income and expense entries (title, amount, date optional).
- Show totals: total income, total expenses, current balance.
- Edit and remove entries.
- Persist data locally (localStorage) so values survive page reloads.

## Getting Started

1. Clone the repository:
    
    git clone https://github.com/Mjansitha03/Income-Expense-Calculator-Task.git.
    
2. Open the project folder.
3. Open `index.html` in your browser to view the landing page.

## Usage
- Add an entry by choosing type (Income/Expense), entering title and amount, then submit.
- Edit or delete entries from the list.
- Totals update automatically. Data persists in localStorage.

## Project structure
- index.html — main page
- css/ — stylesheets
- js/ — JavaScript logic
- assets/ — images/icons
- README.md — this file

Adjust names if your structure differs.

## Development notes
- Keep business logic separate from DOM code for easier testing.
- Validate amounts as numbers and sanitize text inputs.
- Use `localStorage` key like `income-expense-data` for persistence.

## Contributing
Suggestions and bug reports welcome. Open an issue or submit a PR with a short description of changes.

## License
Add a license file (e.g., MIT) if you intend to publish or share.
