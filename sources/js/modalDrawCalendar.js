
const modalDrawCalendar = (function() {
    let list;
    let currentDay;
    let currentWeekDay;


    function addHandlers() {
        list = document.querySelector('.list');
    }

    function open(currentMonth, currentYear) {
        prevMonday(currentMonth, currentYear);
    }

    function init() {
        addHandlers();
        addCalendar();
    }

    function prevMonday(currentMonth, currentYear) {
        const date = new Date(currentYear, currentMonth, 1);
        const newDate = new Date(date);
        const nextDate = new Date(currentYear, currentMonth + 1, 0);
        const dayAmount = nextDate.getDate();
        const day = date.getDay();
        const diff = 86400000;
        nextDate.setTime(date.getTime() + (dayAmount -1) * diff);
        if (day === 0) {
            newDate.setTime(date.getTime() - 6 * diff);
        } else {
            newDate.setTime(date.getTime() - (day - 1) * diff)
        }
        getTemplate(newDate, diff, date, nextDate);
        modalCalendarEvent.addContent(currentMonth, currentYear, newDate, diff, dayAmount);
    }

    function getTemplate(newDate, diff, date, nextDate) {
        [].forEach.call(list.children, (el, idx) => {
            if (newDate.getTime() < date.getTime()) {
                list.children[idx].style.background = 'rgb(236, 236, 236)';
            } else {
                list.children[idx].style.background = 'white';
            }
            if (newDate.getTime() > nextDate.getTime()) {
                list.children[idx].style.background = 'rgb(236, 236, 236)';
            }
            if (idx < 7) {
                currentWeekDay = newDate.toLocaleString('ru', {weekday: 'long'});
                currentDay = newDate.toLocaleString('ru', {day: 'numeric'});
                list.children[idx].children[0].innerHTML = currentWeekDay + ', ' + currentDay;
                newDate.setTime(newDate.getTime() + diff);
            } else {
                currentDay = newDate.toLocaleString('ru', {day: 'numeric'});
                list.children[idx].children[0].innerHTML = currentDay;
                newDate.setTime(newDate.getTime() + diff);
            }
        });
    }

    function addCalendar() {
        for (let i = 0; i < 42; i++) {
            list.insertAdjacentHTML('afterBegin', '<li class="list__item">' +
                                                        '<span class="list__item-date"></span>' +
                                                        '<span class="list__item-type"></span>' +
                                                        '<span class="list__item-event"</span>' +
                                                '</li>')
        }
    }

    return {openModal: open,
            addContent: init}

})();