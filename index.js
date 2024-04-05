class Calculator {
  constructor() {}
  dapatkanHasil(str) {
    const gantiOperasi = str
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replaceAll(",", "");
    updateLayar(
      str.length === 1
        ? str
        : eval(gantiOperasi) === Infinity || eval(gantiOperasi) === -Infinity
        ? "Tidak bisa dibagi 0!"
        : eval(gantiOperasi).toLocaleString()
    );
  }
  hapusSatu(str) {
    updateLayar(
      str.length === 1 || str === "Tidak bisa dibagi 0!" ? 0 : str.slice(0, -1)
    );
  }
  hapusSemua() {
    updateLayar(0);
  }
}

const calc = new Calculator();
const layar = document.getElementById("tampilanInput");
const btnAngka = document.querySelectorAll(".angka");
const btnOp = document.querySelectorAll(".op");
const btnHasil = document.getElementById("hasil");
const btnHapusSatu = document.getElementById("hapus");
const btnHapusSemua = document.getElementById("CA");

let titik = false;

function updateLayar(val) {
  layar.textContent = val;
}

function angkaClicked(angka) {
  if (
    layar.textContent === "0" ||
    layar.textContent === "Tidak bisa dibagi 0!"
  ) {
    updateLayar(angka);
  } else if (angka === ".") {
    const layarText = layar.textContent;
    if (layarText.charAt(layarText.length - 1) !== "." && !titik) {
      updateLayar(layarText + angka);
      titik = true;
    }
  } else {
    updateLayar(layar.textContent + angka);
  }
}

function opClicked(op) {
  const charTerakhir = layar.textContent.slice(-1);
  if (layar.textContent === "Tidak bisa dibagi 0!") updateLayar(0 + op);
  if (
    charTerakhir == "÷" ||
    charTerakhir == "×" ||
    charTerakhir == "+" ||
    charTerakhir == "-"
  ) {
    updateLayar(layar.textContent.slice(0, -1) + op);
  } else if (titik) {
    if (titik && charTerakhir !== ".") {
      titik = false;
      updateLayar(layar.textContent + op);
    }
  } else if (!titik && charTerakhir !== ".") {
    updateLayar(layar.textContent + op);
  }
}

btnAngka.forEach((a) => {
  a.onclick = () => angkaClicked(a.textContent);
});

btnOp.forEach((op) => {
  op.onclick = () => opClicked(op.textContent);
});

btnHasil.onclick = () => calc.dapatkanHasil(layar.textContent);
btnHapusSatu.onclick = () => calc.hapusSatu(layar.textContent);
btnHapusSemua.onclick = () => calc.hapusSemua();
