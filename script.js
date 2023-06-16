var stopWrite = false;
var stopErase = false;
var nickname = "(finemustache)";
var nicknameElement = document.getElementById("nickname");

function startTyping() {
  stopErase = true;
  stopWrite = false;
  nicknameElement.classList.add("typing");
  nicknameElement.innerHTML = "";
  writeNickname(0);
}

function startErasing() {
  stopWrite = true;
  stopErase = false;
  eraseNickname();
}

async function writeNickname(index) {
  if (stopWrite) return;

  if (index < nickname.length) {
    await sleep(50);
    const letra = nickname[index];
    if (index === 0 || index === nickname.length - 1) { // Corrigido: índice 1 para a primeira letra
      nicknameElement.innerHTML += "<span>" + letra + "</span>";
    } else {
      nicknameElement.innerHTML += letra;
    }
    writeNickname(index + 1);
  } else {
    nicknameElement.classList.remove("typing")
  }
}

async function eraseNickname() {
  if (stopErase) return;
    await sleep(50)
  nicknameElement.innerHTML = ""
  nicknameElement.classList.add('pulse')

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('mousemove', function(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  document.querySelector('.c-line').style.top = (mouseY / this.window.innerHeight * 100 / 3) + "%"
  document.querySelector('.c-line').style.left = (mouseX / this.window.innerWidth * 100 / 3) + "%"
  document.querySelector('.c-solid').style.top = (mouseY / this.window.innerHeight * 100 / 8 - 10) + "%"
  document.querySelector('.c-solid').style.left = (mouseX / this.window.innerWidth * 100 / 8 - 10) + "%"
});

document.querySelectorAll('.sq').forEach((e, index) => {
  e.style.width = (22 / Math.sqrt(2)) + 'px'
  e.style.height = (22 / Math.sqrt(2)) + 'px'
  if(index >= 15){
    e.style.left = ((22) * (index - 15)) + 'px'
  } else if(index >= 10){
    e.style.left = ((22) * (index - 10)) + 'px'
  } else if (index >= 5) {
    e.style.left = ((22) * (index - 5)) + 'px'
  } else {
    e.style.left = ((22) * (index)) + 'px'
  }
})