// Select color elements
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let color3 = document.querySelector(".color3");
// Select alert showing about no of selected colors
let minColorsAlert = document.querySelector(".min-colors");
// Select toggle/checkboxs to activate/disable colors
let toggle1 = document.querySelector("#color-1");
let toggle2 = document.querySelector("#color-2");
let toggle3 = document.querySelector("#color-3");
let randomButton = document.querySelector(".random");
let body = document.getElementById("gradient");
let code = document.querySelector(".bg-code");
let copyBtn = document.querySelector("#copy-btn");

//            ***** Setting Initial Styles & Settings *****
function setDefaultStyles() {
  toggle1.checked = toggle2.checked = toggle3.checked = true;
  minColorsAlert.style.display = "none";
  copyBtn.style.display = "none";
}

setDefaultStyles();

const generateRandNum = () => Math.floor(Math.random() * Math.floor(255)).toString(16);

//            ***** Convert RGB Colors to Hex *****
function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

//            ***** Generate Color Palette Based on User Input *****
function generateColorPalette(isRandom) {
  if (toggle1.checked && toggle2.checked && toggle3.checked) {
    if (isRandom) {
      color1.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
      color2.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
      color3.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
    }
    return `linear-gradient(to right, ${color1.value}, ${color2.value}, ${color3.value})`;
  }
  if (!toggle1.checked) {
    if (isRandom) {
      color2.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
      color3.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
    }
    return `linear-gradient(to right, ${color2.value}, ${color3.value})`;
  }
  if (!toggle2.checked) {
    if (isRandom) {
      color1.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
      color3.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
    }
    return `linear-gradient(to right, ${color1.value}, ${color3.value})`;
  }
  if (!toggle3.checked) {
    if (isRandom) {
      color1.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
      color2.value = RGBToHex(
        generateRandNum(),
        generateRandNum(),
        generateRandNum()
      );
    }
    return `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  }
}

//            ***** Set Gradient Based on User Input(default or random) *****
function setGradient(event) {
  if (
    (toggle1.checked && toggle2.checked) ||
    (toggle1.checked && toggle3.checked) ||
    (toggle2.checked && toggle3.checked)
  ) {
    if (event.target.classList.contains("random")) {
      body.style.background = generateColorPalette(true);
    } else {
      body.style.background = generateColorPalette(false);
    }
    code.textContent = body.style.background + ";";
    copyBtn.style.display = "block";
    copyBtn.textContent = "Copy";
    minColorsAlert.style.display = "none";
  } else {
    minColorsAlert.style.display = "block";
  }
}

//            ***** Able/Disable Toggle Butttons & Respective Colors *****
function ableAndDisableColorButton(event) {
  if (event.target.id === "color-1") {
    color1.disabled = !color1.disabled;
  } else if (event.target.id === "color-2") {
    color2.disabled = !color2.disabled;
  } else {
    color3.disabled = !color3.disabled;
  }
  setGradient(event);
}

//            ***** Copy Styles to Clipboard *****
function copyStyles() {
  code.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
  document.getSelection().removeAllRanges();
}

// Add event listeners to color buttons
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
color3.addEventListener("input", setGradient);

// Add event listeners to checkboxes/toggle buttons
toggle1.addEventListener("change", ableAndDisableColorButton);
toggle2.addEventListener("change", ableAndDisableColorButton);
toggle3.addEventListener("change", ableAndDisableColorButton);

randomButton.addEventListener("click", setGradient); // Add event listener to random button

copyBtn.addEventListener("click", copyStyles);