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
  result.innerHTML = text
    ? `<h2 class="resultText">${text}</h2>`
    : resultContentDefault
  text
    ? localStorage.setItem("resultSaved", text)
    : localStorage.removeItem("resultSaved")
}
const updateInput = () => {
  input.value
    ? localStorage.setItem("inputSaved", input.value)
    : localStorage.removeItem("inputSaved")
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
  navigator.clipboard.writeText(result)
}

// Configurando botones con sus funciones
encryptBtn.onclick = encryptSubmit
decryptBtn.onclick = decryptSubmit
copyBtn.onclick = copyText
input.oninput = updateInput
