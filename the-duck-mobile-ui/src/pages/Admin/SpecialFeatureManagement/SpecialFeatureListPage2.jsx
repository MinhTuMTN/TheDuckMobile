import {
    Box,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    styled
} from "@mui/material";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import { Link, useNavigate } from "react-router-dom";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from "@mui/icons-material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { DataContext } from "../../../layouts/AdminLayout";
import { enqueueSnackbar } from "notistack";
import { deleteSpecialFeature, restoreSpecialFeature } from "../../../services/Admin/SpecialFeatureService";
import DialogConfirm from "../../../components/DialogConfirm";

const RootPageSpecialFeatureList = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "30%",
    marginBottom: theme.spacing(1),
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

function SpecialFeatureListPage() {
    const navigate = useNavigate();
    const { dataFetched } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsSearched, setRowsSearched] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [isDeleted, setIsDeleted] = useState();
    const [id, setId] = useState("");
    const [index, setIndex] = useState(0);
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {
        setRowsSearched(dataFetched);
    }, [dataFetched]);

    const filterRows = useCallback(
        (searchString) => {
            setPage(0);
            if (searchString === "") {
                return dataFetched;
            }
            return dataFetched.filter((row) =>
                row.specialFeatureName.toLowerCase().includes(searchString.toLowerCase())
            );
        },
        [dataFetched]
    );

    useEffect(() => {
        const filtered = filterRows(searchString);
        setRowsSearched(filtered);
    }, [searchString, filterRows]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTrashButtonClick = async () => {
        let response;
        const specialFeatures = [...dataFetched];
        if (isDeleted) {
            response = await restoreSpecialFeature(id);
            if (response.success) {
                enqueueSnackbar("Khôi phục tính năng đặc biệt thành công!", { variant: "success" });
                specialFeatures[index + page * rowsPerPage].isDeleted = !isDeleted;
                setRowsSearched(specialFeatures);
            } else {
                enqueueSnackbar("Khôi phục tính năng đặc biệt thất bại!", { variant: "error" });
            }
        } else {
            response = await deleteSpecialFeature(id);
            if (response.success) {
                enqueueSnackbar("Xóa tính năng đặc biệt thành công!", { variant: "success" });
                specialFeatures[index + page * rowsPerPage].isDeleted = !isDeleted;
                setRowsSearched(specialFeatures);
            } else {
                enqueueSnackbar("Xóa tính năng đặc biệt thất bại!", { variant: "error" });
            }
        }
    };
    return (
        <RootPageSpecialFeatureList>
            <Typography variant="h3">Danh sách tính năng đặc biệt</Typography>
            <AddButton component={Link} variant="contained" color="color1" to="/admin/special-feature-management/add">
                <Typography color={"white"}>
                    Thêm Tính Năng Đặc Biệt Mới
                </Typography>
            </AddButton>
            <SearchTextField
                type="text"
                variant="outlined"
                component={Paper}
                placeholder="Tìm kiếm theo tên"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    style: { fontSize: 18 },
                }}
            />
            <TableContainer
                component={Paper}
                sx={{ maxHeight: 1070, minWidth: 1035, maxWidth: 1035 }}
            >
                <Table stickyHeader sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã tính năng đặc biệt</TableCell>
                            <TableCell align="center">Tên tính năng đặc biệt</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Lựa chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rowsSearched
                        ).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell style={{ minWidth: 100 }} align="center">
                                    {row.specialFeatureId}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    {row.specialFeatureName}
                                </TableCell>
                                <TableCell style={{ minWidth: 250 }} align="center">
                                    {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    <MuiButton
                                        color="teal"
                                        onClick={() => {
                                            navigate(`/admin/special-feature-management/${row.specialFeatureId}`, {
                                                state: {
                                                    editSpecialFeature: row
                                                }
                                            })
                                        }}
                                    >
                                        <EditIcon />
                                    </MuiButton>
                                    <MuiButton
                                        component={Link}
                                        color="color1"
                                        onClick={(e) => {
                                            setIndex(i);
                                            setId(row.specialFeatureId);
                                            setIsDeleted(row.isDeleted);
                                            setDeleteDialog(true);
                                        }}
                                    >
                                        {row.isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
                                    </MuiButton>
                                    <DialogConfirm
                                        open={deleteDialog}
                                        title={isDeleted ? "Khôi phục tính năng đặc biệt" : "Xóa tính năng đặc biệt"}
                                        content={
                                            isDeleted
                                                ? "Bạn có chắc chắn muốn khôi phục tính năng đặc biệt này"
                                                : "Bạn có chắc chắn muốn xóa tính năng đặc biệt này?"
                                        }
                                        okText={isDeleted ? "Khôi phục" : "Xóa"}
                                        cancelText={"Hủy"}
                                        onOk={handleTrashButtonClick}
                                        onCancel={() => setDeleteDialog(false)}
                                        onClose={() => setDeleteDialog(false)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={rowsSearched.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </RootPageSpecialFeatureList>
    );
}

export default SpecialFeatureListPage;