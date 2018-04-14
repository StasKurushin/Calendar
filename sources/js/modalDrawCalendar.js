
const modalDrawCalendar = (function() {
    let list;
    let currentDay;
    let currentMonth;
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
        const day = date.getDay();
        const diff = 86400000;
        if (day === 0) {
            newDate.setTime(date.getTime() - 6 * diff);
        } else {
            newDate.setTime(date.getTime() - (day - 1) * diff)
        }
        getTemplate(newDate, diff);
        modalCalendarEvent.addContent(currentMonth, currentYear);
    }

    function getTemplate(newDate, diff) {
        [].forEach.call(list.children, (el, idx) => {
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
            addContent: init
            }

})();