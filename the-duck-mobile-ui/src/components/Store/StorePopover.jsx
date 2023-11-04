import { MenuItem, MenuList, Popover } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
function StorePopover(props) {
  const { anchorEl, onClose, open } = props;
  const handleSignOut = () => {
    onClose?.();
    console.log("Đăng xuất");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={onClose}
      open={open}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          style={{
            fontSize: "14px",
            fontWeight: "400",
            alignItems: "center",
          }}
        >
          <InfoOutlinedIcon
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Thông tin
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          style={{
            fontSize: "14px",
            fontWeight: "400",
            alignItems: "center",
          }}
        >
          <LogoutOutlinedIcon
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Popover>
  );
}

StorePopover.propTypes = {
  // Định nghĩa propTypes cho component SignOut
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default StorePopover;
