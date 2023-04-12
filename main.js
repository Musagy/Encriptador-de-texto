import { encrypt, decrypt } from "./utils/encrypt.js"

// Localizo elementos principales
const input = document.getElementById("inputMain")
const result = document.getElementById("result")

const encryptBtn = document.getElementById("encryptBtn")
const decryptBtn = document.getElementById("decryptBtn")

const copyBtn = document.getElementById("copyBtn")

// Configuro variables y estados
const inputSaved = localStorage.getItem("inputSaved")
const resultSaved = localStorage.getItem("resultSaved")

const resultContentDefault = `
<img src="public/defaultResultImg.svg" alt="default result" class="resultImgDefault" />
<h2>Ningún mensaje fue encontrado</h2>
<p>Ingresa el texto que desees encriptar o desencriptar.</p>
`
if (inputSaved) input.value = inputSaved
if (!resultSaved) copyBtn.style.display = "none"

const setResult = text => {
  console.log(text === "null" ? "es null" : text ? "es texto" : "no es nada")
  console.log(
    text == "null" ? "es null a medias" : text ? "es texto" : "no es nada"
  )
  result.innerHTML =
    text && text !== "null"
      ? `<h2 class="resultText">${text}</h2>`
      : resultContentDefault
  localStorage.setItem("resultSaved", text)
}
const updateInput = () => {
  localStorage.setItem("inputSaved", input.value)
  console.log(localStorage.getItem("inputSaved"))
}
const updateCopyBtn = () => {
  copyBtn.style.display = input.value ? "block" : "none"
}

setResult(resultSaved)

// Creación de funciones de los botones
const encryptSubmit = () => {
  setResult(encrypt(input.value))
  updateCopyBtn()
}

const decryptSubmit = () => {
  setResult(decrypt(input.value))
  updateCopyBtn()
}
const copyText = () => {
  const result = localStorage.getItem("resultSaved")
  navigator.clipboard
    .writeText(result)
    .then(() => {
      console.log("Texto copiado al portapapeles")
    })
    .catch(err => {
      console.log("Error al copiar el texto: ", err)
    })
}

// Configurando botones con sus funciones
encryptBtn.onclick = encryptSubmit
decryptBtn.onclick = decryptSubmit
copyBtn.onclick = copyText
input.oninput = updateInput
