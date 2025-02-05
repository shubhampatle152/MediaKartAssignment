
// Element Selector

const gameContainer = document.getElementById('game-container');
const BoxContainer = document.getElementById('Box-container');
const playButton = document.getElementById('play-button');
const counter = document.getElementById('counter');
const congratsScreen = document.getElementById('congrats-screen');
const Restartscreen = document.getElementById('Restart-screen');


// initial value of chocolate count
let chocolatesCollected = 0;
let gameInterval;


// EventListener For starting Game

playButton.addEventListener('click', () => {
    chocolatesCollected = 0;
    counter.textContent = '0';
    playButton.style.display = 'none';
    gameContainer.style.display = 'block';
    counter.style.display = 'block';
    startGame();
});



// Game controls Event handler for moving bucket horizontally

function moveBox(x) {
    const containerRect = gameContainer.getBoundingClientRect();
    const BoxWidth = BoxContainer.offsetWidth; // Box width
    let newLeft = x - containerRect.left - BoxWidth / 2; // Box center

    // Left boundary check
    if (newLeft < 0) {
        newLeft = 0; //  Box left boundary
    }

    // Right boundary check
    if (newLeft > containerRect.width - BoxWidth) {
        newLeft = containerRect.width - BoxWidth; // Box right boundary
    }

    BoxContainer.style.left = `${newLeft}px`; // Update Box position
}


// Mouse move to control Box
gameContainer.addEventListener('mousedown', (e) => {
    moveBox(e.clientX);
    const moveListener = (event) => moveBox(event.clientX);
    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveListener);
    });
});



// Touch move to control Box
gameContainer.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    moveBox(touch.clientX);
});


gameContainer.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveBox(touch.clientX);
});









// Function For Starting Game after 1s time interval
function startGame() {
    gameInterval = setInterval(() => {
        const chocolate = createChocolate();
        gameContainer.appendChild(chocolate);
        animateChocolate(chocolate);
    }, 1000);
}




// Function For Creating chocolates 

function createChocolate() {
const chocolate = document.createElement('img');
chocolate.classList.add('chocolate');
chocolate.src ='assets/chocolate.png'; // Path of  chocolate image
chocolate.alt = 'chocolate';
chocolate.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
chocolate.style.top = '0px';
chocolate.style.width = '30px'; 
chocolate.style.height = '20px'; 
chocolate.style.position = 'absolute';
return chocolate; //  return new chocolate image 
}


// Animation On chocolates to moving from top to bottom 

function animateChocolate(chocolate) {
    let chocolateTop = 0;


    // setInterval For falling chocolates on some interval time here 20ms

    const fallInterval = setInterval(() => {
        chocolateTop += 5;
        chocolate.style.top = `${chocolateTop}px`;

        if (isCenterColliding(chocolate, BoxContainer)) {
            chocolatesCollected++;
            counter.textContent = ` Score: ${chocolatesCollected}`;
            appendChocolateToBox(); 
            chocolate.remove();
            clearInterval(fallInterval);
            if (chocolatesCollected === 5) {
                clearInterval(gameInterval);
                showCongratsScreen();
            }
        }

        if (chocolateTop > gameContainer.offsetHeight) {
            chocolate.remove();
            clearInterval(fallInterval);
        }
    }, 20);
}


// Append Chocolate To Box function to showcase chocolates inside the Box

function appendChocolateToBox() {
     // Create a new chocolate for stacking
        const BoxChocolate = document.createElement('img');
        BoxChocolate.src ='assets/chocolate.png';//chocolate image
        BoxChocolate.alt = 'chocolate';
        BoxChocolate.style.width = '30px';
        BoxChocolate.style.height = '20px'; 
        BoxChocolate.style.position = 'absolute'; 
    
        // Randomize position and rotation for natural stacking using Math.random function 
        const chocolatesInBox = BoxContainer.querySelectorAll('.stacked-chocolate').length;
        const chocolateBottom = chocolatesInBox * 15 + Math.random() * 10; 
        const chocolateLeft = 20 + Math.random() * 60; 
        const chocolateRotation = Math.random() * 40 - 20;
    
        BoxChocolate.style.bottom = `${chocolateBottom}px`; 
        BoxChocolate.style.left = `${chocolateLeft}%`; // Random horizontal position within the Box
        BoxChocolate.style.transform = `translateX(-50%) rotate(${chocolateRotation}deg)`; // Center and rotate
    
        BoxChocolate.classList.add('stacked-chocolate'); // Adding class
    
        // Appending the chocolate image to the Box-container
        BoxContainer.appendChild(BoxChocolate);
    }


 
    // isCenterColliding Function to check the box should not go OutTo Game Container and chocolate from the box
function isCenterColliding(chocolate, Box) {
const chocolateRect = chocolate.getBoundingClientRect();
const BoxRect = Box.getBoundingClientRect();

// Calculate the horizontal center of the Box
const BoxCenterX = BoxRect.left + BoxRect.width / 2;

const centerRange = BoxRect.width * 0.2; 
const BoxCenterLeft = BoxCenterX - centerRange / 2;
const BoxCenterRight = BoxCenterX + centerRange / 2;

// Calculate the chocolate is horizontal center
const chocolateCenterX = chocolateRect.left + chocolateRect.width / 2;

const isWithinCenterRange =
chocolateCenterX > BoxCenterLeft && chocolateCenterX < BoxCenterRight;

// Check if the chocolate is vertically passing through the top of the Box
const isPassingThroughBox = chocolateRect.bottom >= BoxRect.top;

return isWithinCenterRange && isPassingThroughBox;
}


// Congratulation Screen For Aftwr wining Game With  confetti
function showCongratsScreen() {
            gameContainer.style.display = 'none';
            congratsScreen.style.display = 'flex'; 
            var colors = ['#bb0000', '#ffffff'];
            confetti(
                {
                    particleCount: 300,
                    spread: 70, 
                    spread: 55,
                    colors: colors
                }
            );        
                
            setTimeout(() => {
                congratsScreen.style.display = 'none';
            //    Restartscreen And button for restarting the game 
                Restartscreen.style.display = 'flex';
          
            }, 3000); 
        }


        let reStart =    document.getElementById('re-Start');
        reStart.addEventListener('click' ,()=> {
            location.reload();
})