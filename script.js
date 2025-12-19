/*Filter Objects*/
const filters = {
  brightness: { value: 100, min: 0, max: 200, unit: "%" },
  contrast: { value: 100, min: 0, max: 200, unit: "%" },
  exponsure: { value: 100, min: 0, max: 200, unit: "%" },
  saturation: { value: 100, min: 0, max: 200, unit: "%" },
  hueRotate: { value: 100, min: 0, max: 360, unit: "deg" },
  blur: { value: 100, min: 0, max: 20, unit: "px" },
  grayscale: { value: 100, min: 0, max: 100, unit: "%" },
  sepia: { value: 100, min: 0, max: 100, unit: "%" },
  opacity: { value: 100, min: 0, max: 100, unit: "%" },
  invert: { value: 100, min: 0, max: 100, unit: "%" },
};

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
  p.innerHTML = name;
  div.appendChild(p);
  div.appendChild(input);

  return div;
}

/*Adding Div*/
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
