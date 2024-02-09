const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask(){
    if(inputBox.value === "") {
        alert("You must write something!");
    } else {
        // Create a new <li> element
        let li = document.createElement("li");

        // Create an <i> element that is a blank checkbox
        let checkboxIcon = document.createElement('i');
        checkboxIcon.className = 'ri-checkbox-blank-circle-line';

        // Create the X needed to delete a task within a <span> element
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        // Append <i>, task text and <span> to the <li> element
        li.appendChild(checkboxIcon)
        li.innerHTML += inputBox.value;
        li.appendChild(span);

        // Append the <li> element to the list
        listContainer.appendChild(li);
    }

    // Clear the input box and save data
    inputBox.value = "";
    saveData();
}

// Call the AddTask function when writing in the input box and pressing the Enter key
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        AddTask();
    }
});

// Check list items when clicked + remove them when the user click the X
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        let checkboxIcon = e.target.querySelector('i');
        toggleCheckboxClass(checkboxIcon);

        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Change between checked and unchecked checkbox
function toggleCheckboxClass(checkboxIcon) {
    checkboxIcon.classList.toggle("ri-checkbox-blank-circle-line");
    checkboxIcon.classList.toggle("ri-checkbox-circle-line");
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();