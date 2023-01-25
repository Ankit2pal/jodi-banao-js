import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarComponent from '../components/SearchBarComponent';
import { fetchRegisterationDetails } from '../redux/modules/registerationDetailsSlice';
import { getMaritalStatus } from '../redux/selectors/registerSelector';
import PropTypes from 'prop-types';

const SearchBarContainer = ({ searchData }) => {
  const creatingForMaritalStatusOptionalData = useSelector(getMaritalStatus);
  const dispatch = useDispatch();

  const onSubmitSearch = (values) => {
    searchData(values);
  };

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
  }, []);

  return (
    <SearchBarComponent
      searchSubmit={onSubmitSearch}
      creatingForMaritalStatusOptionalData={creatingForMaritalStatusOptionalData}
    />
  );
};

SearchBarContainer.propTypes = {
  searchData: PropTypes.func
};

export default SearchBarContainer;
