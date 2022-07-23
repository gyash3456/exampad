import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
const BackDropLoader = (props) => {
  const { open } = props;
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackDropLoader;
