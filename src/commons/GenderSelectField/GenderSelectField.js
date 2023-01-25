import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormHelperText from '@mui/material/FormHelperText';

import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';

import { ReactComponent as MaleIcon } from '../../images/male.svg';
import { ReactComponent as FemaleIcon } from '../../images/female.svg';

import GenderSelectStyles from './GenderSelect.module.scss';

const GenderSelectField = ({ input: { value, onChange }, meta, inputvalue }) => {
  return (
    <>
      <ToggleButtonGroup
        value={value !== '' ? value : inputvalue}
        exclusive
        onChange={(event, selectedOption) => {
          return onChange(selectedOption);
        }}
        className={GenderSelectStyles['genderSelectContainer']}>
        <ToggleButton
          value="Male"
          className={GenderSelectStyles['genderSelectBtn']}
          sx={{
            border: '1px solid #999999',
            background: '#FFFFFF',
            '&.Mui-selected': {
              color: '#F14046',
              border: '1px solid #F14046',
              background: '#FFFFFF',
              svg: {
                path: {
                  fill: '#F14046'
                }
              }
            },
            '&.Mui-selected:hover': {
              background: '#ffffff'
            }
          }}>
          <SvgIcon>
            <MaleIcon />
          </SvgIcon>
          {'Male'}
        </ToggleButton>
        <ToggleButton
          value="Female"
          className={GenderSelectStyles['genderSelectBtn']}
          sx={{
            border: '1px solid #999999',
            background: '#FFFFFF',
            '&.Mui-selected': {
              color: '#F14046',
              border: '1px solid #F14046',
              background: '#FFFFFF',
              svg: {
                path: {
                  fill: '#F14046'
                }
              }
            },
            '&.Mui-selected:hover': {
              background: '#ffffff'
            }
          }}>
          <SvgIcon>
            <FemaleIcon />
          </SvgIcon>
          {'Female'}
        </ToggleButton>
      </ToggleButtonGroup>
      {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText>}
    </>
  );
};

GenderSelectField.propTypes = {
  input: PropTypes.object,
  inputvalue: PropTypes.any,
  meta: PropTypes.object
};

export default GenderSelectField;
