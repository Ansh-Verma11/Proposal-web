const dateOptions = document.querySelectorAll(".date-option");
const continueDateBtn = document.getElementById("continueDateBtn");

let selectedDate = null;


dateOptions.forEach(function(option) {

    option.addEventListener("click", function() {

        // Remove selection from all options
        dateOptions.forEach(function(item) {
            item.classList.remove("selected");
        });

        // Select the clicked option
        option.classList.add("selected");

        // Get the selected date type
        selectedDate = option.dataset.date;

        // Enable Continue button
        continueDateBtn.disabled = false;

        console.log("Selected date:", selectedDate);
    });

});


continueDateBtn.addEventListener("click", function() {

    if (selectedDate !== null) {

        // Get Django CSRF token
        const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
        ).value;


        fetch("/save-date-type/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },

            body: JSON.stringify({
                date_type: selectedDate
            })

        })

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Server returned an error: " + response.status);
            }

            return response.json();

        })

        .then(function(data) {

            if (data.success) {

               window.location.href = "/select-date/";

            } else {

                console.error("Date type was not saved.");

            }

        })

        .catch(function(error) {

            console.error("Error saving date type:", error);

        });

    }

});