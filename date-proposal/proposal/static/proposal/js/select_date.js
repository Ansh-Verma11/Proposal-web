const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");

const previousMonth = document.getElementById("previousMonth");
const nextMonth = document.getElementById("nextMonth");

const eveningOption = document.getElementById("eveningOption");
const timeOptions = document.querySelectorAll(".time-option");

const continueBtn = document.getElementById("continueBtn");


let currentDate = new Date();

let selectedDate = null;
let selectedTime = null;


/* =========================
   CREATE CALENDAR
========================= */

function createCalendar() {

    // Remove old calendar dates
    calendarDays.innerHTML = "";


    // Get current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();


    // First day of the month
    const firstDay = new Date(year, month, 1);


    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);


    // Total number of days
    const totalDays = lastDay.getDate();


    // Starting weekday
    const startingDay = firstDay.getDay();


    // Display month and year
    monthYear.textContent = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });


    /* =========================
       EMPTY DAYS
    ========================= */

    for (let i = 0; i < startingDay; i++) {

        const emptyDay = document.createElement("div");

        emptyDay.classList.add("empty-day");

        calendarDays.appendChild(emptyDay);
    }


    /* =========================
       CREATE DAYS
    ========================= */

    for (let day = 1; day <= totalDays; day++) {

        const dayButton = document.createElement("button");

        dayButton.textContent = day;

        dayButton.classList.add("calendar-day");


        /* Day click */

        dayButton.addEventListener("click", function() {

            // Remove previous selected day
            document
                .querySelectorAll(".calendar-day")
                .forEach(function(button) {

                    button.classList.remove("selected");

                });


            // Select clicked day
            dayButton.classList.add("selected");


            // Save selected date
            selectedDate = new Date(year, month, day);


            console.log("Selected date:", selectedDate);


            // Check Continue button
            checkContinueButton();

        });


        calendarDays.appendChild(dayButton);
    }
}


/* =========================
   PREVIOUS MONTH
========================= */

previousMonth.addEventListener("click", function() {

    currentDate.setMonth(currentDate.getMonth() - 1);

    createCalendar();

});


/* =========================
   NEXT MONTH
========================= */

nextMonth.addEventListener("click", function() {

    currentDate.setMonth(currentDate.getMonth() + 1);

    createCalendar();

});


/* =========================
   EVENING OPTION
========================= */

eveningOption.addEventListener("click", function() {

    // Remove selection from normal time options
    timeOptions.forEach(function(option) {

        option.classList.remove("selected");

    });


    // Select/unselect Evening
    eveningOption.classList.toggle("selected");


    if (eveningOption.classList.contains("selected")) {

        selectedTime = "Evening";

    } else {

        selectedTime = null;

    }


    console.log("Selected time:", selectedTime);


    // Check Continue button
    checkContinueButton();

});


/* =========================
   SPECIFIC TIME OPTIONS
========================= */

timeOptions.forEach(function(option) {

    option.addEventListener("click", function() {

        // Remove Evening selection
        eveningOption.classList.remove("selected");


        // Remove previous time selection
        timeOptions.forEach(function(item) {

            item.classList.remove("selected");

        });


        // Select clicked time
        option.classList.add("selected");


        // Save selected time
        selectedTime = option.textContent.trim();


        console.log("Selected time:", selectedTime);


        // Check Continue button
        checkContinueButton();

    });

});


/* =========================
   CHECK CONTINUE BUTTON
========================= */

function checkContinueButton() {

    if (selectedDate !== null && selectedTime !== null) {

        continueBtn.disabled = false;

    } else {

        continueBtn.disabled = true;

    }

}


/* =========================
   CONTINUE BUTTON
========================= */

continueBtn.addEventListener("click", function() {

    if (selectedDate !== null && selectedTime !== null) {

        // Get CSRF token
        const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
        ).value;


        // Format date as YYYY-MM-DD
        const year = selectedDate.getFullYear();

        const month = String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            selectedDate.getDate()
        ).padStart(2, "0");


        const formattedDate =
            `${year}-${month}-${day}`;


        // Send date and time to Django
        fetch("/save-selection/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },

            body: JSON.stringify({

                selected_date: formattedDate,

                selected_time: selectedTime

            })

        })

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Server returned error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function(data) {

            if (data.success) {

                window.location.href = "/thank-you/";

            } else {

                console.error(
                    "Could not save selection:",
                    data.error
                );

            }

        })

        .catch(function(error) {

            console.error(
                "Error saving selection:",
                error
            );

        });

    }

});


/* =========================
   START CALENDAR
========================= */

createCalendar();


// Make sure Continue starts disabled
checkContinueButton();