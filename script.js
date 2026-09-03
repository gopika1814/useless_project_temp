let excuses = {

    college: [
        "My brain went on a surprise holiday.",
        "I was studying, but my textbook fell asleep first.",
        "My Wi-Fi developed trust issues.",
        "My alarm clock betrayed me.",
        "I was mentally present in class."
    ],

    late: [
        "My laptop needed emotional support.",
        "The assignment disappeared into another dimension.",
        "My internet decided to take a vacation.",
        "I finished the assignment, but my computer disagreed.",
        "My keyboard went on strike."
    ],

    skip: [
        "My bed refused to release me.",
        "I was waiting for the perfect moment to attend class.",
        "My legs voted against going to college.",
        "I accidentally entered a five-hour nap.",
        "My motivation couldn't find the classroom."
    ],

    random: [
        "A pigeon distracted me for 45 minutes.",
        "My Wi-Fi developed trust issues.",
        "My pen stopped cooperating with me.",
        "I was busy having an existential crisis.",
        "My brain needed a software update."
    ]
};


function generateExcuse() {

    let category = document.getElementById("category").value;

    let list = excuses[category];

    let randomNumber = Math.floor(Math.random() * list.length);

    document.getElementById("excuse").innerText =
        "😂 " + list[randomNumber];
}