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

