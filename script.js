const titleEl = document.getElementById('title');
const gridEl  = document.getElementById('grid');

let viewDate = new Date(); // current month

function startOfMonth(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  const dow = (d.getDay() + 6) % 7; // Monday=0
  d.setDate(d.getDate() - dow);
  return d;
}

function endOfMonth(date) {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() + (6 - dow));
  return d;
}

function fmtISO(d) {
  return d.toISOString().split('T')[0];
}

function render() {
  const monthName = viewDate.toLocaleString(undefined, { month: 'long' });
  const year = viewDate.getFullYear();
  titleEl.textContent = `${monthName} ${year}`;

  // remove old days
  const nodesToRemove = Array.from(gridEl.children).slice(7);
  nodesToRemove.forEach(n => n.remove());

  const start = startOfMonth(viewDate);
  const end   = endOfMonth(viewDate);
  const todayISO = fmtISO(new Date());

  const d = new Date(start);
  while (d <= end) {
    const cell = document.createElement('div');
    cell.className = 'day';
    if (d.getMonth() !== viewDate.getMonth()) cell.style.opacity = 0.4;
    if (fmtISO(d) === todayISO) cell.classList.add('today');
    cell.textContent = d.getDate();
    gridEl.appendChild(cell);
    d.setDate(d.getDate() + 1);
  }
}

// controls
document.getElementById('prev').addEventListener('click', () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
  render();
});
document.getElementById('next').addEventListener('click', () => {
  viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
  render();
});

// initial render
render();
