import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import classNames from 'classnames';
import PrivacyPolicyStyle from './privacypolicy.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/_infoCommons.scss';

const PrivacyPolicy = ({ policyData }) => {
  return (
    <Container className="info-container">
      {policyData.map((d, i) => (
        <p
          key={`pa${i}`}
          className={classNames({
            [PrivacyPolicyStyle.italic]: d.italic,
            [PrivacyPolicyStyle.bold]: d.bold
          })}>
          {d.info}
          {d.nestedInfo.map((nd) =>
            nd.link ? (
              <Link
                key={`pal${i}`}
                className={classNames({
                  [PrivacyPolicyStyle.italic]: nd.italic,
                  [PrivacyPolicyStyle.bold]: nd.bold
                })}
                to={nd.linkUrl}>
                {nd.info}
              </Link>
            ) : (
              <span
                key={`pad${i}`}
                className={classNames({
                  [PrivacyPolicyStyle.italic]: nd.italic,
                  [PrivacyPolicyStyle.bold]: nd.bold
                })}>
                {nd.info}
              </span>
            )
          )}
        </p>
      ))}
    </Container>
  );
};

PrivacyPolicy.propTypes = {
  policyData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PrivacyPolicy;
