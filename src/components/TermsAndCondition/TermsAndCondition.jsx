import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import TermsAndConditionStyle from './termsandcondition.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import '../../styles/_infoCommons.scss';
import { any } from 'prop-types';
const TermsAndCondition = ({ conditionData }) => {
  return (
    <Container className="info-container">
      {conditionData.map((d, i) => (
        <p
          key={`sa${i}`}
          className={classNames({
            [TermsAndConditionStyle.italic]: d.italic,
            [TermsAndConditionStyle.bold]: d.bold
          })}>
          {d.info}
          {d.nestedInfo.map((nd, index) =>
            nd.link ? (
              <Link
                key={`sap${i}_${index}`}
                className={classNames({
                  [TermsAndConditionStyle.italic]: nd.italic,
                  [TermsAndConditionStyle.bold]: nd.bold
                })}
                to={nd.linkUrl}>
                {nd.info}
              </Link>
            ) : (
              <span
                key={`sad${i}_${index}`}
                className={classNames({
                  [TermsAndConditionStyle.italic]: nd.italic,
                  [TermsAndConditionStyle.bold]: nd.bold
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

TermsAndConditionStyle.propTypes = {
  conditionData: PropTypes.arrayOf(PropTypes.object).isRequired
};
TermsAndCondition.propTypes = {
  conditionData: any
};

export default TermsAndCondition;
