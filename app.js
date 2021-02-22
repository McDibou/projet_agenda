let calendar = document.querySelector('#calendar')
let button = document.getElementById('add')


class Note {
    constructor(note) {
        for (let value in note) {
            this._id = Math.random().toString(36).substr(2, 9);
            this[value] = note[value]
        }
    }

    get title() {
        return this._title;
    }

    get createDate() {
        return this.renderDate(this._createDate);
    }

    get recallDate() {
        return this._recallDate;
    }

    get color() {
        return this._color;
    }

    get id() {
        return this._id;
    }

    set title(value) {
        if (value !== null) {
            this._title = value;
        }
    }

    set createDate(value) {
        let date = value.split("/")
        this._createDate = new Date(date[1] + "-" + date[0] + "-" + date[2]);
    }

    set recallDate(value) {
        let date = new Date(value)
        if (typeof date === 'object' && date !== null) {
            this._recallDate = date;
        }
    }

    set color(value) {
        if (value !== null) {
            this._color = value;
        }
    }


    renderChamp(content, className, value) {
        let div = document.createElement('div')
        div.classList.add(className)
        if (className !== 'date') {
            div.contentEditable = true
            div.addEventListener('input', this.changeValue)
        }

        div.insertAdjacentText('afterbegin', value)
        content.append(div)
    }

    changeValue() {
        this.parentNode._noteReference_[this.className] = this.innerHTML
    }

    renderDate(date) {
        let day = (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate()
        let month = ((date.getMonth() + 1).toString().length === 1) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        return 'Créer le ' + day + '/' + month + '/' + date.getFullYear();
    }
}

class TextNote extends Note {
    constructor(note) {
        super(note)
    }

    get text() {
        return this._text;
    }

    set text(value) {
        if (value !== null) {
            this._text = value;
        }
    }

    render() {
        let content = document.createElement('div')
        content.classList.add('note')
        content._noteReference_ = this

        this.renderChamp(content, 'title', this.title)
        this.renderChamp(content, 'text', this.text)
        this.renderChamp(content, 'date', this.createDate)

        calendar.insertAdjacentElement('beforeend', content)
    }
}

class ChecklistNote extends Note {
    constructor(note) {
        super(note)
    }

    get list() {
        return this._list;
    }

    set list(value) {
        if (Array.isArray(value) && value !== null) {
            this._list = value;
        }
    }

    render() {
        let content = document.createElement('div')
        content.classList.add('note')
        content._notereference_ = this

        this.renderChamp(content, 'title', this.title)
        this.renderCheklist(content, 'list', this.list)
        this.renderChamp(content, 'date', this.createDate)

        calendar.insertAdjacentElement('beforeend', content)
    }

    renderCheklist(content, className, tab) {
        let contentBlock = document.createElement('div')
        contentBlock.classList.add(className)

        contentBlock.addEventListener('mouseenter', Action.addButton)
        contentBlock.addEventListener('mouseleave', Action.deleteButton)

        tab.forEach((item) => {

            let block = document.createElement('div')
            let checkbox = document.createElement('INPUT')
            let label = document.createElement('label')
            label.contentEditable = true

            checkbox.setAttribute('type', 'checkbox')
            if (Object.values(item)[0]) {
                checkbox.checked = true
            }

            label.insertAdjacentText('afterbegin', Object.keys(item)[0])

            block.append(checkbox)
            block.append(label)
            contentBlock.append(block)
        })

        content.append(contentBlock)
    }
}

class Render {
    constructor(data) {
        this.readJSON(JSON.parse(data))
    }

    readJSON(data) {
        this.sortNote(data, "createDate")
        let tab = []
        data.forEach(function (note) {
            if (note.hasOwnProperty('text')) {
                let text = new TextNote(note)
                tab.push(text)
                text.render()
            }
            if (note.hasOwnProperty('list')) {
                let list = new ChecklistNote(note)
                tab.push(list)
                list.render()
            }
        })
        return tab
    }

    sortNote(tab, attribute) {
        tab.sort((a, b) => (a[attribute] < b[attribute]) ? 1 : -1)
    }
}

class Action {

    static addButton() {
        let button = document.createElement('button')
        button.addEventListener('click', Action.addChecklist)
        button.innerHTML = 'ADD CHECK'
        button.classList.add('addCheck')
        this.append(button)
    }

    static deleteButton() {
        this.querySelector('.addCheck').remove()
    }

    static addChecklist() {
        let block = document.createElement('div')
        let input = document.createElement('INPUT')
        let button = document.createElement('button')

        button.innerHTML = 'create'
        button.classList.add('createCheck')
        button.addEventListener('click', Action.addCheckbox)

        block.insertAdjacentElement('beforeend', input)
        block.insertAdjacentElement('beforeend', button)

        this.replaceWith(block)
    }

    static addCheckbox() {
        let block = document.createElement('div')

        let checkbox = document.createElement('INPUT')
        checkbox.setAttribute('type', 'checkbox')

        let label = document.createElement('label')
        label.insertAdjacentText('afterbegin', this.parentElement.querySelector('input').value)

        block.append(checkbox)
        block.append(label)

        this.parentElement.replaceWith(block);
    }
}

let noteArray = new Render(notesJSON)