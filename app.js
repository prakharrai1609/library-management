const name = document.getElementById('name');
const author = document.getElementById('author');
const type = document.querySelectorAll('#type');
const table = document.getElementById('table-body');
const button = document.getElementById('addbook');
const library = document.getElementById('library-form');

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
        <div class="alert alert-success" role="alert">
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

    count = () => {
        book++;
        return book;
    }

    show = () => {
        let html =
            `
                <tr id="table-row">
                    <th scope="row">${1}</th>
                    <td>${this.name}</td>
                    <td>${this.author}</td>
                    <td>${this.type}</td>
                </tr>
            `
        table.innerHTML += html;
        library.reset();
    }
}

button.addEventListener('click', function () {
    book = new Library(name.value, author.value, type);
    if (book.validate()) {
        book.show();
    } else {
        console.log('error')
    }
})