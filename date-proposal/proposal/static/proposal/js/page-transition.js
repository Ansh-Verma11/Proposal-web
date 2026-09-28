const pageTransition = document.getElementById("pageTransition");


/* PAGE LOAD */
window.addEventListener("pageshow", function() {

    pageTransition.classList.remove("active");

});


/* PAGE CHANGE */
function goToPage(url) {

    pageTransition.classList.add("active");

    setTimeout(function() {

        window.location.href = url;

    }, 700);

}