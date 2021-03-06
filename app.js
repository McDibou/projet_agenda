let readNote = document.querySelector('.read-note')
let crudNote = document.querySelector('.crud-note')

class Note {
    static colorTab = {"1": '#5ec026', "2": '#FDE700', "3": '#ff8400', "4": '#C70039'}
    error = []

    constructor(note) {
        for (let value in note) {
            this._id = Math.random().toString(36).substr(2, 9);
            this._createDate = new Date()
            this[value] = note[value]
        }
    }

    get title() {
        return this._title;
    }

    get createDate() {
        return this._createDate;
    }

    get recallDate() {
        return this._recallDate;
    }

    get urgent() {
        return this._urgent;
    }

    get id() {
        return this._id;
    }

    set title(value) {
        if (typeof value == 'string' && value.length > 0) {
            this._title = value;
        } else {
            this.error.push('Le titre n\'est pas valide')
        }
    }

    set createDate(value) {
        let date = new Date(value)
        if (typeof date === 'object' && !isNaN(date)) {
            this._createDate = date;
        } else {
            this.error.push('La date n\'est pas valide')
        }
    }

    set recallDate(value) {
        let date = new Date(value)
        if (typeof date === 'object' && !isNaN(date)) {
            this._recallDate = date;
        } else {
            this.error.push('La date n\'est pas valide')
        }
    }

    set urgent(value) {
        if (Note.colorTab[value]) {
            this._urgent = value;
        } else {
            this.error.push('La couleur n\'est pas valide')
        }
    }

    renderChamp(content, className, value) {
        let div = document.createElement('div')
        div.classList.add(className)
        if (className !== 'date') {
            div.contentEditable = true
            div.addEventListener('input', Action.changeValue)
        }

        div.insertAdjacentText('afterbegin', value)
        content.append(div)
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
        if (value.length > 0 && value.length <= 255) {
            this._text = value;
        } else {
            this.error.push('Le text n\'est pas valide')
        }
    }

    toJSON() {
        return {
            title: this.title,
            text: this.text,
            createDate: this.createDate,
            recallDate: this.recallDate,
            urgent: this.urgent
        }
    }

    render() {
        let content = document.createElement('div')
        content.classList.add('note')
        content._noteReference_ = this
        content.style.background = "linear-gradient(45deg, rgb(255, 255, 255) 90%, " + Note.colorTab[this.urgent] + " 90%)"

        this.renderChamp(content, 'title', this.title)
        this.renderChamp(content, 'text', this.text)

        let close = document.createElement('span')
        close.classList.add('delete-note')
        close.addEventListener('click', Add.deleteNotes)
        close.innerHTML = "+"
        content.append(close)

        readNote.insertAdjacentElement('beforeend', content)
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
        if (Array.isArray(value) && value.length > 0) {
            this._list = value;
        } else {
            this.error.push('La list n\'est pas valide')
        }
    }

    toJSON() {
        return {
            title: this.title,
            list: this.list,
            createDate: this.createDate,
            recallDate: this.recallDate,
            urgent: this.urgent
        }
    }

    render() {
        let content = document.createElement('div')
        content.classList.add('note')
        content._noteReference_ = this
        content.style.background = "linear-gradient(45deg, rgb(255, 255, 255) 90%, " + Note.colorTab[this.urgent] + " 90%)"

        this.renderChamp(content, 'title', this.title)
        this.renderCheklist(content, 'list', this.list)

        let close = document.createElement('span')
        close.classList.add('delete-note')
        close.addEventListener('click', Add.deleteNotes)
        close.innerHTML = "+"
        content.append(close)

        readNote.insertAdjacentElement('beforeend', content)
    }

    renderCheklist(content, className, tab) {
        let contentBlock = document.createElement('div')
        contentBlock.classList.add(className)

        contentBlock.addEventListener('mouseenter', Action.addButton)
        contentBlock.addEventListener('mouseleave', Action.deleteButton)

        tab.forEach((item) => {

            let block = document.createElement('div')
            block.addEventListener('mouseenter', Action.addButtonChecklist)
            block.addEventListener('mouseleave', Action.deleteButtonChecklist)

            let label = document.createElement('label')
            label.contentEditable = true
            label.insertAdjacentText('afterbegin', Object.keys(item)[0])
            label.addEventListener('input', Action.checkListValue)

            let checkbox = document.createElement('INPUT')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.addEventListener('change', Action.checkedList)
            if (Object.values(item)[0]) {
                checkbox.checked = true
            }

            block.append(checkbox)
            block.append(label)
            contentBlock.append(block)
        })

        content.append(contentBlock)
    }
}

class Render {
    tab = []

    constructor(data) {
        if (data) {
            this.readJSON(JSON.parse(data))
        } else {
            this.readJSON([])
        }
    }

    readJSON(data) {
        Render.sortNote(data, "createDate")
        let tab = []
        data.forEach(function (note) {
            if (note.hasOwnProperty('text')) {
                let text = new TextNote(note)
                tab.push(text)
            }
            if (note.hasOwnProperty('list')) {
                let list = new ChecklistNote(note)
                tab.push(list)
            }
        })
        this.tab = tab
    }


    static noteView() {
        let dateCell = this.dateCalendar
        readNote.innerHTML = ''

        viewDay.querySelector('h1').innerHTML = ''
        viewDay.querySelector('h3').innerHTML = ''
        viewDay.querySelector('p').innerHTML = ''

        viewDay.querySelector('h1').innerHTML = (dateCell.getDate().toString().length === 1) ? 0 + '' + dateCell.getDate() : dateCell.getDate()
        viewDay.querySelector('h3').innerHTML = day[dateCell.getDay()]
        viewDay.querySelector('p').innerHTML = ((dateCell.getMonth() + 1).toString().length === 1) ? 0 + '' + (dateCell.getMonth() + 1) + '/' + dateCell.getFullYear() : (dateCell.getMonth() + 1) + '/' + dateCell.getFullYear()

        viewDay.dateNowCalendar = dateCell

        let days = document.querySelectorAll('td')
        for (let item of days) {
            item.classList.remove('selected-calendar')
        }
        this.classList.add('selected-calendar')

        for (let item of this.note) {
            item.render()
        }
        Add.close()
    }

    static sortNote(tab, attribute) {
        return tab.sort((a, b) => (a[attribute] < b[attribute]) ? 1 : -1)
    }
}

class Action {
    static addButton() {
        let button = document.createElement('a')
        button.addEventListener('click', Action.addChecklist)
        button.innerHTML = 'Ajouter une tache'
        button.classList.add('addCheck')
        this.append(button)
    }

    static deleteButton() {
        if (this.querySelector('.addCheck')) {
            this.querySelector('.addCheck').remove()
        }
    }

    static addChecklist() {
        if (document.querySelector('.add-list')) {
            document.querySelector('.add-list').remove()
        }
        let block = document.createElement('div')
        block.classList.add('add-list')
        let input = document.createElement('INPUT')
        input.classList.add('input-list')
        let button = document.createElement('a')

        button.innerHTML = 'Ajouter'
        button.classList.add('createCheck')
        button.addEventListener('click', Action.addCheckbox)

        block.insertAdjacentElement('beforeend', input)
        block.insertAdjacentElement('beforeend', button)

        this.replaceWith(block)
    }

    static addCheckbox() {
        if (this.parentNode.querySelector('input').value) {
            let tab = this.parentElement.parentElement.parentElement._noteReference_.list
            tab.push({[this.parentNode.querySelector('input').value]: false})

            let block = document.createElement('div')
            block.addEventListener('mouseenter', Action.addButtonChecklist)
            block.addEventListener('mouseleave', Action.deleteButtonChecklist)

            let checkbox = document.createElement('INPUT')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.addEventListener('change', Action.checkedList)

            let label = document.createElement('label')
            label.insertAdjacentText('afterbegin', this.parentElement.querySelector('input').value)
            label.contentEditable = true
            label.addEventListener('input', Action.checkListValue)

            block.append(checkbox)
            block.append(label)
            Action.deleteButton.call(this.parentElement.parentElement)
            this.parentElement.replaceWith(block);
            sycroStorage(noteArray.tab)
        } else {
            Action.deleteButton.call(this.parentElement.parentElement)
            this.parentElement.remove();
        }
    }

    static checkListValue() {
        let tab = this.parentNode.parentNode.parentNode._noteReference_.list
        let list = this.parentNode.parentNode.children
        let id = Array.prototype.indexOf.call(list, this.parentElement)
        tab[id] = {[this.innerHTML]: this.parentNode.querySelector('input').checked}
        sycroStorage(noteArray.tab)
    }

    static checkedList() {
        let tab = this.parentNode.parentNode.parentNode._noteReference_.list
        let list = this.parentNode.parentNode.children
        let id = Array.prototype.indexOf.call(list, this.parentElement)
        tab[id][this.parentNode.querySelector('label').innerHTML] = !!this.checked;
        sycroStorage(noteArray.tab)
    }

    static changeValue() {
        this.parentNode._noteReference_[this.className] = this.innerHTML
        sycroStorage(noteArray.tab)
    }

    static addButtonChecklist() {
        let button = document.createElement('a')
        button.addEventListener('click', Action.deleteChampChecklist)
        button.innerHTML = '+'
        button.classList.add('delete')
        this.append(button)
    }

    static deleteButtonChecklist() {
        if (this.querySelector('.delete')) {
            this.querySelector('.delete').remove()
        }
    }

    static deleteChampChecklist() {
        let tab = this.parentNode.parentNode.parentNode._noteReference_.list
        let list = this.parentNode.parentNode.children
        let id = Array.prototype.indexOf.call(list, this.parentElement)
        tab.splice(id, 1)

        Action.deleteButton.call(this.parentElement.parentElement)
        this.parentElement.remove()
        sycroStorage(noteArray.tab)
    }
}

class Add {
    static show() {
        let content = document.querySelector('.crud-note')
        content.style.display = 'block'
    }

    static close() {
        let content = document.querySelector('.crud-note')
        content.style.display = 'none'

        if (document.querySelector('.error')) {
            document.querySelector('.error').remove()
        }

        Add.addChoice()

        document.querySelector('.crud-note').querySelector('input[name="title"]').value = ''
        document.querySelector('.crud-note').querySelector('input[name="urgent"]').value = 1
    }

    static addText() {
        let replace = document.querySelector('.choice')

        let choice = document.createElement('div')
        choice.classList.add('choice')
        choice.classList.add('true-text')

        let labelText = document.createElement('label')
        labelText.insertAdjacentHTML('afterbegin', 'Text :')

        let inputText = document.createElement("TEXTAREA");
        inputText.name = 'text'
        inputText.setAttribute('rows', 7)

        let close = document.createElement('button')
        close.classList.add('close')
        close.innerHTML = 'close'
        close.addEventListener('click', Add.addChoice)

        choice.append(labelText)
        choice.append(inputText)
        choice.append(close)

        replace.replaceWith(choice)
    }

    static addList() {
        let replace = document.querySelector('.choice')

        let choice = document.createElement('div')
        choice.classList.add('choice')
        choice.classList.add('true-list')

        let labelList = document.createElement('label')
        labelList.insertAdjacentHTML('afterbegin', 'List :')
        let divList = document.createElement('div')
        divList.classList.add('list-create')

        let div = document.createElement('div')
        div.classList.add('button-checklist')
        let addCheckList = document.createElement('button')
        addCheckList.innerHTML = 'Ajouter'
        addCheckList.addEventListener('click', Add.addCheckList)

        let close = document.createElement('button')
        close.classList.add('close')
        close.innerHTML = 'close'
        close.addEventListener('click', Add.addChoice)
        div.append(addCheckList)
        div.append(close)

        choice.append(labelList)
        choice.append(divList)
        choice.append(div)

        replace.replaceWith(choice)
    }

    static addCheckList() {
        let list = document.querySelector('.list-create')

        let div = document.createElement('div')
        div.classList.add('champ')

        let input = document.createElement('INPUT')
        input.name = 'list[]'

        let close = document.createElement('a')
        close.innerHTML = '+'
        close.addEventListener('click', Add.deleteChamp)

        div.append(input)
        div.append(close)

        list.append(div)
    }

    static deleteChamp() {
        this.parentElement.remove()
    }

    static addChoice() {
        let replace = document.querySelector('.choice')

        let choice = document.createElement('div')
        choice.classList.add('choice')

        let labelChoice = document.createElement('label')
        labelChoice.insertAdjacentHTML('afterbegin', 'Content :')

        let buttonText = document.createElement('button')
        buttonText.innerHTML = 'Add text'
        buttonText.addEventListener('click', Add.addText)

        let buttonList = document.createElement('button')
        buttonList.innerHTML = 'Add list'
        buttonList.addEventListener('click', Add.addList)

        choice.append(labelChoice)
        choice.append(buttonText)
        choice.append(buttonList)

        replace.replaceWith(choice)
    }

    static addNote() {

        let title = document.querySelector('input[name="title"]').value;

        let text = ''
        let tablist = []
        if (document.querySelector('textarea[name="text"]')) {
            text = document.querySelector('textarea[name="text"]').value;
        } else {
            let list = document.querySelectorAll('input[name="list[]"]')
            list.forEach((item) => {
                if (item.value.length > 0) {
                    tablist.push({[item.value]: false})
                }
            })
        }

        let recalldate = viewDay.dateNowCalendar

        let urgent = document.querySelector('input[name=urgent]').value

        if (document.querySelector('.true-text') || document.querySelector('.true-list')) {
            let note
            if (document.querySelector('.true-text')) {
                note = new TextNote({
                    "title": title,
                    "text": text,
                    "urgent": urgent,
                    "recallDate": recalldate
                })
            }
            if (document.querySelector('.true-list')) {
                note = new ChecklistNote({
                    "title": title,
                    "list": tablist,
                    "urgent": urgent,
                    "recallDate": recalldate
                })
            }

            if (note.error.length > 0) {
                new Error(note.error)
            } else {
                if (document.querySelector('.error')) {
                    document.querySelector('.error').remove()
                }

                let cell = document.querySelector('.selected-calendar')
                cell.note.push(note)

                if (cell.querySelector('.event')) {
                    cell.querySelector('.event').remove()
                }

                let span = document.createElement('span')
                span.classList.add('event')
                cell.append(span)


                note.render()
                noteArray.tab.push(note)
                sycroStorage(noteArray.tab)
                Add.close()
            }
        } else {
            new Error(["Veuillez selectionner un type de note"])
        }
    }

    static deleteNotes() {

        for (let i = 0; i < noteArray.tab.length; i++) {
            if (noteArray.tab[i].id === this.parentElement._noteReference_.id) {
                noteArray.tab.splice(i, 1)
            }
        }
        this.parentElement.remove()
        sycroStorage(noteArray.tab)

        let dateViewCalendar = document.querySelector('.view-day').dateNowCalendar
        viewCalendar(dateViewCalendar.getMonth(), dateViewCalendar.getFullYear())
        selectCalendar()
    }
}

class Error {
    constructor(data) {
        this.render(data)
    }

    render(data) {
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove()
        }

        let div = document.createElement('div')
        div.classList.add('error')
        let h3 = document.createElement('h3')
        h3.innerHTML = "Oups, une erreur c'est produite"
        let ul = document.createElement('ul')

        for (let item of data) {
            let li = document.createElement('li')
            li.innerHTML = item
            ul.append(li)
        }

        div.append(h3)
        div.append(ul)
        crudNote.append(div)
    }
}

function sycroStorage(item) {
    sessionStorage.clear()
    sessionStorage.setItem('notes', JSON.stringify(item))
}

let noteArray = new Render(sessionStorage.getItem('notes'))