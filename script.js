function animasiLoad() {
  const loaderDiv = document.createElement('div');
  loaderDiv.className = 'loader-div';
  const loader = document.createElement('div');
  loader.className = 'loader';
  const pLoader = document.createElement('p');
  pLoader.innerText = 'Loading...';
  const formInput = document.querySelector('#inputBuku');
  const buttonSubmitLoad = document.querySelector('#submitBukuToRak');

  loaderDiv.appendChild(loader);
  loaderDiv.appendChild(pLoader);
  formInput.appendChild(loaderDiv);
  formInput.appendChild(buttonSubmitLoad);

  setTimeout(() => {
    buttonSubmitLoad.style.fontSize = '15px';
    buttonSubmitLoad.style.color = 'white';
    loader.className = '';
    pLoader.innerText = '';
  }, 800);
}
let dataBuku = [];
function tambahBuku(e) {
  e.preventDefault();
  const inputjudul = document.querySelector('#inputJudulBuku').value;
  const inputPenulis = document.querySelector('#inputPenulisBuku').value;
  const inputTahun = document.querySelector('#inputTahunTerbit').value;
  const inputIsComplete = document.querySelector('#inputIsComplete').checked;
  const bukuObject = {
    id: +new Date(),
    judul: inputjudul,
    penulis: inputPenulis,
    tahun: inputTahun,
    isComplete: inputIsComplete,
  };
  animasiLoad();
  setTimeout(() => {
    console.log(bukuObject);
    dataBuku.push(bukuObject);
    document.dispatchEvent(new Event('UPDATE_BUKU'));
  }, 800);
}

function tampilBuku() {
  const belumSelesaiDibaca = document.querySelector('#belumSelesaiDibaca');
  const sudahSelesaiDibaca = document.querySelector('#sudahSelesaiDibaca');
  belumSelesaiDibaca.innerHTML = '';
  sudahSelesaiDibaca.innerHTML = '';

  for (const db of dataBuku) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'book-item';

    const judulBuku = document.createElement('h3');
    judulBuku.innerText = db.judul;

    const penulisBuku = document.createElement('p');
    penulisBuku.innerText = 'Penulis: ' + db.penulis;

    const tahunTerbit = document.createElement('p');

    if (((tahunTerbit.innerText = 'Tahun: ' + db.tahun), articleDiv.appendChild(judulBuku), articleDiv.appendChild(penulisBuku), articleDiv.appendChild(tahunTerbit), db.isComplete)) {
      const aksiDiv = document.createElement('div');
      aksiDiv.className = 'aksi';

      const buttonToBelum = document.createElement('button');
      buttonToBelum.id = db.id;
      buttonToBelum.innerText = 'Belum Selesai dibaca';
      buttonToBelum.className = 'green';
      buttonToBelum.addEventListener('click', pindahToSudah);

      const hapusBuku = document.createElement('button');
      hapusBuku.id = db.id;
      hapusBuku.innerText = 'Hapus buku';
      hapusBuku.className = 'red';
      hapusBuku.addEventListener('click', menghapusBuku);

      aksiDiv.appendChild(buttonToBelum);
      aksiDiv.appendChild(hapusBuku);

      articleDiv.appendChild(aksiDiv);
      sudahSelesaiDibaca.appendChild(articleDiv);
    } else {
      const divAksi = document.createElement('div');
      divAksi.className = 'aksi';

      const buttonToSudah = document.createElement('button');
      buttonToSudah.id = db.id;
      buttonToSudah.innerText = 'Sudah Selesai dibaca';
      buttonToSudah.className = 'green';
      buttonToSudah.addEventListener('click', pindahToBelum);

      const hapusBuku = document.createElement('button');
      hapusBuku.id = db.id;
      hapusBuku.innerText = 'Hapus buku';
      hapusBuku.className = 'red';
      hapusBuku.addEventListener('click', menghapusBuku);

      divAksi.appendChild(buttonToSudah);
      divAksi.appendChild(hapusBuku);

      articleDiv.appendChild(divAksi);
      belumSelesaiDibaca.appendChild(articleDiv);
    }
  }
}

function pindahToSudah(e) {
  const numberID = Number(e.target.id);
  const mencariID = dataBuku.findIndex(function (e) {
    return e.id === numberID;
  });
  -1 !== mencariID && (dataBuku[mencariID] = { ...dataBuku[mencariID], isComplete: !1 });

  animasiLoad();
  setTimeout(() => {
    document.dispatchEvent(new Event('UPDATE_BUKU'));
  }, 800);
}

function pindahToBelum(e) {
  const numberID = Number(e.target.id);
  const mencariID = dataBuku.findIndex(function (e) {
    return e.id === numberID;
  });
  -1 !== mencariID && (dataBuku[mencariID] = { ...dataBuku[mencariID], isComplete: !0 });
  animasiLoad();
  setTimeout(() => {
    document.dispatchEvent(new Event('UPDATE_BUKU'));
  }, 800);
}

function menghapusBuku(e) {
  const numberID = Number(e.target.id);
  const mencariID = dataBuku.findIndex(function (e) {
    return e.id === numberID;
  });
  const konfirmasi = confirm('Yakin menghapus buku ini?');
  if (konfirmasi == true) {
    -1 !== mencariID && dataBuku.splice(mencariID, 1);
  }
  animasiLoad();
  setTimeout(() => {
    document.dispatchEvent(new Event('UPDATE_BUKU'));
  }, 800);
}

function lokalStorageSet() {
  !(function (e) {
    localStorage.setItem('bukuItem', JSON.stringify(e));
  })(dataBuku);
  tampilBuku(dataBuku);
}
window.addEventListener('load', function () {
  dataBuku = JSON.parse(localStorage.getItem('bukuItem')) || [];
  tampilBuku();
  const submitBukuLoad = document.querySelector('#submitBukuToRak');
  submitBukuLoad.addEventListener('submit', animasiLoad);
  const inputBuku = document.querySelector('#inputBuku');
  inputBuku.addEventListener('submit', tambahBuku);
  document.addEventListener('UPDATE_BUKU', lokalStorageSet);
});
