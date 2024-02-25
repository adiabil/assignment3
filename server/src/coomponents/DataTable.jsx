import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SessionContext } from "../context/SessionContext";
import { Box, Button, Typography } from "@mui/material";
import { deleteSession } from "../api/crud";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DataTable() {
  const { state, dispatch } = React.useContext(SessionContext);

  const handelDelete = async ({ id }) => {
    const result = await deleteSession({
      id,
    });
    if (result.message) {
      alert(
        `error while deleting session:\n\n${result.status} ${result.message}`
      );
    }
    dispatch({ type: "DELETE_SESSION", payload: id });
  };

  function formattedDate(date) {
    if (!date) {
      return "";
    }
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const rows = state?.items;
  const columns = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "crisis", headerName: "Crisis", width: 180 },
    { field: "clientName", headerName: "Client Name", width: 180 },
    { field: "counslerName", headerName: "Counsler Name", width: 180 },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2">
              {formattedDate(params?.row?.date)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "sessionStatus",
      headerName: "Session Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: params.row.sessionStatus === "done" ? "green" : "orange",
              }}>
              {params.row.sessionStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              color="success"
              sx={{ textTransform: "none" }}
              size="small"
              onClick={() => {
                dispatch({ type: "SET_SELECTED", payload: params.row });
                dispatch({ type: "MODAL", payload: true });
              }}>
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
              size="small"
              onClick={() => {
                dispatch({ type: "SET_SELECTED", payload: params.row });
                handelDelete({ id: params.row.id });
              }}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
