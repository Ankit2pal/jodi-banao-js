import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import ContactUsStyle from './contactus.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import '../../styles/_infoCommons.scss';

const ContactUs = ({ contactData }) => {
  return (
    <Container className="info-container">
      {contactData.map((d, i) => (
        <p
          key={`pa${i}`}
          className={classNames({
            [ContactUsStyle.italic]: d.italic,
            [ContactUsStyle.bold]: d.bold
          })}>
          {d.info}
          {d.nestedInfo.map((nd) =>
            nd.link ? (
              <Link
                className={classNames({
                  [ContactUsStyle.italic]: nd.italic,
                  [ContactUsStyle.bold]: nd.bold
                })}
                to={nd.linkUrl}>
                {nd.info}
              </Link>
            ) : (
              <span
                className={classNames({
                  [ContactUsStyle.italic]: nd.italic,
                  [ContactUsStyle.bold]: nd.bold
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

ContactUs.propTypes = {
  contactData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ContactUs;
