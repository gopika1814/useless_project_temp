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
        "My backpack and I had a disagreement this morning.",
        "I was preparing emotionally for today's lecture.",
        "My brain was still loading when class started."
    ],


    late: [
        "My laptop needed emotional support.",
        "The assignment disappeared into another dimension.",
        "My internet decided to take a vacation.",
        "I finished the assignment, but my computer disagreed.",
        "My keyboard went on strike.",
        "The deadline and I simply had different expectations.",
        "My file was ready, but technology had other plans.",
        "I was waiting for my creativity to finish loading.",
        "My document refused to save at the most important moment.",
        "I underestimated how quickly time could disappear."
    ],


    skip: [
        "My bed refused to release me.",
        "I was waiting for the perfect moment to attend class.",
        "My legs voted against going to college.",
        "I accidentally entered a five-hour nap.",
        "My motivation couldn't find the classroom.",
        "I was physically unavailable but mentally supportive.",
        "My alarm rang, but apparently I didn't.",
        "I was conducting important research on sleep.",
        "My blanket activated maximum-security mode.",
        "I had an unexpected meeting with my pillow."
    ],


    random: [
        "A pigeon distracted me for 45 minutes.",
        "My Wi-Fi developed trust issues.",
        "My pen stopped cooperating with me.",
        "I was busy having an existential crisis.",
        "My brain needed a software update.",
        "A completely unnecessary situation became extremely necessary.",
        "I got distracted by absolutely nothing.",
        "My productivity called in sick.",
        "I was temporarily confused by the concept of time.",
        "Something happened. I don't know what, but it happened."
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

const favoritesBtn =
    document.getElementById("favoritesBtn");

const favoriteCount =
    document.getElementById("favoriteCount");

const favoritesPanel =
    document.getElementById("favoritesPanel");

const closeFavorites =
    document.getElementById("closeFavorites");

const favoritesList =
    document.getElementById("favoritesList");

const clearFavorites =
    document.getElementById("clearFavorites");


/* ========================================
   VARIABLES
======================================== */

let currentCategory = "college";

let currentExcuse = "";

let favorites =
    JSON.parse(
        localStorage.getItem("excuseFavorites")
    ) || [];


/* ========================================
   CATEGORY SELECTION
======================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            currentCategory =
                button.dataset.category;


            categoryBadge.textContent =
                currentCategory.toUpperCase();

        }
    );

});


/* ========================================
   GENERATE EXCUSE
======================================== */

function generateExcuse() {

    const list =
        excuses[currentCategory];


    if (!list || list.length === 0) {

        excuseElement.textContent =
            "Oops! No excuses available.";

        return;
    }


    let randomIndex =
        Math.floor(
            Math.random() * list.length
        );


    /*
       Prevent the same excuse from
       appearing twice in a row.
    */

    if (
        list.length > 1 &&
        list[randomIndex] === currentExcuse
    ) {

        randomIndex =
            (randomIndex + 1) % list.length;

    }


    currentExcuse =
        list[randomIndex];


    excuseElement.textContent =
        currentExcuse;


    /* Animation */

    excuseElement.classList.remove(
        "excuse-animation"
    );


    void excuseElement.offsetWidth;


    excuseElement.classList.add(
        "excuse-animation"
    );


    /* Believability */

    const score =
        Math.floor(
            Math.random() * 41
        ) + 55;


    updateScore(score);


    /* Reset favorite button */

    updateFavoriteButton();

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

        if (!currentExcuse) {

            showToast(
                "Generate an excuse first! 😂"
            );

            return;
        }


        try {

            await navigator.clipboard.writeText(
                currentExcuse
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
   FAVORITE CURRENT EXCUSE
======================================== */

favoriteButton.addEventListener(
    "click",
    () => {

        if (!currentExcuse) {

            showToast(
                "Generate an excuse first! 😂"
            );

            return;
        }


        const existingIndex =
            favorites.findIndex(
                item =>
                    item.text === currentExcuse
            );


        /* Remove if already saved */

        if (existingIndex !== -1) {

            favorites.splice(
                existingIndex,
                1
            );


            saveFavorites();

            updateFavoriteButton();

            renderFavorites();

            showToast(
                "Removed from favorites."
            );

            return;
        }


        /* Add favorite */

        favorites.push({

            text: currentExcuse,

            category: currentCategory

        });


        saveFavorites();

        updateFavoriteButton();

        renderFavorites();

        showToast(
            "Saved to favorites! ❤️"
        );

    }
);


/* ========================================
   UPDATE FAVORITE BUTTON
======================================== */

function updateFavoriteButton() {

    const exists =
        favorites.some(
            item =>
                item.text === currentExcuse
        );


    if (exists) {

        favoriteButton.textContent =
            "♥ Saved";

        favoriteButton.classList.add(
            "favorite"
        );

    } else {

        favoriteButton.textContent =
            "♡ Favorite";

        favoriteButton.classList.remove(
            "favorite"
        );

    }

}


/* ========================================
   SAVE FAVORITES
======================================== */

function saveFavorites() {

    localStorage.setItem(
        "excuseFavorites",
        JSON.stringify(favorites)
    );

}


/* ========================================
   OPEN FAVORITES
======================================== */

favoritesBtn.addEventListener(
    "click",
    () => {

        favoritesPanel.classList.add(
            "open"
        );

        favoritesPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        renderFavorites();

    }
);


/* ========================================
   CLOSE FAVORITES
======================================== */

closeFavorites.addEventListener(
    "click",
    closeFavoritesPanel
);


function closeFavoritesPanel() {

    favoritesPanel.classList.remove(
        "open"
    );

    favoritesPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* ========================================
   DISPLAY FAVORITES
======================================== */

function renderFavorites() {

    favoriteCount.textContent =
        favorites.length;


    if (favorites.length === 0) {

        favoritesList.innerHTML = `
            <p class="empty-favorites">
                You haven't saved any excuses yet. 😭
            </p>
        `;

        return;
    }


    favoritesList.innerHTML =
        favorites
            .map(
                (item, index) => {

                    return `
                        <div class="favorite-item">

                            <div>
                                “${escapeHTML(item.text)}”
                            </div>

                            <div class="favorite-item-actions">

                                <span class="favorite-category">
                                    ${item.category.toUpperCase()}
                                </span>

                                <button
                                    class="remove-favorite"
                                    type="button"
                                    data-index="${index}"
                                >
                                    🗑 Remove
                                </button>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");


    /* Remove buttons */

    document
        .querySelectorAll(".remove-favorite")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    favorites.splice(
                        index,
                        1
                    );


                    saveFavorites();

                    renderFavorites();

                    updateFavoriteButton();

                    showToast(
                        "Removed from favorites."
                    );

                }
            );

        });

}


/* ========================================
   HTML ESCAPE
======================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ========================================
   CLEAR ALL FAVORITES
======================================== */

clearFavorites.addEventListener(
    "click",
    () => {

        if (favorites.length === 0) {

            showToast(
                "There are no favorites to clear."
            );

            return;
        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all favorites?"
            );


        if (!confirmed) {
            return;
        }


        favorites = [];


        saveFavorites();

        renderFavorites();

        updateFavoriteButton();


        showToast(
            "All favorites cleared."
        );

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
   GENERATE BUTTON
======================================== */

generateButton.addEventListener(
    "click",
    generateExcuse
);


/* ========================================
   TOAST
======================================== */

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* ========================================
   ESCAPE KEY
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            favoritesPanel.classList.contains(
                "open"
            )
        ) {

            closeFavoritesPanel();

        }

    }
);


/* ========================================
   INITIALIZE
======================================== */

renderFavorites();

generateExcuse();
