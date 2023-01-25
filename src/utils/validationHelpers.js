import { callEmailValidation, callMobileValidation } from '../services/registerApi';

const checkEmailExist = async (email) => {
  try {
    return await callEmailValidation({ email });
  } catch {
    return false;
  }
};

const checkPhoneExist = async (phoneNumber) => {
  try {
    let phone = phoneNumber.substring(1).replaceAll('-', '').replaceAll(' ', '');
    return await callMobileValidation({ phone });
  } catch {
    return false;
  }
};

export { checkEmailExist, checkPhoneExist };
