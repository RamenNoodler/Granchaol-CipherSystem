alert("script loaded");

function encrypt() {

  const text = document.getElementById("input").value
    .toLowerCase()
    .trim();

  const mode = document.getElementById("mode").value;

  const words = text.split(/\s+/);

  let results = [];

  words.forEach(word => {

    const index = WORD_LIST.indexOf(word);

    if (index === -1) {
      results.push(word + " (not in dictionary)");
      return;
    }

    const value = index + 1;

    if (mode === "basic") {
      results.push(...generateBasic(value));
    }

    if (mode === "advanced") {
      results.push(...generateAdvanced(value));
    }

    if (mode === "ultra") {
      results.push(...generateUltra(value));
    }

  });

  results.sort((a, b) => a.length - b.length);

  document.getElementById("output").textContent = results.join("\n");
}

function generateBasic(value) {
  return ["W" + value];
}

function generateAdvanced(value) {

  if (value <= 1) return ["W" + value];

  let forms = [];

  for (let i = 1; i < value; i++) {
    forms.push("W" + i + "h" + (value - i));
  }

  return forms;
}

function generateUltra(value) {

  if (value <= 2) return ["W" + value];

  let forms = [];

  for (let a = 1; a < value - 1; a++) {
    for (let b = 1; b < value - a; b++) {

      const c = value - a - b;

      forms.push("W" + a + "h" + b + "m" + c + "l");
    }
  }

  return forms;
}
