import { useState } from 'react';
import { Container } from '@mui/material';
import CustomAccordian from '../../commons/accordion';
import { helpUsConstants } from '../../constants/helpUsConstants';
import HelpStyles from './helpus.module.scss';

const HelpUs = () => {
  const [expandAccordion, setExpandAccordion] = useState(false);
  const getAccordionOption = (type, i) => {
    const options = helpUsConstants[`${type}`].map((title) => {
      return <li key={`key${i}`}>{title}</li>;
    });

    return options;
  };
  const handleAccordionChange = (id) => {
    expandAccordion === id ? setExpandAccordion(0) : setExpandAccordion(id);
  };

  return (
    <>
      <Container className={HelpStyles['container']}>
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToLogin}
          description={
            <ul>
              <li>
                {helpUsConstants.visit}&nbsp;
                <a href="">{helpUsConstants.url}</a>
              </li>
              {getAccordionOption('loginAccordionOption')}
            </ul>
          }
          id={1}
          key={123}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.forogotPassword}
          description={<ul>{getAccordionOption('forgotPasswordAccordionOption')}</ul>}
          id={2}
          key={123}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToEditProfile}
          description={<ul>{getAccordionOption('editProfileAccordionOption')}</ul>}
          id={3}
          key={123}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToSearchProfile}
          description={<ul>{getAccordionOption('searchProfileAccordionOption')}</ul>}
          id={4}
          key={123}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToSendMsg}
          description={
            <>
              <p>
                <b>{helpUsConstants.freeMember}</b>
              </p>
              <ul>{getAccordionOption('freeMemberAccordionOption')}</ul>
              <p>
                <b>{helpUsConstants.paidMember}</b>
              </p>
              <ul>{getAccordionOption('paidMemberAccordionOption')}</ul>
            </>
          }
          id={5}
          key={123}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToReplyMsg}
          description={<ul>{getAccordionOption('replyToMessageAccordionOption')}</ul>}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
          id={6}
          key={123}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.howToAddPhoto}
          description={<ul>{getAccordionOption('addPhotoAccordionOption')}</ul>}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
          id={7}
          key={123}
        />
        <CustomAccordian
          className={HelpStyles['element_container']}
          title={helpUsConstants.packagesTitle}
          description={
            <ul>
              <p>{helpUsConstants.packagesDesc}</p>
              <p>
                <b>{helpUsConstants.membershipPackages}</b>
              </p>
              {getAccordionOption('membershipPackageAccordionOption')}
              <p>
                <b>{helpUsConstants.topUpPackages}</b>
              </p>
              {getAccordionOption('TopUpPackageAccordionOption')}
              <p>
                <a href="">{helpUsConstants.clickHere}</a>
                {helpUsConstants.topUpPackagesDesc}
              </p>
            </ul>
          }
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
          id={8}
          key={123}
        />
      </Container>
    </>
  );
};

export default HelpUs;
