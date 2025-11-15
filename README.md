Finance Tracking App

A simple web application for tracking student savings in a group, allowing students to contribute multiple times to a tier, monitor weekly interest, and make partial withdrawals.

This app simulates a savings group investing in a Play-to-Earn blockchain game, with dynamic updates and persistent storage.

Features

Student Registration

Students can register by entering their name and selecting a savings tier.

Each tier has a fixed contribution and weekly interest:

Tier 1: 10,000 Naira – 5% interest per week

Tier 2: 20,000 Naira – 10% interest per week

Tier 3: 30,000 Naira – 20% interest per week

Multiple contributions by the same student in the same tier are summed automatically.

Savings Dashboard

Displays total savings by all members.

Shows a detailed breakdown of each student's contribution, weekly interest, and total withdrawable amount.

Partial Withdrawals

Students can withdraw a portion of their savings without leaving the group.

Withdrawal amount cannot exceed the student's current balance.

Students are removed from the group only when their balance reaches zero.

Tier Validation

Ensures students can only contribute the correct amount for their chosen tier.

Persistent Data

Student contributions and balances are saved in localStorage, so data is retained across browser sessions.

Responsive & User-Friendly

Clean interface with inline inputs for withdrawals.

Dynamic dashboard updates on registration or withdrawal.

How to Use

Open the App

Open index.html in a web browser.

Register a Student

Enter the student’s name.

Select a tier (Tier 1, 2, or 3).

Click Submit.

If the student already exists in the tier, the contribution will be added to their previous savings.

View Dashboard

See all students, their contributions, weekly interest, and total withdrawable amounts.

Total savings by all members is displayed at the top.

Withdraw Savings

Enter the amount to withdraw in the input box next to the student.

Click Withdraw.

The dashboard will update automatically.

If the student withdraws all funds, they are removed from the group.

Project Structure
finance-tracking-app/
│
├── index.html       # Main HTML page
├── style.css        # CSS styling
└── app.js           # JavaScript logic for registration, contributions, and withdrawals

Technologies Used

HTML5

CSS3

JavaScript (Vanilla)

Browser localStorage for data persistence

Additional Notes

Maximum 12 unique students are allowed in the group.

Contributions and withdrawals are dynamic and update instantly on the dashboard.

Supports multiple contributions per student and partial withdrawals.

Designed to be simple, responsive, and user-friendly.
echo "Updating README for PR test" >> README.md