import validator from 'validator';

export const validEmail = email => validator.isEmail(email);

export const emptyString = string => validator.isEmpty(string);

export const samePassword = (password1, password2) => password1 === password2;

export const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);
