"use strict";


/* ========================================
   EXCUSES DATABASE
======================================== */

const excuses = {

    college: [
        "My brain went on a surprise holiday.",
        "I was studying, but my textbook fell asleep first.",
        "My Wi-Fi developed trust issues.",
        "My alarm clock betrayed me.",
        "I was mentally present in class.",
        "My academic motivation temporarily left the building.",
        "I arrived spiritually, just not physically.",
        "My backpack and I had a disagreement this morning."
    ],

    late: [
        "My laptop needed emotional support.",
        "The assignment disappeared into another dimension.",
        "My internet decided to take a vacation.",
        "I finished the assignment, but my computer disagreed.",
        "My keyboard went on strike.",
        "The deadline and I simply had different expectations.",
        "My file was ready, but technology had other plans.",
        "I was waiting for my creativity to finish loading."
    ],

    skip: [
        "My bed refused to release me.",
        "I was waiting for the perfect moment to attend class.",
        "My legs voted against going to college.",
        "I accidentally entered a five-hour nap.",
        "My motivation couldn't find the classroom.",
        "I was physically unavailable but mentally supportive.",
        "My alarm rang, but apparently I didn't.",
        "I was conducting important research on sleep."
    ],

    random: [
        "A pigeon distracted me for 45 minutes.",
        "My Wi-Fi developed trust issues.",
        "My pen stopped cooperating with me.",
        "I was busy having an existential crisis.",
        "My brain needed a software update.",
        "A completely unnecessary situation became extremely necessary.",
        "I got distracted by absolutely nothing.",
        "My productivity called in sick."
    ]

};


/* ========================================
   ELEMENTS
======================================== */

const categoryButtons =
    document.querySelectorAll(".category");

const generateButton =
    document.getElementById("generateBtn");

const againButton =
    document.getElementById("againBtn");

const copyButton =
    document.getElementById("copyBtn");

const favoriteButton =
    document.getElementById("favoriteBtn");

const excuseElement =
    document.getElementById("excuse");

const categoryBadge =
    document.getElementById("categoryBadge");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const toast =
    document.getElementById("toast");


/* ========================================
   CURRENT CATEGORY
======================================== */

let currentCategory = "college";


/* ========================================
   SELECT CATEGORY
======================================== */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        categoryBadge.textContent =
            currentCategory.toUpperCase();

    });

});


/* ========================================
   GENERATE EXCUSE
======================================== */

function generateExcuse() {

    const list =
        excuses[currentCategory];

    const randomIndex =
        Math.floor(
            Math.random() * list.length
        );

    const selectedExcuse =
        list[randomIndex];


    /* Display excuse */

    excuseElement.textContent =
        selectedExcuse;


    /* Animation */

    excuseElement.classList.remove(
        "excuse-animation"
    );

    void excuseElement.offsetWidth;

    excuseElement.classList.add(
        "excuse-animation"
    );


    /* Generate random believability */

    const score =
        Math.floor(
            Math.random() * 41
        ) + 55;

    updateScore(score);

}


/* ========================================
   UPDATE SCORE
======================================== */

function updateScore(score) {

    scoreElement.textContent =
        `${score}%`;

    progressBar.style.width =
        `${score}%`;

}


/* ========================================
   COPY EXCUSE
======================================== */

copyButton.addEventListener(
    "click",
    async () => {

        const text =
            excuseElement.textContent;

        if (
            !text ||
            text === "Your excuse will appear here..."
        ) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                text
            );

            showToast(
                "Excuse copied! 📋"
            );

        } catch (error) {

            showToast(
                "Couldn't copy the excuse."
            );

        }

    }
);


/* ========================================
   FAVORITE
======================================== */

favoriteButton.addEventListener(
    "click",
    () => {

        const isFavorite =
            favoriteButton.classList.toggle(
                "favorite"
            );

        if (isFavorite) {

            favoriteButton.textContent =
                "♥ Saved";

            showToast(
                "Added to favorites! ❤️"
            );

        } else {

            favoriteButton.textContent =
                "♡ Favorite";

        }

    }
);


/* ========================================
   AGAIN BUTTON
======================================== */

againButton.addEventListener(
    "click",
    generateExcuse
);


/* ========================================
   MAIN GENERATE BUTTON
======================================== */

generateButton.addEventListener(
    "click",
    generateExcuse
);


/* ========================================
   TOAST
======================================== */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* ========================================
   INITIAL EXCUSE
======================================== */

generateExcuse();
