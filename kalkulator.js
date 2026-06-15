/*
  Nama  : Nurul Yasilla
  NIM   : 202432100
  File  : kalkulator.js (Logika JavaScript Kalkulator Nilai)
*/

// === FUNGSI HITUNG NILAI AKHIR ===
function hitungNilaiAkhir(tugas, uts, uas) {
  return (tugas * 0.30) + (uts * 0.30) + (uas * 0.40);
}

// === FUNGSI TENTUKAN GRADE ===
function tentukanGrade(nilai) {
  if (nilai >= 80) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 60) return "C";
  if (nilai >= 50) return "D";
  return "E";
}

// === FUNGSI VALIDASI INPUT ===
function validasiInput(nilai, nama) {
  if (nilai === "" || nilai === null) {
    return "Nilai " + nama + " tidak boleh kosong.";
  }
  const angka = parseFloat(nilai);
  if (isNaN(angka)) {
    return "Nilai " + nama + " harus berupa angka.";
  }
  if (angka < 0 || angka > 100) {
    return "Nilai " + nama + " harus berada di antara 0 sampai 100.";
  }
  return null; // valid
}

// === PESAN SAMBUTAN SAAT HALAMAN DIBUKA ===
window.onload = function () {
  const pesanSambutan = document.getElementById("pesanSambutan");
  pesanSambutan.textContent =
    "✓ Halaman siap. Masukkan nilai kamu untuk memulai perhitungan.";
};

// === EVENT LISTENER TOMBOL HITUNG ===
document.getElementById("btnHitung").addEventListener("click", function () {
  const inputTugas = document.getElementById("nilaiTugas").value;
  const inputUTS   = document.getElementById("nilaiUTS").value;
  const inputUAS   = document.getElementById("nilaiUAS").value;

  // Log nilai input mentah ke console
  console.log("Input mentah => Tugas:", inputTugas, "| UTS:", inputUTS, "| UAS:", inputUAS);

  const elError   = document.getElementById("pesanError");
  const elHasil   = document.getElementById("hasilWrapper");

  // Reset tampilan
  elError.style.display  = "none";
  elHasil.style.display  = "none";
  elHasil.className      = "hasil-wrapper";

  // Validasi
  const errorTugas = validasiInput(inputTugas, "Tugas");
  const errorUTS   = validasiInput(inputUTS, "UTS");
  const errorUAS   = validasiInput(inputUAS, "UAS");

  if (errorTugas || errorUTS || errorUAS) {
    elError.textContent   = errorTugas || errorUTS || errorUAS;
    elError.style.display = "block";
    return;
  }

  // Hitung
  const tugas = parseFloat(inputTugas);
  const uts   = parseFloat(inputUTS);
  const uas   = parseFloat(inputUAS);

  const nilaiAkhir = hitungNilaiAkhir(tugas, uts, uas);
  const grade      = tentukanGrade(nilaiAkhir);

  // Log hasil akhir ke console
  console.log("Nilai Akhir:", nilaiAkhir.toFixed(2), "| Grade:", grade);

  // Tampilkan hasil
  document.getElementById("nilaiAkhirTampil").textContent = nilaiAkhir.toFixed(2);
  document.getElementById("gradeTampil").textContent      = grade;

  elHasil.classList.add("grade-" + grade);
  elHasil.style.display = "block";
});
