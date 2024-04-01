class Calculator {
  constructor() {}
  dapatkanHasil(str) {
    const gantiOperasi = str.replace("×", "*").replace("÷", "/");
    console.log(eval(gantiOperasi));
    return updateLayar(str.length === 1 ? str : eval(gantiOperasi));
  }
  hapusSatu(str) {
    updateLayar(str.length === 1 ? 0 : str.slice(0, -1));
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

let strEval = "";

function updateLayar(val) {
  layar.textContent = val;
}

function angkaClicked(angka) {
  layar.textContent === "0" ||
  layar.textContent === "00" ||
  layar.textContent === "."
    ? updateLayar(angka)
    : updateLayar(layar.textContent + angka);
}

function opClicked(op) {
  const charTerakhir = layar.textContent.slice(-1);
  if (
    charTerakhir == "÷" ||
    charTerakhir == "×" ||
    charTerakhir == "+" ||
    charTerakhir == "-"
  ) {
    updateLayar(layar.textContent.slice(0, -1) + op);
  } else {
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