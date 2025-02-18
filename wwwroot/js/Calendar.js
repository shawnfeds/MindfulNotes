// Initialize currentDate with the system's current date
let currentDate = new Date(); // This will always start from the current month and year
const today = new Date();
const todayshort = getDate(today);

// Function to get the weekday name
function getWeekdayName(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
}

// Get the day of the week for the 1st of the month
function getStartDay(month, year) {
    const date = new Date(year, month, 1);
    return date.getDay(); // 0-Sunday, 1-Monday, ..., 6-Saturday
}

// Render the calendar
function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const startDay = getStartDay(month, year);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Update calendar title
    document.getElementById('calendar-title').textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Update today's date in the sidebar (System Date)
    const formattedDate = today.toLocaleDateString();
    const weekdayName = getWeekdayName(today);

    document.getElementById('today-date').textContent = formattedDate;
    document.getElementById('weekday').textContent = weekdayName;

    let calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = ''; // Clear previous calendar

    let dayCounter = 1;
    let firstRow = true;

    // Calculate total number of rows required (only show rows if needed)
    const totalRows = Math.ceil((daysInMonth + startDay) / 7); // Calculate required number of rows based on days in the month

    const param = new URLSearchParams(window.location.search);
    const user = param.get("username");

    // Loop through weeks (5x7 grid)
    for (let i = 0; i < totalRows; i++) {
        let row = document.createElement('tr');

        // Loop through days of the week (Mon-Sun)
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            cell.classList.add('calendar-cell');

            // Add blank cells for days before the start of the month
            if (i === 0 && j < startDay) {
                cell.textContent = '';
                cell.classList.add('empty-cell');
                cell.classList.add('blankColumns');
                cell.style.backgroundColor = '#FFF2CD';
                row.appendChild(cell);
                continue;
            }

            // If we have days left in the month, display them
            if (dayCounter <= daysInMonth) {
                let dayLink = document.createElement('a');
                var date = new Date(year, month, dayCounter);
                var linkDate = getDate(date);
                dayLink.href = "/Home/ShowEntries?date=" + linkDate + "&username=" + user;
                dayLink.classList.add('text-decoration-none');
                dayLink.classList.add('text-dark');

                if (todayshort == linkDate) {
                    cell.style.backgroundColor = '#FFE083';
                }

                dayLink.textContent = dayCounter;

                cell.appendChild(dayLink);
                dayCounter++;
            }

            if (cell.textContent == '') {
                cell.style.backgroundColor = '#FFF2CD';
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

// Handle month navigation
document.getElementById('prev-month').onclick = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById('next-month').onclick = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

document.getElementById('add-entry').onclick = function () {
    const param = new URLSearchParams(window.location.search);
    const user = param.get("username");

    const description = document.getElementById('day-entry').value;

    const data = { Description: description, Username: user };

    fetch('/Home/AddEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showMessage('success', 'Entered the entry in the journal');
            document.getElementById('day-entry').value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage('error', 'Failed to enter the entry in the journal');
        });
}

// Function to display a success or error message
function showMessage(type, message) {
    const messageContainer = document.getElementById('message-container');

    // Create a div element for the alert
    const alertDiv = document.createElement('div');

    // Set the Bootstrap classes for the alert
    alertDiv.classList.add('alert');
    alertDiv.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
    alertDiv.classList.add('alert-dismissible');
    alertDiv.setAttribute('role', 'alert');

    // Set the message
    alertDiv.innerHTML = message;

    // Append the alert message to the container
    messageContainer.appendChild(alertDiv);

    // Automatically close the alert after 30 seconds
    setTimeout(() => {
        alertDiv.classList.add('fade'); // Optional: for fade-out effect
        alertDiv.style.transition = "opacity 1s ease-out"; // Smooth fade-out
        alertDiv.style.opacity = 0;  // Make it invisible

        // After fade-out, remove the element from DOM
        setTimeout(() => {
            alertDiv.remove();
        }, 500); // Allow time for the fade effect before removal
    }, 5000); // 5 seconds
}

function getDate(dateObj) {

    const dateString = dateObj.getDate() + '-'
        + (dateObj.getMonth() + 1) + '-'
        + dateObj.getFullYear();

    return dateString;
}

// Initial render
renderCalendar();