import { useSelector, useDispatch } from 'react-redux';
import SearchProfiles from '../components/SearchProfiles/SearchProfiles';
import {
  getCurrentPage,
  getProfiles,
  getTotalPages
} from '../redux/selectors/searchResultsSelector';
import { onSearchSubmit } from '../redux/modules/searchResultsSlice';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { FooterSmall } from '../components/FooterSmall';
import { useEffect, useState } from 'react';
import { getBalanceProfileApi, getViewedProfilesApi } from '../services/dashboardApi';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import Loader from '../commons/Loader/Loader';
import { checkBalanceProfile } from '../redux/modules/userRegisterationDetails';

const SearchProfilesContainer = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(getProfiles);
  const totalPages = useSelector(getTotalPages);
  const currentPage = useSelector(getCurrentPage);
  const [viewProfiles, setViewProfiles] = useState([]);
  const [searchData, setSearchData] = useState({});
  const UID = useSelector(getUId);
  const isLoading = useSelector((state) => state.searchResults.isLoading);
  const handleChange = (event, pageNumber) => {
    let data = searchData;
    data.pageNumber = pageNumber;
    dispatch(onSearchSubmit(data));
  };

  const searchDataSet = (values) => {
    let data = values;
    data.pageNumber = 1;
    setSearchData(data);
    dispatch(onSearchSubmit(data));
  };

  const [balProfile, setBalProfiles] = useState({ viewProfile: 0, balProfile: 0 });

  const getBalanceProfile = async () => {
    try {
      const response = await getBalanceProfileApi(UID);
      let data = {
        viewProfile: response.ViewedProfile ? response.ViewedProfile : 0,
        balProfile: response.BalanceProfile ? response.BalanceProfile : 0
      };
      setBalProfiles(data);
      dispatch(checkBalanceProfile(response.BalanceProfile));
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      throw message;
    }
  };
  const getViewProfiles = async () => {
    try {
      const response = await getViewedProfilesApi(UID);
      setViewProfiles(response);
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      throw message;
    }
  };

  useEffect(() => {
    getBalanceProfile();
    getViewProfiles();
  }, []);

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <SearchProfiles
            profiles={profiles}
            totalPages={totalPages}
            handleChange={handleChange}
            currentPage={currentPage}
            balance={balProfile}
            viewProfile={viewProfiles}
            searchData={searchDataSet}
          />
        )}
      </Container>
      <FooterSmall />
    </>
  );
};

export default SearchProfilesContainer;
