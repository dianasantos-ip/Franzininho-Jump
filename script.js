const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
count = 0;

function handleKeyUp(event){
    if (event.keyCode === 32){
        if(!isJumping){
        jump();
        }
    }
}

function jump() {
    isJumping = true;

    count = count + 10;

    let upInterval = setInterval(() => {
        if (position >= 150){
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        //subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1500;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 10000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if (cactusPosition < - 60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1> <br> <h2 class="score">Sua pontuação foi: ' + count + '</h2> <br> <a href="index.html"><button class="button">Jogue novamente!</button></a>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';    
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);