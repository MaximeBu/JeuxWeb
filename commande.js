// gauche, droite, haut, bas
const keysPressed = [false, false, false, false]
window.onkeydown = keyDownHandler
window.onkeyup = keyUpHandler
const auto = document.getElementById('auto')
const page = document.getElementById('track')

function keyDownHandler (e) {
  switch (e.key) {
    case 'ArrowUp':
      keysPressed[2] = true
      break
    case 'ArrowDown':
      keysPressed[3] = true
      break
    case 'ArrowLeft':
      keysPressed[0] = true
      break
    case 'ArrowRight':
      keysPressed[1] = true
      break
    default:
      console.log('Touche non reconnu')
  }
}

function keyUpHandler (e) {
  switch (e.key) {
    case 'ArrowUp':
      keysPressed[2] = false
      break
    case 'ArrowDown':
      keysPressed[3] = false
      break
    case 'ArrowLeft':
      keysPressed[0] = false
      break
    case 'ArrowRight':
      keysPressed[1] = false
      break
    default:
      console.log('Touche non reconnu')
  }
}

let left = 0
let haut = 0
const speed = 3

function updateKeys () {
  console.log(getComputedStyle(page).margin, getComputedStyle(auto).margin)
  if (
    getComputedStyle(page).x < getComputedStyle(auto).x + getComputedStyle(auto).width &&
    getComputedStyle(page).x + getComputedStyle(page).width > getComputedStyle(auto).x &&
    getComputedStyle(page).y < getComputedStyle(auto).y + getComputedStyle(auto).height &&
    getComputedStyle(page).height + getComputedStyle(page).y > getComputedStyle(auto).y
  ) {
    console.log('Collision')
  } else {
    let nbrTouches = 0
    for (let i = 0; i < keysPressed.length; i++) {
      if (keysPressed[i] === true) {
        nbrTouches++
      }
    }
    if (nbrTouches === 2) {
      if (keysPressed[0] && keysPressed[2]) {
        left -= speed
        haut -= speed
        auto.style.transform = 'rotate(45deg)'
      }
      if (keysPressed[0] && keysPressed[3]) {
        left -= speed
        haut += speed
        auto.style.transform = 'rotate(315deg)'
      }
      if (keysPressed[1] && keysPressed[2]) {
        left += speed
        haut -= speed
        auto.style.transform = 'rotate(135deg)'
      }
      if (keysPressed[1] && keysPressed[3]) {
        left += speed
        haut += speed
        auto.style.transform = 'rotate(225deg)'
      }
    } else if (nbrTouches === 1) {
      if (keysPressed[0]) {
        left -= speed
        auto.style.transform = 'rotate(0deg)'
      }
      if (keysPressed[1]) {
        left += speed
        auto.style.transform = 'rotate(180deg)'
      }
      if (keysPressed[2]) {
        haut -= speed
        auto.style.transform = 'rotate(90deg)'
      }
      if (keysPressed[3]) {
        haut += speed
        auto.style.transform = 'rotate(270deg)'
      }
    }
  }

  auto.style.left = left + 'px'
  auto.style.top = haut + 'px'
}

setInterval(updateKeys, 1)
