import { encrypt, decrypt } from "./utils/encrypt.js"

// LOCALIZO ELEMENTOS PRINCIPALES
const input = document.getElementById("inputMain")
const result = document.getElementById("result")

const encryptBtn = document.getElementById("encryptBtn")
const decryptBtn = document.getElementById("decryptBtn")

const copyBtn = document.getElementById("copyBtn")

// CONFIGURO VARIABLES Y ESTADOS
const inputSaved = localStorage.getItem("inputSaved")
const resultSaved = localStorage.getItem("resultSaved")

const resultContentDefault = `
<img src="public/defaultResultImg.svg" alt="default result" class="resultImgDefault" />
<h2>Ningún mensaje fue encontrado</h2>
<p>Ingresa el texto que desees encriptar o desencriptar.</p>
`

// Actualiza la visualización del botón copiar si es que hay resultado
const updateCopyBtn = () => {
  copyBtn.style.display = input.value ? "block" : "none"
}

// Función para automatizar el guardado del resultado para la pagina como para el estado
const setResult = text => {
  // Inserta el resultado en el contenedor del resultado, o si no pone el contenido por defecto
  result.innerHTML = text
    ? `<h2 class="resultText">${text}</h2>`
    : resultContentDefault

  // Guarda el estado o lo elimina de no encontrar nada (para evitar problemas con null)
  text
    ? localStorage.setItem("resultSaved", text)
    : localStorage.removeItem("resultSaved")
  
  // Actualiza el botón
  updateCopyBtn()
}

// Función para automatizar el guardado de lo del input en el estado cada ves que se interactúa con el mismo
const updateInput = () => {
  // Guarda o elimina estado si no tiene (para evitar problemas con null otra vez xD)
  input.value
    ? localStorage.setItem("inputSaved", input.value)
    : localStorage.removeItem("inputSaved")
}

// Configura los estados cuando se inicia la pagina
if (inputSaved) input.value = inputSaved // Coloca el content del input guardado en el input
if (!resultSaved) copyBtn.style.display = "none" // Oculta el Botón de guardado, si no hay resultado guardados
setResult(resultSaved) // Coloca el contenido de resultado guardado en el contenedor si es que tiene

// CREACIÓN DE FUNCIONES DE LOS BOTONES
const encryptSubmit = () => {
  // Encripta y el resultado lo pasa al contenedor de resultados 
  setResult(encrypt(input.value))
}

const decryptSubmit = () => {
  // Desencripta y el resultado lo pasa al contenedor de resultados 
  setResult(decrypt(input.value))
}
const copyText = () => {
  // Busca la copia del resultado guardado en el estado
  const result = localStorage.getItem("resultSaved")

  // Lo copia a tu portapapeles
  navigator.clipboard.writeText(result)
}

// CONFIGURANDO BOTONES CON SUS FUNCIONES
encryptBtn.onclick = encryptSubmit
decryptBtn.onclick = decryptSubmit
copyBtn.onclick = copyText
input.oninput = updateInput
