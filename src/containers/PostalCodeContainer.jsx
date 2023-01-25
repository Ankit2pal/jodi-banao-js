import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { InputAutoCompleteField } from '../commons';
import { REGION_HEADER_LABELS } from '../constants/regionConstants';
import { getPostalCodeAPI } from '../services/PotalCodeAPI';
export const PostalCodeContainer = ({ InputValue, inputProps, ...restProps }) => {
  const [postCode, setPostCode] = useState([]);
  useEffect(() => {
    getPostalCode();
  }, [InputValue]);

  const getPostalCode = async () => {
    const countries = await getPostalCodeAPI(InputValue);
    setPostCode(countries);
  };

  return (
    <InputAutoCompleteField
      label={REGION_HEADER_LABELS.COUNTRY}
      // defaultValue={1}
      options={postCode}
      inputProps={inputProps}
      {...restProps}
    />
  );
};
PostalCodeContainer.propTypes = {
  InputValue: PropTypes.any,
  inputProps: PropTypes.any
};

PostalCodeContainer.defaultProps = {
  InputValue: ''
};
