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

