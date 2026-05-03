// Variables using gameState to tell which scene should be shown
let gameState = "INTRO";
let shipX = -200;
let dialogueIndex = 0;
let planetSpin = 0;

let bgSpace, shipImg, princessImg, sqibPlanet, sqib1, sqib2, ingredientImg;

// Array for dialogue between princess and sqibs, makes it easier to go to and from dialogue and change colour depending on whos speaking
let conversation = [
    { speaker: "Princess", text: "We're approaching the first planet." },
    { speaker: "Princess", text: "It looks quite pretty!" },
    { speaker: "Princess", text: "Oh! Those are the aliens, punctual..." },
    { speaker: "Vunu Sqib", text: "Welcome, we recieved your satellite message." },
    { speaker: "Goo Sqib", text: "We'd love to help, but what we have won't come for free." },
    { speaker: "Princess", text: "Go on..." },
    { speaker: "Vunu Sqib", text: "You see we want to try therapy, and Sqib therapy is quite expensive, so..." },
    { speaker: "Princess", text: "Are you gonna suggest I pay for it? I have £10." },
    { speaker: "Vunu Sqib", text: "*chuckles to Goo Sqib*" },
    { speaker: "Goo Sqib", text: "Well, that's not going to help anyone, dear." },
    { speaker: "Goo Sqib", text: "How about you hold a session for us?" },
    { speaker: "Princess", text: "If that's all, can't you just hand it over?" },
    { speaker: "Vunu Sqib", text: "Do you want an ingredient to make the Ozone Plant or not?"},
    { speaker: "Princess", text: "Fine, but obviously I'm not a professional." },
    { speaker: "Goo Sqib", text: "Neither are any Sqibs, which is why the expenses are questionable." },
    { speaker: "Goo Sqib", text: "Okay so, I really love eating, and eating with my Vunu-" },
    { speaker: "Goo Sqib", text: "but he hates when I eat because I'm apparently VERY loud." },
    { speaker: "Vunu Sqib", text: "DEFINETELY loud, but I also want to eat with her. " },
    { speaker: "Vunu Sqib", text: "Mind you, she says the food isn't as good if she eats it quietly." },
    { speaker: "Goo Sqib", text: "What do we do? I don't like to bother him." }


];

// Loads in images before the game starts
function preload () {
    //PNGS HERE//
    bgSpace = loadImage('assets/background.jpg');

    shipImg = loadImage('assets/spaceship.png');

    princessImg = loadImage('assets/us.png');

    sqibPlanet = loadImage('assets/sqib planet.png');

    sqib1 = loadImage('assets/sqib 1.png');

    sqib2 = loadImage('assets/sqib 2.png');

    ingredientImg = loadImage('assets/placeholder1.png');



}

function setup() {
    createCanvas(800, 600);
}

// connects the scenes together and controls their relations to one another.
// background set first to refresh past frames
function draw() {
    background(bgSpace);

if (gameState === "INTRO") {
    runIntro();
}
else if (gameState === "PRINCESS_TALK") {
    runPrincessTalk();
}
else if (gameState === "PLANET_SCENE") {
    runPlanetScene();
}
else if (gameState === "CHOICE") {
    showOptions();
}
else if (gameState === "GET_ITEM") {
    spinIngredient();
}
else if (gameState === "NEXT_PLANET") {
    travelAgain();
}
}

// Shows our choices with a button, the button doesn't have a reward system or wrong answer tho
function showOptions() {
    fill(0, 150);
    rect(0, 0, width, height);
    textAlign(CENTER);
    fill(255, 255, 0);
    textFont('Press Start 2P');
    textSize(18);
    text("BE CAREFUL WHAT YOU CHOOSE- NO PRESSURE:", width/2, 150);

    drawButton(width/2, 250, "A: Bring back the 50's");
    drawButton(width/2, 350, "B: Wear ear plugs / headphones");
    drawButton(width/2, 450, "C: Run away to the ocean at dinner time");    
}
// it's reusable to save time and energy and is eventually reset to not break other elements
function drawButton(x, y, txt) {
    fill(255);
    rectMode(CENTER);
    rect(x, y, 500, 50, 10);
    fill(0);
    textSize(12);
    text(txt, x, y + 5);
    rectMode(CORNER);
}
// the ingredient spins fast to show its exciting even tho it can't 3D spin
function spinIngredient() {
    push ();
    translate(width/2, height/2);
    rotate(planetSpin);
    imageMode (CENTER);
    image(ingredientImg, 0, 0, 100, 100);
    pop();
    planetSpin += 0.05;
    textAlign(CENTER);
    fill(255, 255, 0);
    text("INGREDIENT COLLECTED", width/2, 100);
    textSize(10);
    text("(Click to continue)", width/2, height - 50);

}

function travelAgain() {
    shipX += 3;
    image(shipImg, shipX, height/2, 150, 80);
    textAlign(CENTER);
    fill(255, 255, 0);
    textFont('Press Start 2P');
    textSize(20);
    text("TO THE NEXT PLANET...", width/2, height - 100);
}

// Scene 1 - Introduced to the Spaceship
function runIntro() {
    shipX += 3;// X makes the spaceship go to the right
    
    image(shipImg, shipX, height/2, 150, 80);

    fill(255, 255, 0);
    textAlign(CENTER);
    textFont('Press Start 2P');
    textSize(22);
    text("MISSION: RESTORE THE OZONE LAYER", width/2, height - 100);
    // changes scene once spaceship has left
    if (shipX > width) {
        gameState = "PRINCESS_TALK";
        dialogueIndex = 0;
    }
}

// Scene 2 - Princess dialogue
function runPrincessTalk() {
    
image(princessImg, 0, height - 350, 300, 350);

    // speech box
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(150, height - 150, 500, 80, 10);
     
    //name box
    fill(128, 0, 128);
    rect(150, height - 185, 120, 30, 5);

    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(18);
    text("Alien Princess", 160, height - 165);

    // dialogue text brought from array with dialogue.index
    fill(0);
    textSize(16);
    textFont('sans-serif');
    text(conversation[dialogueIndex].text, 170, height - 115, 460);
    
    //user pprompt
    fill(100);
    textSize(12);
    textAlign(RIGHT);
    text("(Click to continue)", 630, height - 85);
}
// Scene 3 - Reaching the Planet :P
// the push-pop makes it so only the planet rotates and planetSpin += 0.01 makes it consistent
function runPlanetScene() {
    push();
    translate(width / 2, height / 2);
    rotate(planetSpin);
    imageMode(CENTER);
    image(sqibPlanet, 0, 0, 300, 300);
    pop();
    planetSpin += 0.01;
    imageMode(CORNER);
    image(princessImg, 0, height - 350, 300, 350);
    image(sqib1, 500, height - 300, 150, 350);
    image(sqib2, 630, height - 300, 150, 350);

    // so the name box changes colour depending on whos talking
    let currentLine = conversation[dialogueIndex];
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(150, height - 150, 500, 80, 10);

    if (currentLine.speaker === "Princess") {
    fill(128, 0 , 128);
    }
    else if (currentLine.speaker === "Vunu Sqib") {
    fill(255, 100, 200);
    }
    else if (currentLine.speaker === "Goo Sqib") {
    fill(0, 150, 255);
    }

    rect(150, height - 185, 140, 30, 5);
    fill (255);
    noStroke();
    textAlign(LEFT);
    textSize(16);
    text(currentLine.speaker, 160, height - 165);

    fill(0);
    textFont('sans-serif');
    text(currentLine.text, 170, height - 115, 460);
}
// user input for wehn mmouse is clicked, the >=3 is so that it changes when aliens show up
function mousePressed() {
    if (gameState === "PRINCESS_TALK") {
        dialogueIndex++;
        if (dialogueIndex >= 3) {
            gameState = "PLANET_SCENE";
        }
    }

    else if (gameState === "PLANET_SCENE") {
        dialogueIndex++;
        if (dialogueIndex >= conversation.length) {
            gameState = "CHOICE";
        }
    }
     else if (gameState === "CHOICE") {
            if (mouseX > 150 && mouseX < 650) {
                if (mouseY > 225 && mouseY < 275) gameState = "GET_ITEM";
                if (mouseY > 325 && mouseY < 375) gameState = "GET_ITEM";
                if (mouseY > 425 && mouseY < 475) gameState = "GET_ITEM";
            }
        }
        else if (gameState === "GET_ITEM") {
            shipX = -200; //resets the ships position for the next planet exploration
            gameState = "NEXT_PLANET";
        }
    }