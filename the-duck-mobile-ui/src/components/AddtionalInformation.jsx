import styled from "@emotion/styled";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const StyledTableBody = styled(TableBody)`
  & tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

function AddtionalInformation(props) {
  return (
    <Box>
      <Table>
        <StyledTableBody>
          <TableRow>
            <TableCell>
              <strong>Thương hiệu:</strong>
            </TableCell>
            <TableCell>Apple</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Công nghệ màn hình:</strong>
            </TableCell>
            <TableCell>OLED</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Độ phân giải:</strong>
            </TableCell>
            <TableCell>Super Retina XDR (1290 x 2796 Pixels)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Màn hình rộng:</strong>
            </TableCell>
            <TableCell>6.1"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Hệ điều hành:</strong>
            </TableCell>
            <TableCell>iOS 16</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Chất liệu:</strong>
            </TableCell>
            <TableCell>Khung thép không gỉ & Mặt lưng kính cường lực</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Thời lượng pin:</strong>
            </TableCell>
            <TableCell>4323 mAh</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Tính năng đặc biệt:</strong>
            </TableCell>
            <TableCell>
              <Typography>Sạc pin nhanh</Typography>
              <Typography>Tiết kiệm pin</Typography>
              <Typography>Sạc không dây</Typography>
            </TableCell>
          </TableRow>
        </StyledTableBody>
      </Table>
    </Box>
  );
}

export default AddtionalInformation;
