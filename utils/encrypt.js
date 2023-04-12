const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat"
}

export const encrypt = (text) => {
  const letters = text.split("")
  const encrypted = letters.map(l => {
    return keys[l] || l
  }).join("")
  return(encrypted)
}

export const decrypt = (text) => {
  const keysArray = Object.entries(keys);
  let result = text
  keysArray.forEach(([key,value])=> {
    const regex = new RegExp(value, "gi");
    result = result.replace(regex, key)
  })
  return(result)
}