// DOM selectors
const form = document.getElementById('transaction-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');

const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

const filterType = document.getElementById('filter-type');
const filterCategory = document.getElementById('filter-category');

const exportBtn = document.getElementById('export-csv');

const ctx = document.getElementById("financeChart").getContext("2d");

// Transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Save to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Render transactions
function renderTransactions() {
    transactionList.innerHTML = '';
    const typeFilter = filterType.value;
    const categoryFilterVal = filterCategory.value.toLowerCase();

    transactions
        .filter(t => (typeFilter === 'all' || t.type === typeFilter) &&
                     (!categoryFilterVal || t.category.toLowerCase().includes(categoryFilterVal)))
        .forEach((t, index) => {
            const li = document.createElement('li');
            li.textContent = `${t.date} - ${t.title} - ${t.category || 'Uncategorized'} - ${t.type} - $${t.amount}`;
            transactionList.appendChild(li);
        });

    updateSummary();
    updateChart();
}

// Update summary
function updateSummary() {
    const income = transactions.filter(t => t.type === 'income')
                               .reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense')
                                .reduce((acc, t) => acc + Number(t.amount), 0);

    totalIncomeEl.textContent = income;
    totalExpenseEl.textContent = expense;
    balanceEl.textContent = income - expense;
}

// Add transaction
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const transaction = {
        title: titleInput.value,
        amount: amountInput.value,
        date: dateInput.value,
        type: typeInput.value,
        category: categoryInput.value
    };
    transactions.push(transaction);
    saveTransactions();
    renderTransactions();
    form.reset();
});

// Filters
filterType.addEventListener('change', renderTransactions);
filterCategory.addEventListener('input', renderTransactions);

// CSV export
exportBtn.addEventListener('click', () => {
    if (transactions.length === 0) return alert("No transactions to export.");
    
    const csvHeader = ["Title","Amount","Date","Type","Category"];
    const csvRows = transactions.map(t => [t.title, t.amount, t.date, t.type, t.category || ""]);
    const csvContent = [csvHeader.join(","), ...csvRows.map(row => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
});

// Chart.js
function updateChart() {
    const income = transactions.filter(t => t.type === 'income')
                               .reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense')
                                .reduce((acc, t) => acc + Number(t.amount), 0);

    if (window.financeChart) {
        window.financeChart.data.datasets[0].data = [income, expense];
        window.financeChart.update();
    } else {
        window.financeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [{
                    data: [income, expense],
                    backgroundColor: ['#4CAF50','#F44336']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

// Initial render
renderTransactions();
