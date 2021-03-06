let calendar = document.querySelector('.calendar-body')
let viewDate = document.querySelector(".view-date")
let viewDay = document.querySelector('.view-day')

let today = new Date()
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()

let day = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

document.querySelector('.month').children[currentMonth].classList.add('current-month')

viewDay.querySelector('h1').innerHTML = (today.getDate().toString().length === 1) ? 0 + '' + today.getDate() : today.getDate()
viewDay.querySelector('h3').innerHTML = day[today.getDay()]
viewDay.querySelector('p').innerHTML = ((today.getMonth() + 1).toString().length === 1) ? 0 + '' + (today.getMonth() + 1) + '/' + today.getFullYear() : (today.getMonth() + 1) + '/' + today.getFullYear()
viewDay.dateNowCalendar = today

let month = document.querySelector('.month').children
for (let item of month) {
    item.addEventListener('click', selectMonth)
}

viewCalendar(currentMonth, currentYear)

function selectCalendar() {
    let date = document.querySelector('.view-day').dateNowCalendar
    let cell = document.querySelectorAll('td')

    for (let item of cell) {
        item.classList.remove('selected-calendar')

        if (item.dateCalendar) {

            if (item.dateCalendar.getTime() === date.getTime()) {
                item.classList.add('selected-calendar')
            }
        }
    }
}

function next() {
    currentYear = currentYear + 1
    viewCalendar(Number(document.querySelector('.current-month').id), currentYear);
    selectCalendar()
    Add.close()
}

function previous() {
    currentYear = currentYear - 1
    viewCalendar(Number(document.querySelector('.current-month').id), currentYear);
    selectCalendar()
    Add.close()
}

function selectMonth() {
    let month = document.querySelector('.month').children
    for (let item of month) {
        item.classList.remove('current-month')
    }
    this.classList.add('current-month')
    viewCalendar(Number(this.id), currentYear)
    selectCalendar()
    Add.close()
}

function nbrDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate()
}

function viewCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay()

    calendar.innerHTML = ""
    viewDate.innerHTML = year

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td")
                let cellText = document.createTextNode("")

                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > nbrDaysInMonth(year, month)) {
                break;
            } else {
                let cell = document.createElement("td")
                cell.addEventListener('click', Render.noteView)
                let cellText = document.createTextNode(date);
                cell.dateCalendar = new Date(year, month, date)

                cell.note = []
                for (let item of noteArray.tab) {
                    let dateNote = item.recallDate
                    if (date === dateNote.getDate() && year === dateNote.getFullYear() && month === dateNote.getMonth()) {
                        cell.note.push(item)
                    }
                }

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add('current-day');
                    cell.classList.add('selected-calendar')
                }

                cell.appendChild(cellText)

                if (cell.note.length > 0) {
                    let span = document.createElement('span')
                    span.classList.add('event')
                    cell.append(span)
                }

                row.appendChild(cell)
                date++
            }
        }
        calendar.appendChild(row);
    }
}