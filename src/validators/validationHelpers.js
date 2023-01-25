export const isRequired = (value) => (value || value > -1 ? undefined : 'Required');
export const isWeight = (value) => (value < 30 || value > 250 ? 'min 30 and max 250 ' : '');
export const isEmailValid = (value) =>
  value?.match(
    /^(([^<>()[\]\\.,;:+=?/|{}'\s@"]+(\.[^<>()[\]\\.,;:+=?/|{}'\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? undefined
    : 'Must be a valid email';

export const isEmailValidLogin = (value) => {
  if (value.match(/^[0-9]+$/) == null) {
    return value.match(
      /^(([^<>()[\]\\.,;:+=?/|{}'\s@"]+(\.[^<>()[\]\\.,;:+=?/|{}'\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? undefined
      : 'Must be a valid email';
  }
};
export const MobileValidLogin = (value) => {
  if (value.match(/^[0-9]+$/) != null) {
    return value?.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) ? undefined : 'Must be valid phone number';
  }
};

export const ValidatePwd = (pwd) =>
  pwd.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    ? undefined
    : '*Must be 8 characters or more with a mix of letters, numbers, and symbols';

export const isIfscRequired = (value) =>
  value?.match('^[A-Z]{4}0[A-Z0-9]{6}$') ? undefined : 'Must be a valid ifsc';

export const AdhaarValid = (value) =>
  value?.match('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')
    ? undefined
    : 'Must be a Valid Adhaar Card Number';

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);
