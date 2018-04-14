const modalCalendarEvent = (function () {

    let addForm;
    let closeBtn;
    let currentMonth;
    let currentYear;
    let selectedDate;
    let addBtn;
    let createBtn;
    let startDay;
    let list;
    let listItem;

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
        listItem = document.querySelectorAll('.list__item');
        list = document.querySelector('.list');
        addBtn = document.querySelector('.button--add');
        addForm = document.querySelector('.add-form');
        closeBtn = document.querySelector('.button--close');
        createBtn = document.querySelector('.button--create');
        addBtn.addEventListener('click', showForm);
        closeBtn.addEventListener('click', hideForm);
        addForm.addEventListener('submit', event => {
            event.preventDefault();
            const inputValue = addForm.elements[1].value;
            addForm.elements[1].value = ' ';
            const selectedEvent = addForm.elements[0].options[addForm.elements[0].selectedIndex].text;
            if (selectedEvent === 'Тип события'){
                alert('Выберите тип события')
            } else {
                pushEventToCalendar(inputValue, selectedEvent);
            }
        })
    }

    function pushEventToCalendar(inputValue, selectedEvent) {
        list.children[selectedDate - 1 + startDay].children[1].innerHTML = selectedEvent;
        list.children[selectedDate - 1 + startDay].children[2].innerHTML = inputValue;


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
        const selectedData = select.options[select.selectedIndex].text;
        modalCalendarEvent.addSelect(selectedData)
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







