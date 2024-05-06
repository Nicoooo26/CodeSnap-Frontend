
export const validateFormatUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9]{3,15}$/
  return regex.test(username) && !/\s/.test(username)
}

export const validateFormatEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}


// const authGuard = (to, from, next) => {
//   if (authService.isAuthenticated()) {
//     next();
//   } else {
//     next('/login');
//   }
// };
// export default authGuard;