var list = document.getElementById("list");
firebase.database().ref('todos').on('child_added', function (data) {
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    list.appendChild(li)


    // del 

    var delBtn = document.createElement('i')
    delBtn.setAttribute('class', "btn fa fa-minus-circle")
    delBtn.setAttribute('onclick', 'deleteItem(this)')
    delBtn.setAttribute('id', data.val().key)
    li.appendChild(delBtn)

    // edit

    var editBtn = document.createElement('i')
    editBtn.setAttribute('class', "blue fa fa-pencil")
    editBtn.setAttribute('onclick', 'editItem(this)')
    editBtn.setAttribute('id', data.val().key)
    li.appendChild(editBtn)
    var HR = document.createElement('hr')
    li.appendChild(HR)
})

function addTodo() {


    if (document.getElementById("todoItem").value === "") {
        alert("Enter any ToDo")
    }


    else {

        var todo_item = document.getElementById("todoItem");
        var key = firebase.database().ref('todos').push().key;
        var todo = {
            value: todo_item.value,
            key: key
        }
        firebase.database().ref('todos').child(key).set(todo)

        // li 
        todoItem.value = ""

    }
}




function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function editItem(e) {
    var val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)

    if (val === "") {
        alert("Please fill the item")
    } else {
        e.parentNode.firstChild.nodeValue = val
    }
}

function deleteAll() {
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}

var input = document.getElementById("todoItem");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("myBtn").click();
    }
});