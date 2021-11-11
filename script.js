'use strict'

const btnDel = document.querySelector('.btn-delete');
const btnEdt = document.querySelector('.btn-edit');
const tableWrap = document.querySelector('.table_wrapper');



let data = [
    {
        name: 'Асинхронная обработка и оптимизация',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1034233221.jpg',
        author: 'Симпсон Кайл',
        year: '2018'
    },
    {
        name: 'Разработка веб-приложений в ReactJS',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1014964317.jpg',
        author: 'Хортон Адам, Вайс Райан',
        year: '2019'
    },
    {
        name: 'Разработка веб-приложений с использованием AngularJS',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1008802038.jpg',
        author: 'Козловский Павел',
        year: '2017'
    },
];



const init = (data) => {
    data.forEach((item, id) => {
        item.id = id;
    });
}

const createShelf = (data, tableWrap) => {
    data.forEach(item => {
        let tableItem = document.createElement('div')
        tableItem.className = 'table-item';
        tableItem.id = `${item.id}`;
        tableItem.innerHTML = `<div class="img-wrapper">
                                    <img class='cover'src=${item.img} alt="undf">
                              </div>
                              <div class="info-wrapper">
                                  <span class="book-name">${item.name}</span>
                                  <br>
                                  <span class="book-author">${item.author}</span>
                                  <br>
                                  <span class="book-year">${item.year + 'г.'}</span>
                              </div>
                              <div class="btn-wrapper">
                                  <button class="btn-edit btn" id=${item.id}-edt>Редактировать</button>
                                  <button class="btn-delete btn" id="${item.id}-del">Удалить</button>
                              </div>`;

        tableWrap.append(tableItem);
    });
}

const refresh = () => {
    document.querySelectorAll('.table-item').forEach(item => {
        item.remove()
    });
}

const createFunc = () => {
    data.forEach((item, id) => {
        document.getElementById(`${item.id}-del`).addEventListener('click', (e) => {
            document.getElementById(`${item.id}`).remove();
            data = data.filter(item => {
                return(item.id !== id);
            })
            refresh();
            init(data);
            createShelf(data, tableWrap);
        });
    })
}




init(data);

createShelf(data, tableWrap);

createFunc();

