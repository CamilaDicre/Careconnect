document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.querySelector('.calendar-days');
    const monthDisplay = document.querySelector('.calendar-header h4');
    const prevMonthBtn = document.querySelector('.calendar-header button:first-child');
    const nextMonthBtn = document.querySelector('.calendar-header button:last-child');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Days with appointment: format { day: number, name: string }
    const eventDays = [
        { day: 10, name: 'Dra. Martínez' },
        { day: 18, name: 'Enfermero Juan' },
        { day: 22, name: 'Dr. López' }
    ];

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Update month and year display
        monthDisplay.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        // Clear previous calendar days
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('text-muted');
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;

            // Check if the day has an appointment
            const event = eventDays.find(e => e.day === day);
            if (event) {
                dayElement.classList.add('event-day');
                // Círculo pequeño
                const circle = document.createElement('span');
                circle.className = 'event-dot';
                dayElement.appendChild(document.createElement('br'));
                dayElement.appendChild(circle);
                // Tooltip
                dayElement.title = `Appointment with ${event.name}`;
            }

            // Highlight current day
            if (day === currentDate.getDate() && 
                currentMonth === currentDate.getMonth() && 
                currentYear === currentDate.getFullYear()) {
                dayElement.classList.add('active');
            }

            // Add click event for selecting days
            dayElement.addEventListener('click', () => {
                document.querySelectorAll('.calendar-days div').forEach(el => {
                    el.classList.remove('active');
                });
                dayElement.classList.add('active');
            });

            calendarDays.appendChild(dayElement);
        }
        // Rellenar la última fila si es necesario
        const totalCells = startingDay + totalDays;
        const extraCells = (7 - (totalCells % 7)) % 7;
        for (let i = 0; i < extraCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('text-muted');
            calendarDays.appendChild(emptyDay);
        }
    }

    // Event listeners for month navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Initialize calendar
    updateCalendar();
}); 