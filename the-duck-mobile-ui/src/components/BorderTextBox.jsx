import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BorderTextBox(props) {
  const { children, label, width, marginTop, ...others } = props;
  return (
    <Box
      {...others}
      sx={{
        position: "relative",
        border: "2px solid",
        padding: 2,
        borderRadius: "15px",
        width: { width },
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        mt: { marginTop },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "-15px",
          backgroundColor: "#fff",
          padding: "0 8px",
        }}
        style={{
          fontSize: "14px",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default BorderTextBox;
