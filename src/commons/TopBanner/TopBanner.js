import PropTypes from 'prop-types';
import TopBannerStyles from './TopBanner.module.scss';

const TopBanner = ({ label }) => {
  return (
    <div className={TopBannerStyles.banner}>
      <h1>{label}</h1>
    </div>
  );
};

TopBanner.propTypes = {
  label: PropTypes.string
};

export default TopBanner;
