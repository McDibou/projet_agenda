let calendar = document.querySelector('.calendar-body')
let viewDate = document.querySelector(".view-date");

let today = new Date()
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    viewCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    viewCalendar(currentMonth, currentYear);
}

viewCalendar(currentMonth, currentYear)

function nbrDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}

function viewCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    calendar.innerHTML = "";
    viewDate.innerHTML = months[month] + " " + year;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > nbrDaysInMonth(year, month)) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("current");
                }

                for (let item of noteArray.tab) {
                    let dateNote = item.recallDate
                    if (date === dateNote.getDate() && year === dateNote.getFullYear() && month === dateNote.getMonth()) {
                        let p = document.createElement('p')
                        p.insertAdjacentHTML('beforeend', item.title)
                        cell.append(p)
                    }
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        calendar.appendChild(row);
    }
}