import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TabOrderStore from "../../components/Store/TabOrderStore";

function Orders(props) {
  return (
    <Box
      sx={{
        py: 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Box>
        <Stack>
          <Typography variant="h3" paddingLeft={8} paddingBottom={2}>
            Danh sách đơn hàng
          </Typography>
          <Stack
            elevation={3}
            sx={{
              paddingBottom: 2,
              //paddingX: 8,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <TabOrderStore />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Orders;
