const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

let currentMonth = 0;

function generateCalendar(month) {
    const tbody = document.getElementById('calendar-body');
    tbody.innerHTML = '';
    const firstDay = new Date(2026, month, 1).getDay();
    let date = 1;
    for (let i=0;i<6;i++) {
        let row = document.createElement('tr');
        for (let j=0;j<7;j++) {
            let cell = document.createElement('td');
            if(i===0 && j<firstDay){
                cell.innerHTML = '';
            } else if(date > daysInMonth[month]){
                cell.innerHTML = '';
            } else {
                cell.innerHTML = date;
                date++;
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    document.getElementById('month-name').innerText = monthNames[month] + ' 2026';
}

document.getElementById('prev').addEventListener('click', ()=>{
    currentMonth = (currentMonth + 11) % 12;
    generateCalendar(currentMonth);
});

document.getElementById('next').addEventListener('click', ()=>{
    currentMonth = (currentMonth + 1) % 12;
    generateCalendar(currentMonth);
});

// Initialize
generateCalendar(currentMonth);
