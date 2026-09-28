# Date Proposal Django Project — Offline Help File

## Purpose
A phone-responsive interactive proposal webpage built with Django.
The goal is to learn HTML, CSS, JavaScript, and Django while building the project.

## Current project path
D:\praposal_web\date-proposal

## Current Django structure

date-proposal/
├── manage.py
├── proposal/
│   ├── templates/
│   │   └── proposal/
│   │       └── index.html
│   └── static/
│       └── proposal/
│           ├── css/
│           │   └── style.css
│           ├── js/
│           │   └── script.js
│           └── images/
│               ├── background.png
│               ├── background_mobile.png
│               └── envelope.png
└── date-proposal project settings/urls files

## Django static pattern

At the top of an HTML template:
{% load static %}

CSS:
<link rel="stylesheet" href="{% static 'proposal/css/style.css' %}">

Image:
<img src="{% static 'proposal/images/envelope.png' %}" alt="">

JavaScript:
<script src="{% static 'proposal/js/script.js' %}"></script>

## Current first-page HTML structure

<main class="proposal_screen">
    <div class="proposal_content">

        <div class="envelope">
            <img src="{% static 'proposal/images/envelope.png' %}" alt="">
        </div>

        <p class="intro-text">
            I have a little question<br>
            for you...
        </p>

        <div class="heart-divider">
            <span id="message">♡ ───────── ♡</span>
        </div>

        <h1 class="question">
            <span>Will you go on a</span>
            <span>date with me?</span>
        </h1>

        <div class="buttons">
            <button id="yesBtn">Yes ❤️</button>
            <button id="noBtn">No 🥺</button>
        </div>

    </div>
</main>

## Current JavaScript concepts

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

document.getElementById("...") finds an HTML element by its id.

let noClicks = 0;

noClicks++ means increase noClicks by 1.

noBtn.addEventListener("click", function() {
    // code here runs when No is clicked
});

if (...) { ... }
else if (...) { ... }

classList.add("class-name") adds a CSS class to an element.

Important relationship:
JavaScript decides WHICH element gets a class.
CSS decides WHAT that class does.

## Current No-click behavior

let noClicks = 0;

noBtn.addEventListener("click", function() {

    noClicks++;

    yesBtn.style.width = `${180 + noClicks * 15}px`;

    if (noClicks === 1) {
        message.textContent = "Aww, are you sure? 🥺";
        message.style.color = "#8f3048";
        message.classList.add("no-message");

    } else if (noClicks === 2) {
        message.textContent = "Maybe give it another thought? 💗";
        message.style.color = "#9b4d6e";

    } else if (noClicks === 3) {
        message.textContent = "I'm running out of arguments 😭";
        message.style.color = "#a65363";

    } else if (noClicks === 4) {
        message.textContent = "Okay... I'll stop asking 😌";
        message.style.color = "#7d4655";

        noBtn.classList.add("disappear");
    }
});

## Current message CSS idea

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

The background is only added after a No click, not to the original heart divider.

## Creative No-button disappearance

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

@keyframes defines HOW an animation behaves.
#noBtn.disappear tells WHICH element uses that animation.

JavaScript:
noBtn.classList.add("disappear");

This changes the effective HTML to something like:
<button id="noBtn" class="disappear">No 🥺</button>

## Important CSS animation lesson

@keyframes disappear { ... }
    = defines the animation.

#noBtn.disappear {
    animation: disappear 0.5s ease forwards;
}
    = applies that animation to the No button when it has the disappear class.

## Current Yes-button growth

Current approach changed from transform: scale() to width because scale visually grows the button without increasing the layout space.

Current idea:
yesBtn.style.width = `${180 + noClicks * 15}px`;

This changes actual width:
0 clicks = 180px
1 = 195px
2 = 210px
3 = 225px
4 = 240px

Note: width-only growth can look stretched. This can be improved later by increasing height/padding proportionally.

## Design choices already made

- Keep the page visually clean.
- Do NOT put a large background box around the whole heart-divider.
- Only No-click messages get a small translucent background.
- Keep the original slight rotation on the two question lines.
- Keep glossy button styling with gradient, shadow, inset highlight, hover, and active effects.
- Keep the page responsive for phone/tablet/laptop.
- Avoid unnecessary code changes when the current result already looks good.

## Planned complete app flow

Page 1:
Envelope → intro → question → Yes/No interaction.

No clicks:
1. Message 1
2. Message 2
3. Message 3
4. Final message + creative No-button disappearance

Yes:
→ Date/activity selection page
→ Date selection page
→ Final confirmation/thank-you page

## Learning order

1. HTML structure
2. CSS layout and responsive design
3. JavaScript variables
4. DOM selection with getElementById
5. Event listeners
6. Counters
7. if / else if
8. classList
9. CSS animations
10. Page navigation
11. Django URLs
12. Django views
13. Django templates
14. Passing data from views to templates
15. Final responsive polish

## Offline reminder

If internet is unavailable, use this file as a project reference.
When internet is available again, continue asking ChatGPT to explain each part rather than copying large unexplained sections.

## Current key lesson

HTML = structure
CSS = appearance
JavaScript = behavior
Django = connects pages/data/backend

Example:
HTML creates button.
CSS makes button look good.
JavaScript reacts when button is clicked.
Django decides which page/view is served.
