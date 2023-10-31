import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import CustomLink from "./CustomLink";

CustomSeparator.propTypes = {
  urls: PropTypes.array,
};

export default function CustomSeparator(props) {
  const { urls } = props;

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {urls.map((value, index) => {
          if (value.url === null)
            return (
              <Typography key={index} color="text.primary">
                {value.text}
              </Typography>
            );
          return (
            <CustomLink
              key={index}
              color="inherit"
              fontWeight={"none"}
              to={value.url}
              colorHover={"#3e95dd"}
            >
              {value.text}
            </CustomLink>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
