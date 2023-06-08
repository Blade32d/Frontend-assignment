const container1 = document.getElementById("container1"); // Get the reference to the first container element
const container2 = document.getElementById("container2"); // Get the reference to the second container element
const message = document.getElementById("message"); // Get the reference to the message element

let draggedItem = null; // Variable to keep track of the dragged item

// Add event listener for drag start event on container1
container1.addEventListener("dragstart", function (event) {
    draggedItem = event.target; // Set the dragged item to the current target
    event.dataTransfer.setData("text/html", draggedItem.innerHTML); // Set the data to be transferred during the drag
    event.dataTransfer.effectAllowed = "move"; // Set the effect allowed during the drag
    draggedItem.classList.add("dragging"); // Add the dragging class to the dragged item for visual feedback
});

// Add event listener for drag end event on container1
container1.addEventListener("dragend", function (event) {
    draggedItem.classList.remove("dragging"); // Remove the dragging class from the dragged item
    draggedItem = null; // Reset the dragged item to null
});

// Add event listener for drag over event on container2
container2.addEventListener("dragover", function (event) {
    event.preventDefault(); // Prevent the default behavior of the dragover event
    event.dataTransfer.dropEffect = "move"; // Set the drop effect to move
    container2.classList.add("droppable"); // Add the droppable class to container2 for visual feedback
});

// Add event listener for drag leave event on container2
container2.addEventListener("dragleave", function (event) {
    event.preventDefault(); // Prevent the default behavior of the dragleave event
});

// Add event listener for drop event on container2
container2.addEventListener("drop", function (event) {
    event.preventDefault(); // Prevent the default behavior of the drop event

    const messageDiv = document.createElement("div"); // Create a new div element for the dropped item
    messageDiv.className = "item2"; // Assign the class "item2" to the newly created div
    messageDiv.innerHTML += ("  ") + event.dataTransfer.getData("text/html"); // Set the content of the div to the transferred data
    container2.appendChild(messageDiv); // Append the div to container2

    showMessage("Item dropped successfully"); // Show the success message
});

// Function to show a message
function showMessage(text) {
    message.innerHTML = text; // Set the message content
    setTimeout(function () {
        message.innerHTML = ""; // Clear the message after a specified delay
    }, 750);
}

// Function to reset the containers and message
function reset() {
    container2.innerHTML = ""; // Clear the content of container2
    message.innerHTML = ""; // Clear the message
}

// Function to generate random color
function getRandomColor() {
    const letters = "0123456789ABCDEF"; // Possible characters for color code
    let color = "#"; // Start with a "#" for hexadecimal color code

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Append random characters from letters to form a color code
    }

    return color; // Return the generated color code
}

// Apply random background colors to the objects in container1
const items = container1.querySelectorAll(".item"); // Get all the items within container1
items.forEach((item) => {
    item.style.backgroundColor = getRandomColor(); // Set a random background color to each item
    item.classList.add("random-color"); // Add the class "random-color" to each item
});
