'use strict'

const btnAdd = document.querySelector('.btn-add'),
      tableWrap = document.querySelector('.table-wrapper'),
      modal = document.querySelector('.modal-wrapper'),
      bgLayer = document.querySelector('.bg-layer');



let data = [
    {
        name: 'Асинхронная обработка и оптимизация',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1034233221.jpg',
        author: 'Симпсон Кайл',
        year: '2015'
    },
    {
        name: 'Разработка веб-приложений в ReactJS',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1014964317.jpg',
        author: 'Хортон Адам, Вайс Райан',
        year: '2017'
    },
    {
        name: 'Разработка веб-приложений с использованием AngularJS',
        img: 'https://cdn1.ozone.ru/multimedia/wc250/1008802038.jpg',
        author: 'Козловский Павел',
        year: '2016'
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
            refresh(); // delete all items from dom
            init(data); // init new id for data
            createShelf(data, tableWrap); // add books to the shelf
            createFunc(); // add delete func to the btn
        });
    })
    data.forEach((item, id) => {
        document.getElementById(`${item.id}-edt`).addEventListener('click', (e) => {
            modal.style.display = 'flex';
            bgLayer.style.display = 'block';
            modal.querySelector('.name-input').value = item.name;
            modal.querySelector('.author-input').value = item.author;
            modal.querySelector('.year-input').value = item.year;
            modal.querySelector('.img-input').value = item.img;
            modal.querySelector('.btn-cancel').addEventListener('click', cancel);

            modal.querySelector('.btn-save').addEventListener('click', save);

            function save(e){
                let inputArr = modal.querySelectorAll('.-req'); //all inputs to array


                function dataRewrite(inputArr) { // rewrite item in data
                    let arr = inputArr;
                    arr = Object.assign({}, arr); // make obj from arr inputs
                    const newKeys = { 0: "name", 1: "author", 2: 'year', 3: 'img'}; // keys for obj
                    arr = renameKeys(arr, newKeys);
                    for (let key in arr) {
                        data[id][key] = arr[key].value;
                    }

                }

                function saveItem() {
                    let error = formValidate(inputArr, data);
                    if (error === 0) {
                        dataRewrite(inputArr);
                        cancel();
                    }

                }
                saveItem();
                refresh();
                createShelf(data, tableWrap);
                modal.querySelector('.btn-save').removeEventListener('click', save);
                createFunc();
            }
        });
    })

}

const addBook = () => {
    document.querySelector('.btn-add').addEventListener('click', (e) => {
        modal.style.display = 'flex';
        bgLayer.style.display = 'block';
        modal.querySelector('.btn-save').addEventListener('click' , saveNew);
        function saveNew() {
            let inputArr = modal.querySelectorAll('.-req');
            function saveNewItem() {
                let error = formValidate(inputArr, data);
                if (error === 0) {
                    data = addItem(inputArr, data)
                    cancel();
                }
            }
            function addItem(inputArr, data) {
                let arr = inputArr;
                arr = Object.assign({}, arr); 
                const newKeys = { 0: "name", 1: "author", 2: 'year', 3: 'img'};
                arr = renameKeys(arr, newKeys);
                for (let key in arr) {
                    arr[key] = arr[key].value;
                }
                data.push(arr);
                return(data);
            }
            saveNewItem();
            refresh(); // delete all items from dom
            init(data); // init new id for data
            createShelf(data, tableWrap); // add books to the shelf
            modal.querySelector('.btn-save').removeEventListener('click', saveNew);
            createFunc(); // add delete func to the btn
        }
        modal.querySelector('.btn-cancel').addEventListener('click', cancel);

    });
}



function formValidate(inputArr) { // function to check empty inputs
    let error = 0;
    for (let index = 0; index < inputArr.length; index++) {
        const input = inputArr[index];
        formRemoveError(input);
        if (input.value === '') {
            formAddError(input);
            error++;
        } 
    }
    return error;
}

function formAddError(input){ // function to add red shadow for empty input
    input.classList.add('empty-input');
}

function formRemoveError(input){ // function to add red shadow for empty input
    input.classList.remove('empty-input');
}

function renameKeys(arr, newKeys) {
    const keyValues = Object.keys(arr).map(key => { //rewrite old keys 
      const newKey = newKeys[key]; // enumeration of propeties
      return { [newKey]: arr[key] };
    });
    return Object.assign({}, ...keyValues);
}

function cancel(e){
    modal.style.display = 'none';
    bgLayer.style.display = 'none';
    modal.querySelector('.name-input').value = '';
    modal.querySelector('.author-input').value = '';
    modal.querySelector('.year-input').value = '';
    modal.querySelector('.img-input').value = '';
}

init(data);

createShelf(data, tableWrap);

createFunc();

addBook(data);