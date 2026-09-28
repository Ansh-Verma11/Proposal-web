# Date Proposal Django Project — Complete Offline Code Reference

This file is the complete reference blueprint for the Date Proposal Django project.

IMPORTANT:
- This is a reference for the WHOLE project, including code that will be built later.
- Build it yourself step by step. Do not paste everything at once.
- In our normal lessons, we will continue explaining each line/concept before adding it.
- Some visual details may change while designing the project.

---

# 1. PROJECT GOAL

A phone-responsive Django web app with this flow:

Page 1
  Proposal question
  ↓
  Yes / No interaction
  ↓
  Yes opens the next page

Page 2
  Choose the type/activity for the date
  ↓
  Continue

Page 3
  Choose a date
  ↓
  Continue

Page 4
  Show the selected choices and a final confirmation/thank-you screen

Technology:

- Python
- Django
- HTML
- CSS
- JavaScript
- Google Fonts
- Responsive design

---

# 2. PROJECT STRUCTURE

Recommended final structure:

date-proposal/
│
├── manage.py
│
├── date_proposal/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── proposal/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── views.py
    ├── urls.py
    │
    ├── templates/
    │   └── proposal/
    │       ├── index.html
    │       ├── date_type.html
    │       ├── date_selection.html
    │       └── confirmation.html
    │
    └── static/
        └── proposal/
            ├── css/
            │   └── style.css
            │
            ├── js/
            │   └── script.js
            │
            └── images/
                ├── background.png
                ├── background_mobile.png
                └── envelope.png

---

# 3. DJANGO PROJECT URL CONFIGURATION

File:

date_proposal/urls.py

Complete planned version:

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("proposal.urls")),
]

Explanation:

- path() creates a URL route.
- "" means the root URL.
- include("proposal.urls") tells Django to look inside the proposal app's urls.py.
- admin/ keeps Django's admin panel.

---

# 4. APP URL CONFIGURATION

File:

proposal/urls.py

Complete planned version:

from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("date-type/", views.date_type, name="date_type"),
    path("date/", views.date_selection, name="date_selection"),
    path("confirmation/", views.confirmation, name="confirmation"),
]

URL map:

/
    → Page 1

/date-type/
    → Page 2

/date/
    → Page 3

/confirmation/
    → Page 4

---

# 5. VIEWS

File:

proposal/views.py

Planned complete version:

from django.shortcuts import render, redirect


def home(request):
    return render(request, "proposal/index.html")


def date_type(request):
    if request.method == "POST":
        selected_type = request.POST.get("date_type")

        request.session["date_type"] = selected_type

        return redirect("date_selection")

    return render(request, "proposal/date_type.html")


def date_selection(request):
    if request.method == "POST":
        selected_date = request.POST.get("date")

        request.session["date"] = selected_date

        return redirect("confirmation")

    return render(request, "proposal/date_selection.html")


def confirmation(request):
    selected_type = request.session.get("date_type")
    selected_date = request.session.get("date")

    context = {
        "date_type": selected_type,
        "date": selected_date,
    }

    return render(
        request,
        "proposal/confirmation.html",
        context
    )

Important concept:

request.session allows Django to remember choices between pages.

For example:

request.session["date_type"] = selected_type

stores the selected activity.

Later:

request.session.get("date_type")

retrieves it.

---

# 6. PAGE 1 — PROPOSAL

File:

proposal/templates/proposal/index.html

Complete planned version:

{% load static %}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Date Proposal</title>

    <link
        rel="stylesheet"
        href="{% static 'proposal/css/style.css' %}"
    >

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap"
        rel="stylesheet"
    >

    <link
        href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@500;600&display=swap"
        rel="stylesheet"
    >
</head>

<body>

    <main class="proposal_screen">

        <div class="proposal_content">

            <div class="envelope">
                <img
                    src="{% static 'proposal/images/envelope.png' %}"
                    alt="Envelope"
                >
            </div>

            <p class="intro-text">
                I have a little question<br>
                for you...
            </p>

            <div class="heart-divider">

                <span id="message">
                    ♡ ───────── ♡
                </span>

            </div>

            <h1 class="question">

                <span>Will you go on a</span>

                <span>date with me?</span>

            </h1>

            <div class="buttons">

                <button id="yesBtn">
                    Yes ❤️
                </button>

                <button id="noBtn">
                    No 🥺
                </button>

            </div>

        </div>

    </main>

    <script
        src="{% static 'proposal/js/script.js' %}"
    ></script>

</body>
</html>

---

# 7. PAGE 1 JAVASCRIPT

File:

proposal/static/proposal/js/script.js

Complete planned version:

console.log("JavaScript is connected!");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

let noClicks = 0;

noBtn.addEventListener("click", function() {

    noClicks++;

    console.log("No clicks:", noClicks);

    yesBtn.style.width = `${180 + noClicks * 15}px`;

    if (noClicks === 1) {

        message.textContent = "Aww, are you sure? 🥺";

        message.style.color = "#8f3048";

        message.classList.add("no-message");

    }

    else if (noClicks === 2) {

        message.textContent =
            "Maybe give it another thought? 💗";

        message.style.color = "#9b4d6e";

    }

    else if (noClicks === 3) {

        message.textContent =
            "I'm running out of arguments 😭";

        message.style.color = "#a65363";

    }

    else if (noClicks === 4) {

        message.textContent =
            "Okay... I'll stop asking 😌";

        message.style.color = "#7d4655";

        noBtn.classList.add("disappear");

    }

});


/*
Future addition:

When Yes is clicked, go to the next Django page.

Example:

yesBtn.addEventListener("click", function() {
    window.location.href = "/date-type/";
});

We will add this during the lesson instead of blindly pasting it.
*/

---

# 8. PAGE 2 — DATE TYPE / ACTIVITY

File:

proposal/templates/proposal/date_type.html

Planned complete version:

{% load static %}

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Choose Your Date</title>

    <link
        rel="stylesheet"
        href="{% static 'proposal/css/style.css' %}"
    >

</head>

<body>

    <main class="selection-page">

        <div class="selection-card">

            <h1 class="page-title">
                Choose your plan
            </h1>

            <p class="page-subtitle">
                What would you like to do?
            </p>

            <form method="POST">

                {% csrf_token %}

                <div class="date-options">

                    <button
                        type="submit"
                        name="date_type"
                        value="movie"
                        class="date-option"
                    >
                        <span class="option-icon">🎬</span>
                        <span class="option-title">
                            Movie
                        </span>
                        <span class="option-description">
                            Watch a movie together
                        </span>
                    </button>

                    <button
                        type="submit"
                        name="date_type"
                        value="food"
                        class="date-option"
                    >
                        <span class="option-icon">🍕</span>
                        <span class="option-title">
                            Food
                        </span>
                        <span class="option-description">
                            Go somewhere for food
                        </span>
                    </button>

                    <button
                        type="submit"
                        name="date_type"
                        value="walk"
                        class="date-option"
                    >
                        <span class="option-icon">🌆</span>
                        <span class="option-title">
                            Walk
                        </span>
                        <span class="option-description">
                            Spend some time outside
                        </span>
                    </button>

                    <button
                        type="submit"
                        name="date_type"
                        value="surprise"
                        class="date-option"
                    >
                        <span class="option-icon">🎁</span>
                        <span class="option-title">
                            Surprise
                        </span>
                        <span class="option-description">
                            Something unexpected
                        </span>
                    </button>

                </div>

            </form>

        </div>

    </main>

</body>
</html>

Important Django concept:

{% csrf_token %}

is required for a normal Django POST form.

The button's:

name="date_type"

and:

value="movie"

allow Django to receive the selection.

---

# 9. PAGE 3 — DATE SELECTION

File:

proposal/templates/proposal/date_selection.html

Planned complete version:

{% load static %}

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Choose a Date</title>

    <link
        rel="stylesheet"
        href="{% static 'proposal/css/style.css' %}"
    >

</head>

<body>

    <main class="selection-page">

        <div class="selection-card">

            <h1 class="page-title">
                Pick a date
            </h1>

            <p class="page-subtitle">
                Choose the day that works for you.
            </p>

            <form method="POST">

                {% csrf_token %}

                <div class="date-picker">

                    <label for="dateInput">
                        Your date
                    </label>

                    <input
                        type="date"
                        id="dateInput"
                        name="date"
                        required
                    >

                </div>

                <button
                    type="submit"
                    class="continue-button"
                >
                    Continue
                </button>

            </form>

        </div>

    </main>

</body>
</html>

---

# 10. PAGE 4 — CONFIRMATION

File:

proposal/templates/proposal/confirmation.html

Planned complete version:

{% load static %}

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Confirmation</title>

    <link
        rel="stylesheet"
        href="{% static 'proposal/css/style.css' %}"
    >

</head>

<body>

    <main class="confirmation-page">

        <div class="confirmation-card">

            <div class="confirmation-heart">
                ♥
            </div>

            <h1 class="page-title">
                It's a plan!
            </h1>

            <p class="confirmation-text">
                Your choices have been saved.
            </p>

            <div class="summary">

                <p>
                    <strong>Plan:</strong>
                    {{ date_type }}
                </p>

                <p>
                    <strong>Date:</strong>
                    {{ date }}
                </p>

            </div>

            <p class="final-message">
                Looking forward to it!
            </p>

        </div>

    </main>

</body>
</html>

---

# 11. COMPLETE CSS BLUEPRINT

File:

proposal/static/proposal/css/style.css

The final CSS will contain the existing Page 1 styling plus styling for Pages 2–4.

Base:

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100%;
    min-height: 100vh;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    background-image: url("../images/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.proposal_screen {
    width: 100%;
    min-height: 100vh;
    padding: 20px 15px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.proposal_content {
    width: 100%;
    max-width: 650px;
    text-align: center;
    margin: 0 auto;
}

.envelope {
    width: 40vw;
    max-width: 320px;
    margin: 0 auto;
}

.envelope img {
    width: 100%;
    height: auto;
    display: block;
}

.intro-text {
    font-family: "Dancing Script", cursive;
    font-size: 40px;
    line-height: 1.4;
    font-weight: 600;
    color: #4A2630;
    text-shadow: 0 2px 8px rgba(255, 240, 225, 0.8);
}

.heart-divider {
    margin: 15px 0;
    min-height: 55px;

    display: flex;
    align-items: center;
    justify-content: center;
}

#message {
    font-family: "Dancing Script", cursive;
    font-size: 30px;
    font-weight: 600;
    color: #c94f68;
}

#message.no-message {
    background: rgba(255, 240, 225, 0.65);
    padding: 4px 14px;
    border-radius: 15px;
    text-shadow: 0 1px 2px white;
}

.question {
    font-family: "DynaPuff", cursive;
    font-size: 48px;
    line-height: 1.2;
    font-weight: 600;
    color: #4A2630;
    text-shadow: 0 2px 8px rgba(255, 240, 225, 0.8);
}

.question span {
    display: inline-block;
}

.question span:first-child {
    transform: rotate(-2deg);
}

.question span:last-child {
    transform: rotate(2deg);
}

.buttons {
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 14px;

    padding-bottom: 15px;
}

.buttons button {
    width: 180px;
    padding: 12px 20px;

    border: none;
    border-radius: 30px;

    font-family: "DynaPuff", cursive;
    font-size: 20px;
    font-weight: 600;

    cursor: pointer;

    box-shadow:
        0 5px 12px rgba(74, 38, 48, 0.25),
        inset 0 2px 3px rgba(255, 255, 255, 0.45);

    transition:
        width 0.2s ease,
        padding 0.2s ease,
        box-shadow 0.2s ease;
}

#yesBtn {
    background: linear-gradient(
        180deg,
        #e87591 0%,
        #d94f70 100%
    );

    color: white;
}

#noBtn {
    background: linear-gradient(
        180deg,
        #f4c3cf 0%,
        #e8a8b6 100%
    );

    color: #4A2630;
}

.buttons button:hover {
    transform: scale(1.04);

    box-shadow:
        0 7px 16px rgba(74, 38, 48, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.55);
}

.buttons button:active {
    transform: scale(0.94);

    box-shadow:
        0 3px 8px rgba(74, 38, 48, 0.25),
        inset 0 2px 4px rgba(255, 255, 255, 0.55);
}

@keyframes disappear {

    0% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }

    60% {
        opacity: 0.5;
        transform: scale(0.8) rotate(-8deg);
    }

    100% {
        opacity: 0;
        transform: scale(0) rotate(15deg);
    }

}

#noBtn.disappear {
    animation: disappear 0.5s ease forwards;
}


/* =========================
   PAGES 2, 3 AND 4
   ========================= */

.selection-page,
.confirmation-page {
    width: 100%;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 15px;
}

.selection-card,
.confirmation-card {
    width: 100%;
    max-width: 600px;

    padding: 35px 25px;

    background: rgba(255, 240, 225, 0.88);

    border-radius: 30px;

    box-shadow:
        0 15px 40px rgba(74, 38, 48, 0.25);

    color: #4A2630;
}

.page-title {
    font-family: "DynaPuff", cursive;
    font-size: 42px;
    line-height: 1.2;

    margin-bottom: 12px;
}

.page-subtitle {
    font-family: "Dancing Script", cursive;
    font-size: 28px;

    margin-bottom: 28px;
}

.date-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.date-option {
    min-height: 150px;

    border: 2px solid transparent;
    border-radius: 22px;

    background: rgba(255, 255, 255, 0.75);

    color: #4A2630;

    padding: 20px;

    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 6px;

    font-family: Arial, sans-serif;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.date-option:hover {
    transform: translateY(-4px);

    border-color: #d94f70;

    box-shadow:
        0 8px 20px rgba(74, 38, 48, 0.18);
}

.option-icon {
    font-size: 32px;
}

.option-title {
    font-family: "DynaPuff", cursive;
    font-size: 20px;
    font-weight: 600;
}

.option-description {
    font-size: 14px;
    opacity: 0.75;
}

.date-picker {
    display: flex;
    flex-direction: column;

    gap: 10px;

    margin-bottom: 25px;
}

.date-picker label {
    font-family: "DynaPuff", cursive;
    font-size: 18px;
}

.date-picker input {
    width: 100%;

    padding: 14px;

    border: 2px solid #e8a8b6;
    border-radius: 15px;

    font-size: 18px;
    color: #4A2630;

    background: white;

    outline: none;
}

.date-picker input:focus {
    border-color: #d94f70;
}

.continue-button {
    border: none;
    border-radius: 30px;

    padding: 13px 30px;

    background: linear-gradient(
        180deg,
        #e87591 0%,
        #d94f70 100%
    );

    color: white;

    font-family: "DynaPuff", cursive;
    font-size: 18px;

    cursor: pointer;

    box-shadow:
        0 6px 15px rgba(74, 38, 48, 0.22);

    transition: transform 0.2s ease;
}

.continue-button:hover {
    transform: translateY(-2px);
}

.confirmation-heart {
    font-size: 65px;

    margin-bottom: 15px;

    color: #d94f70;
}

.confirmation-text {
    font-family: "Dancing Script", cursive;
    font-size: 30px;

    margin-bottom: 25px;
}

.summary {
    background: rgba(255, 255, 255, 0.7);

    border-radius: 18px;

    padding: 20px;

    margin-bottom: 25px;

    font-size: 18px;
    line-height: 1.8;
}

.final-message {
    font-family: "Dancing Script", cursive;
    font-size: 30px;
}


/* TABLET */

@media (min-width: 601px) and (max-width: 1000px) {

    .proposal_screen {
        padding: 20px 15px;
    }

    .envelope {
        width: 45vw;
        max-width: 320px;
    }

    .intro-text {
        font-size: 40px;
    }

    .heart-divider {
        margin: 12px 0;
    }

    .question {
        font-size: 46px;
    }

    .buttons {
        margin-top: 28px;
        gap: 14px;
    }

    .buttons button {
        width: 180px;
        padding: 12px 20px;
        font-size: 20px;
    }

}


/* PHONE */

@media (max-width: 600px) {

    body {
        background-image:
            url("../images/background_mobile.png");
    }

    .proposal_screen {
        padding: 10px 15px;
    }

    .envelope {
        width: 45vw;
        max-width: 300px;
    }

    .intro-text {
        font-size: 34px;
    }

    .heart-divider {
        margin: 10px 0;
    }

    #message {
        font-size: 27px;
    }

    .question {
        font-size: 40px;
    }

    .buttons {
        margin-top: 20px;
        gap: 10px;
    }

    .buttons button {
        width: 160px;
        padding: 11px 18px;
        font-size: 18px;
    }

    .selection-page,
    .confirmation-page {
        padding: 20px 12px;
    }

    .selection-card,
    .confirmation-card {
        padding: 28px 18px;
        border-radius: 24px;
    }

    .page-title {
        font-size: 32px;
    }

    .page-subtitle {
        font-size: 24px;
    }

    .date-options {
        grid-template-columns: 1fr;
    }

    .date-option {
        min-height: 120px;
    }

}


/* SHORT PHONE */

@media (max-height: 700px) {

    .proposal_screen {
        padding: 10px 15px;
    }

    .envelope {
        width: 35vw;
        max-width: 260px;
    }

    .intro-text {
        font-size: 34px;
    }

    .heart-divider {
        margin: 8px 0;
    }

    .question {
        font-size: 40px;
    }

    .buttons {
        margin-top: 18px;
        gap: 10px;
    }

    .buttons button {
        width: 160px;
        padding: 10px 18px;
        font-size: 18px;
    }

}

---

# 12. PAGE 1 → PAGE 2 NAVIGATION

When the first page works correctly, add this to script.js:

yesBtn.addEventListener("click", function() {

    window.location.href = "/date-type/";

});

Explanation:

yesBtn
    selects the Yes button.

addEventListener()
    waits for a user action.

"click"
    means the action is a click.

function()
    contains what should happen.

window.location.href
    changes the browser URL.

"/date-type/"
    is the Django URL created in proposal/urls.py.

---

# 13. IMPORTANT JAVASCRIPT CONCEPTS LEARNED

Variables:

let noClicks = 0;

DOM selection:

document.getElementById("noBtn");

Event:

noBtn.addEventListener("click", function() {
});

Changing text:

message.textContent = "New message";

Changing CSS from JavaScript:

yesBtn.style.width = "200px";

Adding a class:

noBtn.classList.add("disappear");

Conditional logic:

if (noClicks === 1) {
}
else if (noClicks === 2) {
}
else {
}

CSS class animation:

#noBtn.disappear {
    animation: disappear 0.5s ease forwards;
}

---

# 14. WHY TRANSFORM SCALE WAS NOT USED FOR YES BUTTON GROWTH

This:

yesBtn.style.transform = `scale(...)`;

visually enlarges the button.

But the layout still reserves approximately the original button space.

Therefore it can overlap nearby elements.

The current approach:

yesBtn.style.width = `${180 + noClicks * 15}px`;

actually changes the button's width.

That allows normal layout calculations to account for the larger button.

---

# 15. FUTURE IMPROVEMENT — GROW TEXT TOO

If we later want the Yes button's text to grow together with the button:

yesBtn.style.fontSize = `${20 + noClicks * 2}px`;

This should be tested carefully because making the font too large can make the button look unbalanced.

---

# 16. FUTURE IMPROVEMENT — PREVENT TOO-LARGE BUTTON

A safer version can use a maximum:

const newWidth = Math.min(
    180 + noClicks * 15,
    320
);

yesBtn.style.width = `${newWidth}px`;

Math.min() prevents the width from exceeding 320px.

---

# 17. SESSION FLOW

The final Django flow is:

Browser
   ↓
/
   ↓
home()
   ↓
index.html
   ↓
Yes button
   ↓
/date-type/
   ↓
date_type()
   ↓
POST selected activity
   ↓
request.session["date_type"]
   ↓
/date/
   ↓
date_selection()
   ↓
POST selected date
   ↓
request.session["date"]
   ↓
/confirmation/
   ↓
confirmation()
   ↓
confirmation.html

This is the main Django concept behind the complete project.

---

# 18. DJANGO TEMPLATE VARIABLES

The confirmation view sends:

context = {
    "date_type": selected_type,
    "date": selected_date,
}

The template receives them.

So:

{{ date_type }}

means:

"Print the value stored under date_type."

And:

{{ date }}

means:

"Print the value stored under date."

---

# 19. OPTIONAL FUTURE IMPROVEMENT — FRIENDLIER DISPLAY

Instead of displaying:

movie

we could display:

Movie Night

or:

food

as:

Food & Conversation

This can be handled later with a dictionary in views.py:

type_names = {
    "movie": "Movie Night",
    "food": "Food & Conversation",
    "walk": "Evening Walk",
    "surprise": "Surprise Plan",
}

Then:

display_type = type_names.get(selected_type, selected_type)

The session can continue storing the simple value.

---

# 20. OPTIONAL FUTURE IMPROVEMENT — VALID DATE

The date input can later have a minimum date.

JavaScript example:

const dateInput = document.getElementById("dateInput");

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

dateInput.min =
    `${year}-${month}-${day}`;

This prevents selecting a date before today in the browser.

Later we can also validate it on the Django server.

---

# 21. OPTIONAL FUTURE IMPROVEMENT — BACK BUTTON

Later, add:

<a href="{% url 'date_type' %}">
    Back
</a>

Using Django's:

{% url 'date_type' %}

is better than hard-coding:

/date-type/

because Django generates the correct URL from the URL name.

This is an important Django template concept.

---

# 22. OPTIONAL FUTURE IMPROVEMENT — BASE TEMPLATE

Once the project becomes larger, repeated HTML can be moved into:

proposal/templates/proposal/base.html

Example:

{% load static %}

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        {% block title %}
        Date Proposal
        {% endblock %}
    </title>

    <link
        rel="stylesheet"
        href="{% static 'proposal/css/style.css' %}"
    >

</head>

<body>

    {% block content %}
    {% endblock %}

</body>

</html>

Then individual pages can use:

{% extends "proposal/base.html" %}

{% block title %}
Choose a Date
{% endblock %}

{% block content %}

    <!-- page content -->

{% endblock %}

This avoids repeating the same HTML structure.

We should introduce this only after the basic Django flow is understood.

---

# 23. OPTIONAL FUTURE IMPROVEMENT — BETTER ANIMATIONS

Possible animations:

- page fade-in
- card floating
- button hover
- option selection
- confirmation heart animation
- envelope entrance
- message transition

Example:

@keyframes fadeIn {

    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}

Then:

.proposal_content {
    animation: fadeIn 0.7s ease;
}

---

# 24. OPTIONAL FUTURE IMPROVEMENT — STORE EVERYTHING IN DJANGO

If we later want the project to permanently remember submissions, we can introduce a Django model.

Example future model:

from django.db import models


class ProposalResponse(models.Model):

    date_type = models.CharField(
        max_length=50
    )

    selected_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.date_type} - "
            f"{self.selected_date}"
        )

This is NOT required for the first version.

The first version should use sessions so the Django concepts remain manageable.

---

# 25. OPTIONAL FUTURE MODEL FLOW

If database storage is added:

User selects activity
        ↓
Django receives POST
        ↓
Django validates data
        ↓
ProposalResponse.objects.create(...)
        ↓
Database stores response
        ↓
Confirmation page

This introduces:

- models
- migrations
- database
- ORM
- validation
- admin panel

These should be learned after the basic project works.

---

# 26. TESTING CHECKLIST

After Page 1:

[ ] Background loads
[ ] Envelope loads
[ ] Fonts load
[ ] Yes button appears
[ ] No button appears
[ ] No click changes message
[ ] Yes button grows
[ ] No button disappears
[ ] Console shows click count
[ ] Yes eventually navigates to Page 2

After Page 2:

[ ] Page opens
[ ] Options appear
[ ] Clicking an option sends POST
[ ] CSRF token works
[ ] Session stores date type
[ ] Page redirects to Page 3

After Page 3:

[ ] Date input appears
[ ] Date can be selected
[ ] Form submits
[ ] Session stores date
[ ] Page redirects to confirmation

After Page 4:

[ ] Selected activity appears
[ ] Selected date appears
[ ] Page looks good on phone
[ ] Page looks good on desktop

---

# 27. DEVELOPMENT ORDER

Do NOT build everything simultaneously.

Recommended order:

STEP 1
Get Page 1 HTML working.

STEP 2
Style Page 1 with CSS.

STEP 3
Make Page 1 responsive.

STEP 4
Connect JavaScript.

STEP 5
Understand variables.

STEP 6
Understand DOM selection.

STEP 7
Understand click events.

STEP 8
Build No-click counter.

STEP 9
Build changing messages.

STEP 10
Build Yes-button growth.

STEP 11
Build CSS disappearance animation.

STEP 12
Make Yes navigate to Page 2.

STEP 13
Create proposal/urls.py.

STEP 14
Create date_type view.

STEP 15
Build Page 2.

STEP 16
Learn POST and CSRF.

STEP 17
Learn Django sessions.

STEP 18
Build Page 3.

STEP 19
Store selected date.

STEP 20
Build Page 4.

STEP 21
Display session values using Django template variables.

STEP 22
Improve responsive design.

STEP 23
Add animations.

STEP 24
Test the complete flow.

STEP 25
Optionally add database storage.

STEP 26
Prepare deployment/hosting.

---

# 28. DEPLOYMENT — LATER

When the project is finished, it can be hosted online so another phone can open the link.

Before deployment we will need to learn:

- DEBUG
- ALLOWED_HOSTS
- SECRET_KEY
- static files
- production server
- database considerations
- HTTPS
- environment variables

Do not change production settings yet.

First finish the local project.

---

# 29. IMPORTANT LEARNING RULE

The reference contains future code so the whole project is documented offline.

But during actual development:

1. Understand the purpose.
2. Learn the concept.
3. Write the code.
4. Run it.
5. Test it.
6. Fix errors.
7. Move to the next feature.

Do not paste the entire file into the project.

The goal is to understand Django, HTML, CSS and JavaScript rather than merely finish this one website.

---

# 30. CURRENT PROJECT STATUS

Already covered/built:

- Django environment
- Django project
- Django app
- URL basics
- Templates
- Static files
- HTML structure
- CSS structure
- Responsive background
- Envelope image
- Google Fonts
- Proposal question
- Yes/No buttons
- JavaScript connection
- JavaScript variables
- DOM selection
- click event
- No-click counter
- changing messages
- Yes button width growth
- CSS keyframes
- No button disappearance
- CSS/JavaScript class relationship

Next logical lesson:

YES BUTTON → DJANGO PAGE 2

We will connect the JavaScript Yes button to:

/date-type/

Then learn how Django URLs and views work together.

---

# 31. QUICK REFERENCE

Start server:

python manage.py runserver

Activate Windows virtual environment:

.venv\Scripts\activate

Check Django project:

python manage.py check

Create migrations later:

python manage.py makemigrations

Apply migrations later:

python manage.py migrate

Create admin user later:

python manage.py createsuperuser

---

# 32. CORE DJANGO MENTAL MODEL

Remember this:

URL
 ↓
VIEW
 ↓
TEMPLATE
 ↓
HTML
 ↓
CSS / JavaScript
 ↓
Browser

For a form:

Browser
 ↓
POST
 ↓
VIEW
 ↓
validate/process data
 ↓
SESSION / DATABASE
 ↓
REDIRECT
 ↓
NEXT VIEW
 ↓
TEMPLATE

This mental model is more important than memorizing individual lines.

---

# END

This document is intentionally both:

1. an offline reference for the code of the whole planned project
2. a roadmap for learning how each part works

The actual project should still be built incrementally.
