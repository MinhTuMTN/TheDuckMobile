import styled from "@emotion/styled";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const StyledTableBody = styled(TableBody)`
  & tr:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;

AddtionalInformation.propTypes = {
  specification: PropTypes.object,
  attributes: PropTypes.object,
};

AddtionalInformation.defaultProps = {
  specification: {},
  attributes: {},
};

function AddtionalInformation(props) {
  const { specification, attributes } = props;

  return (
    <Box>
      <Table>
        <StyledTableBody>
          {Object.keys(specification).map((key, index) => (
            <TableRow key={`specification-${index}`}>
              <TableCell width={"30%"}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {attributes[key]}
                </Typography>
              </TableCell>
              <TableCell>
                {typeof specification[key] === "boolean"
                  ? specification[key]
                    ? "Có"
                    : "Không"
                  : specification[key]}
              </TableCell>
            </TableRow>
          ))}
        </StyledTableBody>
      </Table>
    </Box>
  );
}

export default AddtionalInformation;
