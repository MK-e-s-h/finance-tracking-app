// Selectors
const form = document.getElementById('registration-form');
const nameInput = document.getElementById('student-name');
const tierSelect = document.getElementById('tier-select');
const studentList = document.getElementById('student-list');
const totalSavingsEl = document.getElementById('total-savings');

// Tier data
const TIERS = {
  1: { amount: 10000, interest: 0.05 },
  2: { amount: 20000, interest: 0.10 },
  3: { amount: 30000, interest: 0.20 }
};

// State
let students = JSON.parse(localStorage.getItem('students')) || [];

// Save students to localStorage
function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Update the dashboard
function updateDashboard() {
  studentList.innerHTML = '';
  let totalSavings = 0;

  students.forEach((student, index) => {
    const weeklyInterest = student.totalAmount * TIERS[student.tier].interest;
    const totalWithdrawal = student.totalAmount + weeklyInterest;
    totalSavings += student.totalAmount;

    // Create list item
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${student.name}</strong> - Tier ${student.tier} - Saved: ${student.totalAmount} - Interest: ${weeklyInterest.toFixed(2)} - Total: ${totalWithdrawal.toFixed(2)}
      </div>
      <div style="margin-top:5px;">
        <input type="number" id="withdraw-${index}" placeholder="Enter amount" style="width:120px; margin-right:5px;">
        <button onclick="withdrawStudent(${index})">Withdraw</button>
      </div>
    `;
    studentList.appendChild(li);
  });

  totalSavingsEl.textContent = totalSavings;
}

// Registration handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const tier = tierSelect.value;

  if (!TIERS[tier]) {
    alert('Please select a valid tier.');
    return;
  }

  const tierAmount = TIERS[tier].amount;

  // Check if student exists with same tier
  const existingStudent = students.find(s => s.name.toLowerCase() === name.toLowerCase() && s.tier === tier);

  if (existingStudent) {
    existingStudent.totalAmount += tierAmount; // Add to existing contributions
  } else {
    if (students.length >= 12) {
      alert('The group is full. Maximum 12 students allowed.');
      return;
    }
    students.push({ name, tier, totalAmount: tierAmount });
  }

  saveStudents();
  updateDashboard();
  form.reset();
});

// Partial withdrawal function
window.withdrawStudent = function(index) {
  const student = students[index];
  const input = document.getElementById(`withdraw-${index}`);
  const amount = parseFloat(input.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount.");
    return;
  }

  if (amount > student.totalAmount) {
    alert("You cannot withdraw more than your total savings.");
    return;
  }

  student.totalAmount -= amount;

  // Remove student if their balance reaches 0
  if (student.totalAmount === 0) {
    students.splice(index, 1);
  }

  saveStudents();
  updateDashboard();
}

// Initial render
updateDashboard();
