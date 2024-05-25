export const validateFormatUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9]{3,15}$/
  return regex.test(username) && !/\s/.test(username)
}

export const validateFormatEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const decodeBase64 = (base64String: string) => {
  return atob(base64String)
}
