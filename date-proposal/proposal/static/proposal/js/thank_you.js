const selectedDateType =
    sessionStorage.getItem("selectedDateType");

const selectedDate =
    sessionStorage.getItem("selectedDate");

const selectedTime =
    sessionStorage.getItem("selectedTime");


/* =========================
   SHOW DATE TYPE
========================= */

const dateTypeElement =
    document.getElementById("selectedDateType");

if (selectedDateType !== null) {

    dateTypeElement.textContent = selectedDateType;

}


/* =========================
   SHOW SELECTED DATE
========================= */

const dateElement =
    document.getElementById("selectedDate");

if (selectedDate !== null) {

    const date = new Date(selectedDate);

    dateElement.textContent =
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

}


/* =========================
   SHOW SELECTED TIME
========================= */

const timeElement =
    document.getElementById("selectedTime");

if (selectedTime !== null) {

    timeElement.textContent = selectedTime;

}