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
            this.index = this.day - 1 + this.startDay
        }

        pushEvent() {
            this.list.children[this.index].children[1].innerHTML = this.type;
            this.list.children[this.index].children[2].innerHTML = this.text;
        }

    }

    function open() {
        addHandlers()
    }
    
    function init(month, year) {
        currentMonth = month;
        currentYear = year;
        createDate(month, year);
    }

    function createDate(currentMonth, currentYear) {
        const date = new Date(currentYear, currentMonth, 1);
        const newDate = new Date(date);
        const day = date.getDay();
        const diff = 86400000;
        if (day === 0) {
            newDate.setTime(date.getTime() - 6 * diff);
        } else {
            newDate.setTime(date.getTime() - (day - 1) * diff)
        }
        holdEvents(currentMonth, currentYear, newDate, diff)
    }

    function holdEvents(month, year, newDate, diff) {
        if (m.length !== 0) {
            const listItem = document.querySelectorAll('.list__item');
            [].forEach.call(listItem, (item, idx) => {
                item.children[1].innerHTML = ' ';
                item.children[2].innerHTML = ' ';
                m.forEach(el => {
                    if (el.year === year) {
                        if (el.month === month && el.day === newDate.getDate()) {
                            if (idx === el.index) {
                                item.children[1].innerHTML = el.type;
                                item.children[2].innerHTML = el.text;
                                console.log('bingo')
                            }
                        }
                    }
                });
                newDate.setTime(newDate.getTime() + diff)
            })
        }
    }

    function getSelectedText(value) {
        const newDate = new Date(currentYear, currentMonth, 1);
        if (value === 'Сегодня') {
            const newDate = new Date();
            selectedDate = value;
            selectedDate = newDate.getDate();
        } else {
            selectedDate = +value;
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

