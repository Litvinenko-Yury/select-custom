'use strict';

document.addEventListener('DOMContentLoaded', () => {

  setSelectCustom();


  /***/
  /***/

  function setSelectCustom() {
    setSelectData(); /*заполнить .select данными, что-бы не вводить их вручную*/
    openCloseSelectList(); // открыть-закрыть .select
    setSelectHeadContent();  // при выборе пункта селект записать в шапку значение и закрыть селект

    /***/
    function setSelectData() {
      /***заполнить Day***/
      const day = document.querySelector('#select-day');

      for (let i = 1; i <= 31; i++) {
        const li = document.createElement('li'); // создать элемент li
        li.classList.add('select__item'); // доб. класс элементу
        li.setAttribute('data-content', `${i}`); // доб. атрибут
        li.setAttribute('data-list-id', 'select-day');
        li.setAttribute('data-btn-id', 'day');
        li.textContent = `${i}`; // доб. содержимое элементу
        day.append(li); // добавить элемент на страницу, в конец блока day
      }

      /***заполнить Month***/
      const arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const month = document.querySelector('#select-month');
      for (let i = 0; i < arrMonths.length; i++) {
        const li = document.createElement('li'); // создать элемент li
        li.classList.add('select__item'); // доб. класс элементу
        li.setAttribute('data-content', `${arrMonths[i]}`); // доб. атрибут
        li.setAttribute('data-list-id', 'select-month');
        li.setAttribute('data-btn-id', 'month');
        li.textContent = `${arrMonths[i]}`; // доб. содержимое элементу
        month.append(li); // добавить элемент на страницу, в конец блока month
      }

      /***заполнить Year***/
      const date = new Date();
      const thisYear = date.getFullYear(); //узнать какой сейчас год

      const startYear = thisYear - 18; //вычислить начальный год
      const endYear = thisYear - 100; //вычислить конечный год

      const year = document.querySelector('#select-year');
      for (let i = startYear; i >= endYear; i--) {
        const li = document.createElement('li'); // создать элемент option
        li.classList.add('select__item'); // доб. класс элементу
        li.setAttribute('data-content', `${i}`); // доб. атрибут
        li.setAttribute('data-list-id', 'select-year');
        li.setAttribute('data-btn-id', 'year');
        li.textContent = `${i}`; // доб. содержимое элементу
        year.append(li); // добавить элемент на страницу, в конец блока year
      }
    };

    function openCloseSelectList() { // обработка события на .select__head
      document.addEventListener('click', function (event) { /* вешаем единый обработчик на элемент document*/
        /*это нужно для того, что-бы много .select__head можно было ставить в любом месте*/
        let target = event.target;

        while (target != document) {
          if (target.classList.contains("select__head")) { /* на .select__head? */
            let btnID = target.getAttribute("id"); /* из переменной target читаем значение атрибута id*/

            // для .select__head добавить/удалить .select__head--active
            let arrBtn = document.querySelectorAll('.select__head');
            arrBtn.forEach((item) => {
              if (item.getAttribute('id') == btnID) {
                item.classList.toggle('select__head--active');
              } else {
                item.classList.remove('select__head--active');
              }
            });

            let btnDataID = target.getAttribute("data-target-id"); /* из переменной target читаем значение атрибута data-target-id*/

            // открыть .select__list
            let elementClassToggle = document.getElementById(btnDataID); /* находим элемент с нужным ID*/
            elementClassToggle.classList.toggle('select__list--open'); /* элементу с нужным ID переключаем класс*/

            // закрыть остальные .select__list
            let arr = document.querySelectorAll('.select__list');
            arr.forEach((item) => {
              if (item.getAttribute('id') != btnDataID) {
                item.classList.remove('select__list--open');
              };
            });

            break;
          } else { /* не на .select__head? */
            target = target.parentNode; /* поднимаем target на уровень вверх по иерархии родителей от event.target и выше*/
            if (target == document) {
              const arrList = document.querySelectorAll('.select__list'); // закрыть все .select__list
              arrList.forEach((item) => {
                item.classList.remove('select__list--open');
              });

              const arrHead = document.querySelectorAll('.select__head'); // всем шапкам убрать .select__head--active
              arrHead.forEach((item) => {
                item.classList.remove('select__head--active');
              });
            }
          }
        }
        //console.log("вышел из цикла");
      });

      /* Если клик был мимо .select__head, цикл дойдет вверх до document, и обработчик закончит работу*/
    };

    function setSelectHeadContent() { // обработка события на .select__item
      document.addEventListener('click', function (event) { /* вешаем единый обработчик на элемент document*/
        /*это нужно для того, что-бы много .select__item можно было ставить в любом месте*/
        let target = event.target;

        while (target != document) {
          if (target.classList.contains("select__item")) { /* на .select__item? */
            let dataContent = target.getAttribute("data-content"); // из переменной target читаем значение атрибута data-content
            let datalistID = target.getAttribute("data-list-id"); // из переменной target читаем значение атрибута data-list-id
            let dataBtnID = target.getAttribute("data-btn-id"); // из переменной target читаем значение атрибута data-btn-id

            document.querySelector(`#${dataBtnID}`).textContent = dataContent; // элементу с нужным ID задаем контент - в кнопку записать контент
            document.querySelector(`#${dataBtnID}`).classList.add('select__head--selected'); // кнопке задать класс
            document.querySelector(`#${dataBtnID}`).classList.remove('select__head--active'); // кнопке удалить активный класс
            document.querySelector(`#${datalistID}`).classList.remove('select__list--open'); //закрыть селект


            break;
          } else {/* не на .select__item? */
            target = target.parentNode; /* поднимаем target на уровень вверх по иерархии родителей от event.target и выше*/
          }
        }
        //console.log("вышел из цикла");
      });

      /* Если клик был мимо .select__item, цикл дойдет вверх до document, и обработчик закончит работу*/
    };
  }

});
