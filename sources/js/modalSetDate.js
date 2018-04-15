const modalSelectDate = (function() {

    let monthArr = ["Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь"];

    let currentDate;
    let currentMonth;
    let currentYear;

    const target = document.querySelector('.options__date');
    const select = document.querySelector('.options__select');

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







