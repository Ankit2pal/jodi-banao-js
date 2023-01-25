import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { VIEW_PROILE_CONSTANTS } from '../../constants/viewProfileConstants';

const InfoTableTemplate = ({ label, data, occupations }) => {
  return (
    <TableContainer size="small">
      <Table stickyHeader aria-label="sticky table" className="theme-red">
        <TableHead className="table-head">
          <TableRow>
            <TableCell align="left" colSpan={label === 'Location' ? 4 : 2}>
              {label}
            </TableCell>
          </TableRow>
          {label === 'Location' && (
            <TableRow className="sub-header">
              <TableCell colSpan={2}>{VIEW_PROILE_CONSTANTS['permenandtAddressTitle']}</TableCell>
              <TableCell colSpan={2}>{VIEW_PROILE_CONSTANTS['workAddreesTitle']}</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody className="table-body">
          {data?.length ? (
            data.map((row) => {
              return label === 'Location' ? (
                row.key === '#Permanent Address' ? (
                  <>
                    <TableRow>
                      <TableCell colSpan={2}>{row.key}</TableCell>
                      <TableCell colSpan={2}>{row.key}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>{'N/A'}</TableCell>
                      <TableCell colSpan={2}>{'N/A'}</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow key={row.key}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.permenantAddress}</TableCell>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.workAddress}</TableCell>
                  </TableRow>
                )
              ) : label === 'Family Details' ? (
                <TableRow key={row.key}>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>
                    {row.key.includes('Occupation')
                      ? occupations.find((x) => x.id === parseInt(row.value))?.OccupationName
                      : row.value}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={row.key}>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              );
            })
          ) : label === 'Location' ? (
            <TableRow>
              {[...Array(2)].map((e, i) => {
                <TableCell key={i} colspan={2} align="center">
                  {VIEW_PROILE_CONSTANTS['noData']}
                </TableCell>;
              })}
            </TableRow>
          ) : (
            <TableRow>
              <TableCell align="center">{VIEW_PROILE_CONSTANTS['noData']}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

InfoTableTemplate.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  occupations: PropTypes.arrayOf(PropTypes.object)
};

export default InfoTableTemplate;
