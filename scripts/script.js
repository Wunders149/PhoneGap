function sendRequest(action, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../includes/api.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    var encodedData = Object.keys(data).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    xhr.send(encodedData + '&action=' + action);
}

function showAlert(message, isError = false) {
    var alertContainer = document.getElementById('alertContainer');
    var alert = document.createElement('div');
    alert.className = 'alert' + (isError ? ' error' : '') + ' show';
    alert.textContent = message;
    alertContainer.appendChild(alert);
    setTimeout(function() {
        alert.classList.remove('show');
        setTimeout(function() {
            alertContainer.removeChild(alert);
        }, 300);
    }, 3000);
}

function showConfirmDialog(message, onConfirm) {
    var confirmDialog = document.getElementById('confirmDialog');
    var confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = message;
    confirmDialog.style.display = 'flex';

    var confirmYes = document.getElementById('confirmYes');
    var confirmNo = document.getElementById('confirmNo');

    confirmYes.onclick = function() {
        confirmDialog.style.display = 'none';
        onConfirm();
    };

    confirmNo.onclick = function() {
        confirmDialog.style.display = 'none';
    };
}

function createUser() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    sendRequest('create', { name: name, email: email }, function(response) {
        showAlert('User created with ID: ' + response.id);
        fetchUsers();
    });
}

function fetchUsers() {
    sendRequest('read', {}, function(response) {
        var userTable = document.getElementById('userTable');
        userTable.innerHTML = '<tr><th>Name</th><th>Email</th><th>Actions</th></tr>';
        response.forEach(function(user) {
            userTable.innerHTML += `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
        });
    });
}

function editUser(id, name, email) {
    document.getElementById('userId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('createBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'inline';
}

function updateUser() {
    var id = document.getElementById('userId').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    sendRequest('update', { id: id, name: name, email: email }, function(response) {
        showAlert('User updated');
        document.getElementById('createBtn').style.display = 'inline';
        document.getElementById('updateBtn').style.display = 'none';
        fetchUsers();
    });
}

function deleteUser(id) {
    showConfirmDialog('Are you sure?', function() {
        sendRequest('delete', { id: id }, function(response) {
            showAlert('User deleted');
            fetchUsers();
        });
    });
}

window.onload = function() {
    fetchUsers();
};