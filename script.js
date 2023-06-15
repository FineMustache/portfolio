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
    console.log("addSpan")
      nicknameElement.innerHTML += "<span>" + letra + "</span>";
    } else {
      nicknameElement.innerHTML += letra;
    }
    console.log(nicknameElement.innerHTML)
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
