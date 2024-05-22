import axios from 'axios';
import { useCookies } from 'vue3-cookies';

export const validateFormatUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9]{3,15}$/
  return regex.test(username) && !/\s/.test(username)
}

export const validateFormatEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const decodeBase64 = (base64String: string) => {
  return atob(base64String);
}

const URL_Backend = import.meta.env.VITE_URL_BACKEND
const { cookies } = useCookies();

export const getUserDetails = async () => {
  const token = cookies.get('token');
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${URL_Backend}user`, {
      headers: { 'api-key': `${token}` }
    });
    return response.data.user; // Suponiendo que la respuesta contiene los detalles del usuario en `response.data.user`
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};
