export const validateFormatUsername = (username:string) => {
    const regex = /^[a-zA-Z0-9]{3,15}$/;
    return regex.test(username) && !/\s/.test(username);
  };
  
export const validateFormatPassword = (password:string) => {
    // Mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
 export const validateFormatEmail = (email:string) => {
    // Utilizando una expresión regular simple para validar la estructura de un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };