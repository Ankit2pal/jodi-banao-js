import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import classNames from 'classnames';
import RefundPolicyStyle from './RefundPolicy.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/_infoCommons.scss';

const RefundPolicy = ({ policyData }) => {
  return (
    <Container className="info-container">
      {policyData.map((d, i) => (
        <p
          key={`pa${i}`}
          className={classNames({
            [RefundPolicyStyle.italic]: d.italic,
            [RefundPolicyStyle.bold]: d.bold
          })}>
          {d.info}
          {d.nestedInfo.map((nd) =>
            nd.link ? (
              <Link
                key={`pal${i}`}
                className={classNames({
                  [RefundPolicyStyle.italic]: nd.italic,
                  [RefundPolicyStyle.bold]: nd.bold
                })}
                to={nd.linkUrl}>
                {nd.info}
              </Link>
            ) : (
              <span
                key={`pad${i}`}
                className={classNames({
                  [RefundPolicyStyle.italic]: nd.italic,
                  [RefundPolicyStyle.bold]: nd.bold
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

RefundPolicy.propTypes = {
  policyData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RefundPolicy;
