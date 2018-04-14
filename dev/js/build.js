const modalCalendar = (function() {

    let monthArr = ["Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь"];
    let currentDate;
    let currentDay;
    let currentMonth;
    let currentWeekDay;

    let target;
    let list;
    let calendar;


    function open() {
        currentMonth = currentDate.month;
        addHandlers();
        addCalendar();
        setDates(currentMonth);
    }

    function setDates(currentMonth) {
        target.innerHTML = monthArr[currentMonth] + " " + currentDate.year;
        prevMonday(currentMonth);

    }

    function addHandlers() {
        document.querySelector('#right').addEventListener('click', _nextMonth);
        document.querySelector('#left').addEventListener('click', _prevMonth);
        target = document.querySelector('.options__date');
        list = document.querySelector('.list');
        calendar = document.querySelector('.calendar-container');
    }

    function init (value) {
        currentDate = value;
    }

    function _nextMonth() {
        if (currentMonth < 11) {
            currentMonth++
        } else {
            currentDate.year++;
            currentMonth = 0;
        }
        setDates(currentMonth);
    }

    function _prevMonth() {
        if (currentMonth >= 1) {
            currentMonth--
        } else {
            currentDate.year--;
            currentMonth = 11;
        }
        setDates(currentMonth);
    }

    function addCalendar() {
        for (let i = 0; i < 42; i++) {
            list.insertAdjacentHTML('afterBegin', '<li class="list__item">' +
                                                    '<span class="list__item-date"></span>' +
                                                  '</li>')
        }
    }

    function prevMonday(currentMonth) {
        const date = new Date(currentDate.year, currentMonth, 1);
        const newDate = new Date(date);
        const day = date.getDay();
        const diff = 86400000;
        if (day === 0) {
            newDate.setTime(date.getTime() - 6 * diff);
        } else {
            newDate.setTime(date.getTime() - (day - 1) * diff)
        }
        getTemplate(newDate, diff);
    }

    function getTemplate(newDate, diff) {
        [].forEach.call(list.children, (el, idx) => {
            if (idx < 7) {
                currentWeekDay = newDate.toLocaleString('ru', {weekday: 'long'});
                currentDay = newDate.toLocaleString('ru', {day: 'numeric'});
                list.children[idx].children[0].innerHTML = currentWeekDay + ', ' + currentDay;
                newDate.setTime(newDate.getTime() + diff);
                console.log(newDate)
            } else {
                currentDay = newDate.toLocaleString('ru', {day: 'numeric'});
                list.children[idx].children[0].innerHTML = currentDay;
                newDate.setTime(newDate.getTime() + diff);
            }
        })
    }

    return {
        openModal: open,
        addContent: init
    }

})();

let dataObj = {};
window.onload = function () {
    let date = new Date();
    dataObj.year = date.getFullYear();
    dataObj.month = date.getMonth();
    modalCalendar.addContent(dataObj, date);
    modalCalendar.openModal()
};