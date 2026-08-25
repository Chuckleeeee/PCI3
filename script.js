// Automatically update the copyright year
document.getElementById("year").textContent = new Date().getFullYear();


// Small reveal animation when the page loads
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

const decryptButton = document.getElementById("decrypt-button");
const alienLog = document.getElementById("alien-log");
const translationStatus = document.getElementById("translation-status");

//const titleWord1 = document.getElementById("title-word-1");
//const titleWord2 = document.getElementById("title-word-2");


/* --------------------------------------------------
   ALIEN LANGUAGE
-------------------------------------------------- */

const alienCharacters = [
    "ᚦ",
    "ᛝ",
    "ϟ",
    "⟡",
    "⟁",
    "⌬",
    "⋈",
    "⧖",
    "ᚱ",
    "ᛉ",
    "⊹",
    "◈",
    "◉",
    "◌",
    "⧫"
];


function randomAlienCharacter() {

    return alienCharacters[
        Math.floor(
            Math.random() * alienCharacters.length
        )
    ];

}


function generateAlienWord(length) {

    let word = "";

    for (let i = 0; i < length; i++) {
        word += randomAlienCharacter();
    }

    return word;

}


/* --------------------------------------------------
   DOCUMENT STRUCTURE

   null = remains alien

   Any text = eventually decrypts into that word
-------------------------------------------------- */

const documentLines = [

    [
        "DOCTOR",
        null,
        null,
        null,
        null,
        null
    ],

    [
        null,
        "HARVESTER",
        null,
        "SECURITY",
        null
    ],

    [],

    [
        null,
        "GENERALS",
        null,
        null,
        null,
        null
    ],

    [
        null,
        "BIOLOGICAL",
        null,
        null,
        null,
        "KEYS"
    ],

    [
        null,
        null,
        null,
        "UNLOCK",
        null,
        null
    ],

    [],

    [
        null,
        "DANGER",
        null
    ]

];


/* --------------------------------------------------
   CREATE DOCUMENT
-------------------------------------------------- */

let tokens = [];


function createDocument() {

    alienLog.innerHTML = "";

    documentLines.forEach((line, lineIndex) => {

        const lineElement =
            document.createElement("div");

        lineElement.classList.add("alien-line");


        /* Blank line */

        if (line.length === 0) {

            alienLog.appendChild(lineElement);
            return;

        }


        line.forEach((translation, tokenIndex) => {

            const token =
                document.createElement("span");

            token.classList.add("alien-token");


            const length = translation
                ? translation.length
                : Math.floor(
                    Math.random() * 4
                ) + 3;


            token.dataset.final =
                translation || "";


            token.dataset.length =
                length;


            token.textContent =
                generateAlienWord(length);


            lineElement.appendChild(token);


            /* Space between tokens */

            if (
                tokenIndex <
                line.length - 1
            ) {

                lineElement.appendChild(
                    document.createTextNode(" ")
                );

            }


            tokens.push({
                element: token,
                translation: translation,
                locked: false
            });

        });


        alienLog.appendChild(lineElement);

    });

}

createDocument();

/* --------------------------------------------------
   SCRAMBLE ALL UNLOCKED TOKENS
-------------------------------------------------- */

function scrambleTokens() {

    tokens.forEach(token => {

        if (!token.locked) {

            const length =
                Number(
                    token.element.dataset.length
                );

            token.element.textContent =
                generateAlienWord(length);

        }

    });

}


/* --------------------------------------------------
   TITLE SCRAMBLE
-------------------------------------------------- */

/*function scrambleTitle() {

    titleWord1.textContent =
        generateAlienWord(5);

    titleWord2.textContent =
        generateAlienWord(6);

}*/


/* --------------------------------------------------
   DECRYPTION ORDER
-------------------------------------------------- */

const decryptionOrder = [

    "HARVESTER",
    "SECURITY",
    "GENERALS",
    "KEYS",
    "BIOLOGICAL",
    "UNLOCK",
    "DANGER",
    "DOCTOR",

];


function findToken(word) {

    return tokens.find(token =>
        token.translation === word &&
        !token.locked
    );

}


/* --------------------------------------------------
   START DECRYPTION
-------------------------------------------------- */

decryptButton.addEventListener(
    "click",
    startDecryption
);


function startDecryption() {

    decryptButton.disabled = true;

    decryptButton.textContent =
        "DECRYPTING...";


    translationStatus.textContent =
        "ATTEMPTING TRANSLATION";


    /* Rapid scrambling */

    const scrambleInterval =
        setInterval(() => {

            scrambleTokens();
            //scrambleTitle();

        }, 65);


    let currentWord = 0;


    /* First recovered word after a short delay */

    setTimeout(() => {

        const revealInterval =
            setInterval(() => {

                if (
                    currentWord >=
                    decryptionOrder.length
                ) {

                    clearInterval(
                        revealInterval
                    );

                    clearInterval(
                        scrambleInterval
                    );


                    finishDecryption();

                    return;

                }


                const word =
                    decryptionOrder[
                        currentWord
                    ];


                const token =
                    findToken(word);


                if (token) {

                    token.locked = true;

                    token.element.textContent =
                        word;

                    token.element.classList.add(
                        "recovered",
                        "locking"
                    );

                }


                currentWord++;

            }, 850);

    }, 800);

}


/* --------------------------------------------------
   FINAL STATE
-------------------------------------------------- */

function finishDecryption() {

    /* Stop title scrambling */

    /*titleWord1.textContent =
        "RECOVERED";

    titleWord2.textContent =
        "DRIVES";*/


    /* One final scramble for alien text */

    tokens.forEach(token => {

        if (!token.locked) {

            const length =
                Number(
                    token.element.dataset.length
                );

            token.element.textContent =
                generateAlienWord(length);

        }

    });


    translationStatus.innerHTML = `
        PARTIAL TRANSLATION RECOVERED<br>
        SEMANTIC CONFIDENCE: LOW
    `;


    decryptButton.textContent =
        "DECRYPTION COMPLETE";

}