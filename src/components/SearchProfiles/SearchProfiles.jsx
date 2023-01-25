import { Box, Container, Grid, Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './SearchProfiles.module.scss';
import SearchBarContainer from '../../containers/SearchBarContainer';
import ProfileItem from '../ProfileItem';

const SearchProfiles = ({
  profiles,
  handleChange,
  totalPages,
  currentPage,
  balance,
  viewProfile,
  searchData
}) => {
  return (
    <Box as="div">
      <Box as="div" mb={5} className={styles['searchbar_container']}>
        <SearchBarContainer searchData={searchData} />
      </Box>
      <Container className={['info-container', styles['box_container']]}>
        <Grid container spacing={3} columnSpacing={3}>
          {profiles &&
            profiles.map((profile) => (
              <Grid item key={profile.userId} xs={12} md={3}>
                <ProfileItem
                  name={profile.name}
                  education={profile.education}
                  country={profile.country}
                  state={profile.state}
                  age={profile.age}
                  height={profile.height}
                  imageUrl={profile.imageUrl}
                  userid={profile.userId}
                  balance={balance}
                  viewProfile={viewProfile}
                />
              </Grid>
            ))}
          {profiles && profiles.length === 0 && (
            <div className={styles['no_record']}>No Record Found</div>
          )}
        </Grid>
        {totalPages > 1 && (
          <Box as="div" className={styles['box_container_pagination']}>
            <Pagination
              page={currentPage}
              className={styles['pagination_container']}
              count={totalPages}
              onChange={handleChange}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

SearchProfiles.propTypes = {
  profiles: PropTypes.array,
  handleChange: PropTypes.func,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  balance: PropTypes.number,
  viewProfile: PropTypes.array,
  searchData: PropTypes.func
};

SearchProfiles.defaultProps = {
  profiles: [],
  handleChange: () => {},
  totalPages: 0,
  currentPage: 0
};

export default SearchProfiles;
