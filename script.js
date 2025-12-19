/*Filter Objects*/
let filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  saturate: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotate: { value: 0, min: 0, max: 360, unit: "deg" },
  blur: { value: 0, min: 0, max: 20, unit: "px" },
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: { value: 0, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 0, min: 0, max: 100, unit: "%" },
};

/**CANVAS */
const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

/*Filter element*/
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

/*Adding Div*/
function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );
    filtersContainer.appendChild(filterElement);
  });
}
createFilters();

imgInput.addEventListener("change", function (event) {
  file = event.target.files[0];
  const imagePlaceHolder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceHolder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file); // Insert a image

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  if (!image) return;
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturate.value}${filters.saturate.unit})
  hue-Rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `.trim();

  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {
  filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturate: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotate: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
  };
  applyFilters();
  filtersContainer.innerHTML = "";
  createFilters();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

/*Presets*/
const presets = {
  Normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Drama: {
    brightness: 110,
    contrast: 160,
    saturate: 140,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  Vintage: {
    brightness: 105,
    contrast: 90,
    saturate: 80,
    hueRotate: 0,
    blur: 1,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  OldSchool: {
    brightness: 95,
    contrast: 110,
    saturate: 70,
    hueRotate: 0,
    blur: 1,
    grayscale: 30,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  BlackAndWhite: {
    brightness: 100,
    contrast: 130,
    saturate: 0,
    hueRotate: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Cinematic: {
    brightness: 95,
    contrast: 150,
    saturate: 120,
    hueRotate: -10,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  Faded: {
    brightness: 110,
    contrast: 80,
    saturate: 85,
    hueRotate: 0,
    blur: 0,
    grayscale: 10,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  CoolTone: {
    brightness: 100,
    contrast: 110,
    saturate: 110,
    hueRotate: -20,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  WarmTone: {
    brightness: 105,
    contrast: 110,
    saturate: 120,
    hueRotate: 15,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  Retro: {
    brightness: 100,
    contrast: 120,
    saturate: 75,
    hueRotate: 5,
    blur: 1,
    grayscale: 20,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((preseName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("btn");
  presetButton.innerText = preseName;
  presetsContainer.appendChild(presetButton);

  presetButton.addEventListener("click", () => {
    const preset = presets[preseName];

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
