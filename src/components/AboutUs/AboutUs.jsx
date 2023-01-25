import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import AboutUsStyle from './aboutus.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import '../../styles/_infoCommons.scss';

const AboutUs = ({ description }) => {
  return (
    <Container className="info-container">
      {description.map((d, i) => (
        <p
          key={`pa${i}`}
          className={classNames({
            [AboutUsStyle.italic]: d.italic,
            [AboutUsStyle.bold]: d.bold
          })}>
          {d.info}
          {d.nestedInfo.map((nd) =>
            nd.link ? (
              <Link
                key={`pad${i}`}
                className={classNames({
                  [AboutUsStyle.italic]: nd.italic,
                  [AboutUsStyle.bold]: nd.bold
                })}
                to={nd.linkUrl}>
                {nd.info}
              </Link>
            ) : (
              <span
                key={`par${i}`}
                className={classNames({
                  [AboutUsStyle.italic]: nd.italic,
                  [AboutUsStyle.bold]: nd.bold
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

AboutUs.propTypes = {
  description: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AboutUs;
