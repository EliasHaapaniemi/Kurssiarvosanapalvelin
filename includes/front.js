async function sendData() {
  const formData = new URLSearchParams();
  const formArvosanat = document.querySelector("#kurssiarvosanat").value;
  formData.append("kurssiarvosanat", formArvosanat)

  try {
    const response = await fetch("http://localhost:3000/lataa", {
      method: "POST",
      body: formData,
    });
    // TODO: kirjoita vastaus html:ään ja tyhjennä lomake
    
  const data = await response.json();
  if(data.viesti === "ok"){
    document.querySelector("#lataustulos").textContent = "Kurssiarvosanat lisätty";
  }
  else{
    document.querySelector("#lataustulos").textContent = "Virhe lisätessä";
  }
  document.querySelector("#kurssiarvosanat").value = "";

  } catch (e) {
    // TODO: kirjoita vastaus html:ään
    console.error(e);
    document.querySelector("#lataustulos").textContent = "Virhe lisätessä";
  }
}

async function search() {
  const formData = new URLSearchParams();
  const formKurssi = document.querySelector("#kurssi").value;
  const formOpiskelija = document.querySelector("#opiskelija").value;
  formData.append("kurssi", formKurssi);
  formData.append("opiskelija", formOpiskelija);

  try {
    const response = await fetch("http://localhost:3000/hae", {
      method: "POST",
      body: formData,
    });
    // TODO: laita vastaus hakutulos-elementtiin
    // TODO: huomaa tyhjä vastaus
    const data =await response.json();
    document.querySelector("#hakutulos").innerHTML = "";

    if(data.length===0){
      document.querySelector("#hakutulos").textContent = "Virhe haussa";
    }
    else{
      data.forEach(arvosana => {
        document.querySelector("#hakutulos").innerHTML += `<p> ${arvosana.kurssi} ${arvosana.opiskelija} ${arvosana.arvosana}</p>`;
      });
    }
    
  } catch (e) {
    // TODO: laita virheilmoitus html:ään
    console.error(e);
    document.querySelector("#hakutulos").textContent = "Virhe";
  }
}

// Take over form submissions
document.querySelector("#lisaa").addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

document.querySelector('#haku').addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});