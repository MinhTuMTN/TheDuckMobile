import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import PropTypes from "prop-types";

BasicPopover.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
};

BasicPopover.defaultProps = {
  value: [],
  onChange: () => { },
};

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreIcon />}
        color="color4"
        sx={{
          width: "fit-content",
          height: "40px",
          marginTop: "0.5rem",
          borderRadius: "15px",
          fontSize: "1rem",
          fontWeight: "500",
        }}
        onClick={handleClick}
      >
        {props.label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FormGroup sx={{ padding: 1 }}>
          {props?.options?.map((option, index) => (
            <FormControlLabel
              key={`option-${index}-${option.value}`}
              sx={{ padding: 0.75 }} // Đặt padding cho mỗi option
              control={
                <Checkbox
                  icon={icon}
                  checked={props.value.includes(option.value)}
                  checkedIcon={checkedIcon}
                  name={option.name}
                  sx={{
                    color: "#D80032",
                    "&.Mui-checked": {
                      color: "#D80032",
                    },
                  }}
                  onChange={props.onChange}
                  value={option.value}
                />
              }
              label={option.name}
            />
          ))}
        </FormGroup>
      </Popover>
    </div>
  );
}
