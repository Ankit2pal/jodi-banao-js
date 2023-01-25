import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import '../../styles/_globals.scss';

const AddVendorUser = (prop) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      <Button style={{ background: '#f14046', paddingLeft: '1%', paddingRight: '1%' }}>
        <Link to={prop?.link} style={{ textDecoration: 'none', color: 'white' }}>
          {prop?.name}
        </Link>
      </Button>
    </Box>
  );
};

export default AddVendorUser;
