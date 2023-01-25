import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import '../../styles/_globals.scss';
import Box from '@mui/material/Box';
import TableStyle from './table.module.scss';

const Table = ({ title, data, columns, options }) => {
  return (
    <Box className={TableStyle['table_container']}>
      <MUIDataTable title={title} data={data} columns={columns} options={options} />
    </Box>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object
};

Table.defaultProps = {
  title: '',
  data: [],
  columns: {},
  options: {}
};

export default Table;
