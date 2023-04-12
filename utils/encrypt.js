const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
}

export const encrypt = text => {
  // Separa la oración en un array con todos sus caracteres
  const letters = text.split("")

  // Itera las letras y cada return sera un elemento para un array
  const encrypted = letters
    .map(l => {
      // Esto ve si la letra coincide con algún indice o key del objeto keys
      // Si coincide con alguno, dará la palabra encriptada.
      // Si no, solo devolverá la misma letra
      return keys[l] || l
    })
    .join("") // el join une todos los elementos del array a un string

  // retorna la oración encriptada
  return encrypted
}

export const decrypt = text => {
  // Hace una copia del objeto keys, pero como un array de array que contiene [Llave, valor]
  const keysArray = Object.entries(keys)

  // Variable para guardar los resultados de cada búsqueda de palabras clave
  let result = text

  // Itera el array con las [llave, valor]
  keysArray.forEach(([key, value]) => {
    // Se crea una expresión regular para buscar la palabra en toda la oración
    // No importa en ella hay 2 palabras clave, que las va a localizar
    const regex = new RegExp(value, "gi")

    // Busca las palabras con el regex, y las remplaza por la llave
    // O sea la letra original
    result = result.replace(regex, key)
  })

  // Retorna el resultado xD
  return result
}
