import { ResetTvOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { addStaff, resetStaffAccount } from "../../services/Admin/StaffService";
import DialogConfirm from "../DialogConfirm";
import DialogForm from "../DialogForm";
import MuiTextField from "../MuiTextFeild";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styled from "@emotion/styled";

const StyledDatePicker = styled(DatePicker)`
  input {
    font-size: 14px;
    height: 100%;
  }
`;

function StoreStaffTable(props) {
  const { staffs, storeId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [staffId, setStaffId] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const [openAddStaffDialog, setOpenAddStaffDialog] = React.useState(false);

  const [newStaff, setNewStaff] = React.useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
  });

  const handleAddStaff = async () => {
    if (!newStaff.fullName || !newStaff.email || !newStaff.dateOfBirth) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", { variant: "error" });
      return;
    }

    const response = await addStaff(storeId, newStaff);

    if (response.success) {
      setOpenAddStaffDialog(false);
      enqueueSnackbar("Thêm nhân viên thành công", { variant: "success" });
      navigate(0);
    } else enqueueSnackbar("Thêm nhân viên thất bại", { variant: "error" });
  };

  const handleResetPassword = async (staffId) => {
    const response = await resetStaffAccount(storeId, staffId);

    if (response.success) {
      setNewPassword(response.data.data);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPassword("");
    setEmail("");
  };
  return (
    <Stack spacing={2} mt={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Danh sách nhân viên</Typography>
        <Button
          variant="contained"
          color="color1"
          style={{ color: "white" }}
          onClick={() => setOpenAddStaffDialog(true)}
        >
          Thêm nhân viên
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "center" }}>STT</TableCell>
            <TableCell>Tên nhân viên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell style={{ textAlign: "center" }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs?.map((staff, index) => (
            <TableRow key={staff.userId}>
              <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
              <TableCell>{staff.fullName}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <IconButton
                  onClick={() => {
                    setOpenDialogConfirm(true);
                    setStaffId(staff.userId);
                    setEmail(staff.email);
                  }}
                >
                  <ResetTvOutlined />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogConfirm
        open={openDialog}
        cancelText={"Hủy"}
        okText={"Đồng ý"}
        onCancel={handleCloseDialog}
        onOk={handleCloseDialog}
        title={"Đặt lại mật khẩu"}
        onClose={handleCloseDialog}
        content={`Mật khẩu mới của nhân viên ${email} là ${newPassword}`}
      />

      <DialogConfirm
        open={openDialogConfirm}
        cancelText={"Hủy"}
        okText={"Đồng ý"}
        onCancel={() => setOpenDialogConfirm(false)}
        onOk={() => handleResetPassword(staffId)}
        title={"Xác nhận đặt lại mật khẩu"}
        onClose={() => setOpenDialogConfirm(false)}
        content={`Bạn có chắc chắn muốn đặt lại mật khẩu cho nhân viên ${email}?`}
      />

      <DialogForm
        open={openAddStaffDialog}
        cancelText={"Hủy"}
        okText={"Tạo nhân viên"}
        onCancel={() => setOpenAddStaffDialog(false)}
        onOk={handleAddStaff}
        title={"Thêm nhân viên mới"}
        onClose={() => setOpenAddStaffDialog(false)}
      >
        <Stack spacing={2} width={600} m={1}>
          <MuiTextField
            label="Họ và tên"
            value={newStaff.fullName}
            onChange={(e) =>
              setNewStaff({ ...newStaff, fullName: e.target.value })
            }
          />
          <MuiTextField
            label="Email"
            type="email"
            value={newStaff.email}
            onChange={(e) =>
              setNewStaff({ ...newStaff, email: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              label="Ngày sinh"
              value={newStaff.dateOfBirth}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                setNewStaff({ ...newStaff, dateOfBirth: newValue });
              }}
              slotProps={{ textField: { size: "medium" } }}
            />
          </LocalizationProvider>
        </Stack>
      </DialogForm>
    </Stack>
  );
}

export default StoreStaffTable;
