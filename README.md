Personal Finance Tracker

A simple and responsive Personal Finance Tracker built with vanilla JavaScript, HTML, and CSS. Track your income and expenses, categorize transactions, filter data, and view your balance—all in one place.

Features

Add income and expense transactions with title, amount, date, and category.

Filter transactions by type (income/expense/all) and category.

View summary: total income, total expenses, and balance.

Persistent data: transactions are stored in localStorage to retain data across sessions.

Fully responsive design for mobile, tablet, and desktop devices.

Live Demo

View Demo
Hosted on vercel 
(https://personal-finance-tracker-sigma-dun.vercel.app/)

Setup & Usage

Clone the repository:

git clone https://github.com/MK-e-s-h/personal-finance-tracker.git
cd personal-finance-tracker


Open the app:

Open index.html in your browser.

No server setup is required.

Using the app:

Fill in the Transaction Form and click Add Transaction.

Use the Filters to view specific types or categories.

Check the Summary for your total income, expenses, and balance.

Project Structure
personal-finance-tracker/
├── index.html       # Main HTML page
├── style.css        # Styling
├── app.js           # JavaScript logic
└── README.md        # Project documentation

Tech Stack

Vanilla JavaScript 

HTML & CSS

localStorage (for data persistence)

Future Improvements

Add charts to visualize income vs. expenses.

Add edit/delete transaction functionality.

Add CSV export feature.

Add user authentication for personal data tracking.

Git Workflow for Submission

Create a branch:

git checkout -b feature/add-transaction


Commit changes with clear messages:

git commit -m "Add transaction form with validation"


Push branch and create a Pull Request (PR) to main:

git push origin feature/add-transaction