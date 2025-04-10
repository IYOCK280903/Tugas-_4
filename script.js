let namaGlobal = '';
let jumlahGlobal = 0;
let teksPilihan = [];

function step1() {
  const nama = document.getElementById('nama').value.trim();
  const jumlah = parseInt(document.getElementById('jumlahPilihan').value);

  document.getElementById('error-nama').innerText = nama ? '' : 'Nama wajib diisi';
  document.getElementById('error-jumlah').innerText = (jumlah > 0 && !isNaN(jumlah)) ? '' : 'Jumlah pilihan harus berupa angka lebih dari 0';

  if (nama && jumlah > 0 && !isNaN(jumlah)) {
    namaGlobal = nama;
    jumlahGlobal = jumlah;
    let pilihanForm = '';
    for (let i = 1; i <= jumlah; i++) {
      pilihanForm += `<label>Pilihan ${i}:</label><input type="text" id="pilihan${i}">`;
    }
    pilihanForm += '<button onclick="step2()">OK</button>';
    document.getElementById('pilihan-container').innerHTML = pilihanForm;
    document.getElementById('radio-container').innerHTML = '';
    document.getElementById('result').innerText = '';
  }
}

function step2() {
  teksPilihan = [];
  let errorFound = false;
  for (let i = 1; i <= jumlahGlobal; i++) {
    const val = document.getElementById(`pilihan${i}`).value.trim();
    if (!val) {
      errorFound = true;
      alert(`Pilihan ${i} tidak boleh kosong`);
      break;
    }
    teksPilihan.push(val);
  }
  if (!errorFound) {
    let radioForm = '<label>Pilihan :</label>';
    teksPilihan.forEach((pil) => {
      radioForm += `<div><input type="radio" name="hasilPilihan" value="${pil}"> ${pil}</div>`;
    });
    radioForm += '<button onclick="step3()">OK</button>';
    radioForm += '<h4>Atau dalam bentuk dropdown:</h4>';
    radioForm += '<select id="dropdown">';
    teksPilihan.forEach(pil => {
      radioForm += `<option value="${pil}">${pil}</option>`;
    });
    radioForm += '</select>';
    radioForm += '<button onclick="step3Dropdown()">OK</button>';

    document.getElementById('radio-container').innerHTML = radioForm;
    document.getElementById('result').innerText = '';
  }
}

function step3() {
  const selected = document.querySelector('input[name="hasilPilihan"]:checked');
  if (selected) {
    document.getElementById('result').innerText = `Hallo, nama saya ${namaGlobal}, saya mempunyai sejumlah ${jumlahGlobal} pilihan yaitu ${teksPilihan.join(", ")}, dan saya memilih ${selected.value}.`;
  } else {
    alert('Silakan pilih salah satu opsi!');
  }
}

function step3Dropdown() {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    const selected = dropdown.value;
    document.getElementById('result').innerText = `Hallo, nama saya ${namaGlobal}, saya mempunyai sejumlah ${jumlahGlobal} pilihan yaitu ${teksPilihan.join(", ")}, dan saya memilih ${selected}.`;
  } else {
    alert('Dropdown tidak ditemukan!');
  }
}