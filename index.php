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
<div class="calendar-base">
    <div class="body-note">
        <div class="view-day">
            <h1></h1>
            <h3></h3>
            <p></p>
        </div>
        <div class="read-note"></div>
        <div class="add-note">
            <div>
                <p>Add event</p><a class="add" onclick="Add.show()">+</a>
            </div>
            <hr>
        </div>
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
            <div class="urgent-input">
                <label for="urgent">Urgent :</label>
                <input id="urgent" type="range" name="urgent" min="1" max="4" step="1">
            </div>
            <button onclick="Add.addNote()">ADD NOTE</button>
            <a class="close-create" onclick="Add.close()">+</a>
        </div>
    </div>

    <div class="calendar">
        <div class="switch-years">
            <a class="previous" onclick="previous()"></a>
            <h3 class="view-date"></h3>
            <a class="next" onclick="next()"></a>
        </div>
        <div class="month">
            <span id="0">Jan</span>
            <span id="1">Fev</span>
            <span id="2">Mar</span>
            <span id="3">Avr</span>
            <span id="4">Mai</span>
            <span id="5">Jun</span>
            <span id="6">Jul</span>
            <span id="7">Aou</span>
            <span id="8">Sep</span>
            <span id="9">Oct</span>
            <span id="10">Nov</span>
            <span id="11">Dec</span>
        </div>
        <hr>
        <table>
            <thead>
            <tr>
                <th>Dim</th>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mer</th>
                <th>Jeu</th>
                <th>Ven</th>
                <th>Sam</th>
            </tr>
            </thead>

            <tbody class="calendar-body">

            </tbody>
        </table>
    </div>
    <div class="error-notif"></div>
</div>

<script src="app.js"></script>
<script src="calendar.js"></script>
<script src="notifiaction.js"></script>

</body>
</html>