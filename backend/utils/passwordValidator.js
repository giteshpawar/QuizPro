module.exports = (password) => {
  const minLength = password.length >= 6;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && specialChar;
};
