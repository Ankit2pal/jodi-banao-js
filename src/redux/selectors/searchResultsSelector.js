import { isNil, omitBy } from 'lodash';
import { createSelector } from 'reselect';

const getData = createSelector([(state) => state.searchResults.data], (data = {}) => data);

const getSearchProfile = createSelector([getData], (data = {}) => data.SearchProfile);

const getPageObj = createSelector([getData], (data = {}) => data.pageobj);

export const getProfiles = createSelector([getSearchProfile], (profiles = []) => {
  return profiles.map((profile) => {
    const { userid, FullName, state, EducationName, country, AGE, HeightName, ImageUrl } = profile;
    const { Id: stateName } = state;
    const { Id: countryId } = country;

    const formattedProfile = {
      userId: userid,
      name: FullName,
      education: EducationName,
      country: countryId,
      state: stateName,
      age: AGE,
      height: HeightName,
      imageUrl: ImageUrl
    };
    return omitBy(formattedProfile, isNil);
  });
});

export const getTotalPages = createSelector([getPageObj], (pageObj = {}) => {
  const { totalPages = 0 } = pageObj;
  return totalPages;
});

export const getCurrentPage = createSelector([getPageObj], (pageObj = {}) => {
  const { currentPage } = pageObj;
  return currentPage;
});
