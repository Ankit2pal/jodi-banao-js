import { createSelector } from 'reselect';
import { transformResponseForDropDown } from '../../utils/responseTranformHelpers';

const getDeactivateTypes = createSelector(
  [(state) => state.deactivateDetail.data],
  (deactivateDetail) => {
    return transformResponseForDropDown(deactivateDetail, 'DeactiveType');
  }
);

export { getDeactivateTypes };
