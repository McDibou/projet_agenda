<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Projet js</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="calendar">
    <h3 class="view-date"></h3>
    <div>
        <button class="previous" onclick="previous()">Previous</button>
        <button class="next" onclick="next()">Next</button>
    </div>
    <table>
        <thead>
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
        </thead>

        <tbody class="calendar-body">

        </tbody>
    </table>

</div>
<div class="body-note">
    <div class="read-note"></div>
    <div class="add-note">
        <button class="add" onclick="Add.show()">ADD</button>
    </div>
    <div class="crud-note" style="display: none">
        <div class="create-note">
            <div class="input-title">
                <label for="title">Title :</label>
                <input id="title" type="text" name="title">
            </div>
            <div class="choice">
                <label for="">Content :</label>
                <button onclick="Add.addText()">Add text</button>
                <button onclick="Add.addList()">Add list</button>
            </div>
            <div class="date-input">
                <label for="recallDate">Rappel :</label>
                <input id="recallDate" type="datetime-local" name="recallDate">
            </div>
            <div class="urgent-input">
                <label for="urgent">Urgent :</label>
                <input id="urgent" type="range" name="urgent" min="1" max="4" step="1">
            </div>
            <button onclick="Add.addNote()">ADD NOTE</button>
            <button onclick="Add.close()">x</button>
        </div>
    </div>
</div>

<script src="notes.js"></script>
<script src="app.js"></script>
<script src="calendar.js"></script>
</body>
</html>