import validator from 'validator';

export const validEmail = email => validator.isEmail(email);
export const emptyString = string => validator.isEmpty(string);
export const samePassword = (password1, password2) => password1 === password2;
