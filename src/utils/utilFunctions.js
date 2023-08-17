export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result
      resolve(base64String)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read the file"))
    }

    reader.readAsDataURL(file)
  })
}
