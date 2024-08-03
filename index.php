<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHONE GAP</title>
    <link rel="stylesheet" href="./styles/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h1>PHONE GAP</h1>
    <form id="userForm">
        <input type="hidden" id="userId">
        <label for="name">Name:</label>
        <input type="text" id="name" required autocomplete="off">
        <label for="email">Email:</label>
        <input type="email" id="email" required autocomplete="off">
        <button type="button" id="createBtn" onclick="createUser()">Create</button>
        <button type="button" id="updateBtn" style="display:none;" onclick="updateUser()">Update</button>
    </form>
    <div id="alertContainer"></div>
    <div id="confirmDialog" class="confirm-dialog">
        <div class="confirm-dialog-content">
            <p id="confirmMessage">Are you sure?</p>
            <button id="confirmYes">Yes</button><br>
            <button id="confirmNo">No</button>
        </div>
    </div>
    <table id="userTable" border="1">
        <!-- Users will be listed here -->
    </table>
    <script src="./scripts/script.js"></script>
</body>
</html>