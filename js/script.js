const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0
let contador = 0
const placar = document.querySelector('.contador')

//Função para identificar a tecla espaço e iniciar
// a funcção de pular
function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump()
        }
    }else {
        handleClick()
    }
}

//caso o usuario for mobile, terá a opção de jogar
//por click
function handleClick () {
    if(!isJumping) {
        jump()
    }
}

function jump() {
    isJumping = true

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval)

            //descer
            let dowInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(dowInterval)
                    isJumping = false
                }else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 20) 
        }else {
            //subindo
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

function creatCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {

        if(cactusPosition < -60) {
            clearInterval(leftInterval)
            background.removeChild(cactus)
            contador++
            placar.innerHTML = `Points: ${contador}`
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //gamer over
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class = "gamer-over" >Fim de Jogo</h1>'
        }else {
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 20)

    setTimeout(creatCactus, randomTime)
}

creatCactus()

document.addEventListener('click', handleKeyUp)
document.addEventListener('keyup', handleKeyUp)
