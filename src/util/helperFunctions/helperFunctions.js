const { parse, isValid, format } = require("date-fns");

export const capitilaizeFirstLetter = (string) => {
  if (!string) return;
  return string[0].toUpperCase() + string.slice(1);
};

export const dateIsValid = (dateString) => {
  const parsedDate = parse(dateString, "MM/dd/yyyy", new Date());
  return isValid(parsedDate) && format(parsedDate, "MM/dd/yyyy") === dateString;
};

export const timeIsValid = (timeString) => {
  const parsedTime = parse(timeString, "HH:mm", new Date());
  return isValid(parsedTime) && format(parsedTime, "HH:mm") === timeString;
};

export const existsInArray = (string, array) => {
  return array.includes(string);
};

export const objectKeysMatch = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return (
    keys1.length === keys2.length && keys1.every((key) => keys2.includes(key))
  );
};

export const formatInputDate = (dateStr) =>
  dateStr
    ? format(parse(dateStr, "MM/dd/yyyy", new Date()), "yyyy-MM-dd")
    : null;

export const containsSpecialChar = (str) => {
  const specialChar = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
  /^[a-z ,.'-]+$/i;
  return specialChar.test(str);
};

export const nameIsValid = (name) => {
  const nameExists = name && name.length > 0;
  const checkValidName = /^[a-z ,.'-]+$/i;
  const isValidName = checkValidName.test(name);

  if (!nameExists || !isValidName) return false;
  return true;
};

export const removeWhitespace = (str) => {
  return str.replace(/\s+/g, "");
};

export const isPasswordValid = (password) => {
  if (!password || password?.length < 0) {
    return false;
  }

  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
    password
  );
};
