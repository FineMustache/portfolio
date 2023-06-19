var stopWrite = false;
var stopErase = false;
var nickname = "(finemustache)";
var nicknameElement = document.getElementById("nickname");
const indicators = document.querySelectorAll(".indicator")

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

window.addEventListener('mousemove', function (event) {
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
  if (index >= 15) {
    e.style.left = ((22) * (index - 15)) + 'px'
  } else if (index >= 10) {
    e.style.left = ((22) * (index - 10)) + 'px'
  } else if (index >= 5) {
    e.style.left = ((22) * (index - 5)) + 'px'
  } else {
    e.style.left = ((22) * (index)) + 'px'
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  var activeSection = localStorage.getItem("activeSection") ? localStorage.getItem("activeSection") : 1;

  indicators.forEach((i, index) => {
    i.addEventListener('click', () => {
      scrollToSection(index)
    })
  })

  function scrollToSection(sectionIndex) {
    sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem("activeSection", (Number(sectionIndex) + 1))
    document.body.setAttribute('data-current-section', (Number(sectionIndex) + 1))
    activeSection = Number(sectionIndex) + 1
    indicators.forEach(i => i.classList.remove('on'))
    indicators.item(sectionIndex).classList.add('on')
  }

  window.addEventListener("keydown", function (e) {
    if (e.code == "ArrowUp") {
      const currentSection = document.querySelector('#s' + document.body.getAttribute('data-current-section'));
      let nextSectionIndex;
      nextSectionIndex = currentSection.previousElementSibling !== document.querySelector(".inset-border-wrap") ? currentSection.previousElementSibling.dataset.index : 0;
      scrollToSection(nextSectionIndex);
    }
    if (e.code == "ArrowDown") {
      const currentSection = document.querySelector('#s' + document.body.getAttribute('data-current-section'));
      let nextSectionIndex;
      nextSectionIndex = currentSection.nextElementSibling ? currentSection.nextElementSibling.dataset.index : -1;
      if (nextSectionIndex !== -1) scrollToSection(nextSectionIndex);
    }
  }, false);

  indicators.forEach(i => i.classList.remove('on'))
  indicators.item(activeSection - 1).classList.add('on')

  document.body.setAttribute('data-current-section', activeSection)

  document.addEventListener('wheel', function (event) {

    event.preventDefault()

    const delta = event.wheelDelta || -event.detail;
    const currentSection = document.querySelector('#s' + document.body.getAttribute('data-current-section'));
    let nextSectionIndex;
    if (delta < 0) {
      nextSectionIndex = currentSection.nextElementSibling ? currentSection.nextElementSibling.dataset.index : -1;
    } else {
      nextSectionIndex = currentSection.previousElementSibling !== document.querySelector(".inset-border-wrap") ? currentSection.previousElementSibling.dataset.index : 0;
    }

    if (nextSectionIndex !== -1) scrollToSection(nextSectionIndex);
  }, { passive: false });

  sections.forEach((section, index) => {
    section.setAttribute('data-index', index);
  });

  document.querySelectorAll('.comp-i').forEach((c, index) => {
    c.addEventListener("mouseenter", () => {
      document.querySelector('.comp-info').classList.remove('hide')
      document.querySelector('.comp-info').classList.add('show')
    })
    c.addEventListener("mouseleave", () => {
      document.querySelector('.comp-info').classList.remove('show')
      document.querySelector('.comp-info').classList.add('hide')
    })
  })
});

window.addEventListener("keydown", function (e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

