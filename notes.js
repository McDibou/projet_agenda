// Dans l'array toDo un valeur true signifie que cette action est accomplie, une valeur false signifie qu'elle est à faire
let notesJSON = `[
    {
        "title": "Note 1",
        "text": "Une méthode est une fonction appartenant à un objet",
        "urgent": "1",
        "recallDate": "03-02-2021",
        "createDate" : "10-11-2021"
    },
    {
        "title": "Note 2",
        "urgent": "2",
        "text": "test",
        "recallDate": "03-02-2021",
        "createDate" : "10-02-2021"
    },
    {
        "title": "Notes 3",
        "list": [
            {"Faire les courses": true},
            {"Payer le loyer": false}, 
            {"test": false}
        ],
        "urgent": "1",
        "recallDate": "03-06-2021",
        "createDate" : "10-04-2021"
    }
]`