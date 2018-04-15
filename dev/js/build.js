const modalCalendarEvent = (function () {

    const addBtn = document.querySelector('.button--add');
    const addForm = document.querySelector('.add-form');
    const closeBtn = document.querySelector('.button--close');
    const list = document.querySelector('.list');

    let currentMonth;
    let currentYear;
    let selectedDate;

    let startDay;

    let m = [];

    class Event {

        constructor(year, month, day, type, text, startDay, list) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.type = type;
            this.text = text;
            this.startDay = startDay;
            this.list = list;
        }

        pushEvent() {
            this.list.children[this.day - 1 + this.startDay].children[1].innerHTML = this.type;
            this.list.children[this.day - 1 + this.startDay].children[2].innerHTML = this.text;
        }

    }

    function open() {
        addHandlers()
    }
    
    function init(month, year) {
        currentMonth = month;
        currentYear = year;
    }

    function getSelectedText(value) {
        selectedDate = value;
        const newDate = new Date(currentYear, currentMonth, 1);
        if (selectedDate === 'Сегодня') {
            const newDate = new Date();
            selectedDate = newDate.getDate();
        }
        startDay = newDate.getDay();
        if (startDay === 0) {startDay = 6}
    }

    function showForm() {
        if (selectedDate !== undefined) {
            document.querySelector('.alarm-arrow').style.display = 'none';
            addForm.style.display = 'flex'
        } else {
            document.querySelector('.alarm-arrow').style.display = 'block';
            alert('Выберите дату!')
        }
    }

    function hideForm() {
        addForm.style.display = 'none'
    }

    function addHandlers() {
        addBtn.addEventListener('click', showForm);
        closeBtn.addEventListener('click', hideForm);
        addForm.addEventListener('submit', event => {
            event.preventDefault();
            const inputValue = addForm.elements[1].value;
            addForm.elements[1].value = ' ';
            const typeEvent = addForm.elements[0].options[addForm.elements[0].selectedIndex].text;
            if (typeEvent === 'Тип события'){
                alert('Выберите тип события')
            } else {
                pushEventToCalendar(inputValue, typeEvent);
                hideForm();
            }
        })
    }

    function pushEventToCalendar(inputValue, typeEvent) {
        const event = new Event(currentYear, currentMonth, selectedDate, typeEvent, inputValue, startDay, list);
        event.pushEvent();
        m.push(event);
    }

    return {
        openModal: open,
        addContent: init,
        addSelect: getSelectedText
    }
})();



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
        const nextDate = new Date(currentYear, currentMonth +1, 0);
        const dayAmount = nextDate.getDate();
        const day = date.getDay();
        const diff = 86400000;
        nextDate.setTime(date.getTime() + (dayAmount -1) * 86400000);
        if (day === 0) {
            newDate.setTime(date.getTime() - 6 * diff);
        } else {
            newDate.setTime(date.getTime() - (day - 1) * diff)
        }
        getTemplate(newDate, diff, date, nextDate);
        modalCalendarEvent.addContent(currentMonth, currentYear);
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
                //if (newDate.getTime() > )
                currentDay = newDate.toLocaleString('ru', {day: 'numeric'});
                list.children[idx].children[0].innerHTML = currentDay;
                newDate.setTime(newDate.getTime() + diff);
            }
        });
    }

    function addCalendar() {
        for (let i = 0; i < 42; i++) {
            list.insertAdjacentHTML('afterBegin', '<li class="list__item">' +
                                                        '<div class="list__item-date"></div>' +
                                                        '<div class="list__item-type"></div>' +
                                                        '<div class="list__item-event"</span>' +
                                                '</li>')
        }
    }

    return {openModal: open,
            addContent: init}

})();
const modalSelectDate = (function() {

    let monthArr = ["Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь"];

    let currentDate;
    let currentMonth;
    let currentYear;

    let target;
    let list;
    let calendar;
    let select;

    function open() {
        currentMonth = currentDate.month;
        currentYear = currentDate.year;
        addHandlers();
        setDates(currentMonth);

    }

    function setDates(currentMonth) {
        target.innerHTML = monthArr[currentMonth] + " " + currentYear;
        fillSelect();
        modalDrawCalendar.openModal(currentMonth, currentYear);
    }

    function addHandlers() {
        document.querySelector('#right').addEventListener('click', _nextMonth);
        document.querySelector('#left').addEventListener('click', _prevMonth);
        target = document.querySelector('.options__date');
        list = document.querySelector('.list');
        calendar = document.querySelector('.calendar-container');
        select = document.querySelector('.options__select');
        select.addEventListener('change', watchSelect)
    }

    function init (value) {
        currentDate = value;
    }

    function _nextMonth() {
        if (currentMonth < 11) {
            currentMonth++
        } else {
            currentYear++;
            currentMonth = 0;
        }
        setDates(currentMonth);
    }

    function _prevMonth() {
        if (currentMonth >= 1) {
            currentMonth--
        } else {
            currentYear--;
            currentMonth = 11;
        }
        setDates(currentMonth);
    }

    function fillSelect() {
        clearSelect();
        const date = new Date(currentYear, currentMonth + 1, 0);
        const daysAmount = date.getDate();
        for (let i = 0; i < daysAmount; i++) {
            select.insertAdjacentHTML('beforeEnd', `<option class="select__item">${i+1}</option>`)
        }
    }

    function watchSelect() {
        const selectedDate = select.options[select.selectedIndex].text;
        modalCalendarEvent.addSelect(selectedDate)
    }

    function clearSelect() {
        if (select.children.length > 2) {
            const selectItem = document.querySelectorAll('.select__item');
            [].forEach.call(selectItem, (el, idx) => {
                if (idx > 1) {
                    select.removeChild(el)
                }
            })
        }
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
    modalSelectDate.addContent(dataObj, date);
    modalDrawCalendar.addContent();
    modalSelectDate.openModal();
    modalCalendarEvent.openModal()

};







