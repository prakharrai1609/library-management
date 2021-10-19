const name = document.getElementById('name');
const author = document.getElementById('author');
const type = document.querySelectorAll('#type');
const table = document.getElementById('table-body');
const button = document.getElementById('addbook');
const library = document.getElementById('library-form');
const clear = document.getElementById('clear');

clear.addEventListener('click', () => {
    localStorage.clear();
    table.remove();
})

class Library {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        type.forEach((e) => {
            if (e.checked) {
                this.type = e.name;
            }
        })
    }


    warn = () => {
        const msg = document.getElementById('message');
        msg.innerHTML =
            `
        <div class="alert alert-warning" role="alert">
            Invalid behaviour ❌
        </div>
        `

        setTimeout(() => {
            msg.innerHTML = ""
        }, 3000);
    }

    push = () => {
        const msg = document.getElementById('message');
        msg.innerHTML =
            `
        <div class="alert alert-success alert-dismissible fade show" role="alert" class="btn-close" data-bs-dismiss="alert">
            Book added ✅
        </div>
        `

        setTimeout(() => {
            msg.innerHTML = ""
        }, 3000);
    }

    validate = () => {
        if ((this.name).length < 3 || (this.author).length < 3 || (this.type.checked)) {
            this.warn();
            return false;
        } else {
            this.push();
            return true;
        }
    }

    store = () => {
        let store = localStorage.getItem('store');
        let books;
        if (store == null) {
            books = [];
        } else {
            books = JSON.parse(store);
        }

        books.push([this.name, this.author, this.type]);
        localStorage.setItem('store', JSON.stringify(books));
    }
}


button.addEventListener('click', function () {
    book = new Library(name.value, author.value, type);
    if (book.validate()) {
        book.store();
        show();

        const del = document.querySelectorAll('#del');
        del.forEach((e, index) => {
            e.addEventListener('click', () => {
                del[index].remove();
                // console.log('delete this bitch')
            })
        })


    } else {
        console.log('error')
    }
})

let show = () => {
    let store = localStorage.getItem('store');
    let books = JSON.parse(store);
    let html = '';
    books.forEach((e) => {
        html = `
            <tr id="del">
                <td>${e[0]}</td>
                <td>${e[1]}</td>
                <td>${e[2]}</td>
                <td><button style="padding: 0rem 0.5rem;" class="btn btn-danger">Delete</button></td>
            </tr>
            `

    });
    table.innerHTML += html;
    library.reset();
}

// view all previous books after reloading the session
let temp = localStorage.getItem('store');
let refresh = 0;
if (temp != null && !refresh) {
    let store = localStorage.getItem('store');
    let books = JSON.parse(store);
    let html = '';
    books.forEach((e) => {
        html += `
            <tr id="del">
                <td>${e[0]}</td>
                <td>${e[1]}</td>
                <td>${e[2]}</td>
                <td><button style="padding: 0rem 0.5rem;" class="btn btn-danger">Delete</button></td>
            </tr>
            `

    });
    table.innerHTML += html;
    library.reset();
    refresh = 1;
    const del = document.querySelectorAll('#del');
    del.forEach((e, index) => {
        e.addEventListener('click', () => {
            del[index].remove();
            // console.log('delete this bitch')
        })
    })
}
