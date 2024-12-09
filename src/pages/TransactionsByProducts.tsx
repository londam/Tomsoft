import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/hr";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("hr");

const TransactionsByProducts = () => {
  const [pjUID, setPjUID] = useState("4986-1");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [foundProducts, setFoundProducts] = useState([]);
  const [cleared, setCleared] = useState<boolean>(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleSearch = async () => {
    const apiUrl = import.meta.env.VITE_LUCEED_API_URL_OBR_ARTIKLI;
    const username = import.meta.env.VITE_LUCEED_USERNAME;
    const password = import.meta.env.VITE_LUCEED_PASSWORD;
    const apiUrlFinal = `${apiUrl}/${pjUID}/${startDate?.format("DD.MM.YYYY")}/${endDate?.format(
      "DD.MM.YYYY"
    )}`;

    try {
      const response = await fetch(apiUrlFinal, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFoundProducts(data.result[0].obracun_artikli);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "artikl_uid", headerName: "ID", width: 100, minWidth: 50 },
    { field: "naziv_artikla", headerName: "Naziv", width: 150, minWidth: 100 },
    { field: "kolicina", headerName: "Količina", width: 150, minWidth: 50 },
    { field: "iznos", headerName: "Iznos", width: 200, minWidth: 150 },
    { field: "usluga", headerName: "Usluga", flex: 1, minWidth: 150 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          display: "flex",
          flexDirection: "column", // Arrange children in a column
          gap: 3, // Space between rows
          marginTop: 2,
          maxWidth: 700, // Optional: set a max width for the form
          width: "100%", // Ensures the form takes full width available
          padding: 2, // Optional: Add padding around the form
          margin: "auto", // Optional: Center the form in the container
        }}
      >
        {/* First row - Text input */}
        <TextField
          label="Poslovna Jedinica UID"
          variant="outlined"
          value={pjUID}
          onChange={(e) => setPjUID(e.target.value)}
          sx={{ width: "100%" }} // Make the input take full width
        />

        {/* Second row - Date pickers */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens, horizontally on larger screens
            gap: 2,
            maxWidth: 700,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
            <DatePicker
              label="Početni datum"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ width: "50%" }}
            />
            <DatePicker
              label="Završni datum"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ width: "50%" }}
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
            {cleared && (
              <Alert sx={{ position: "absolute", bottom: 0, right: 0 }} severity="success">
                Field cleared! {endDate?.format("DD.MM.YYYY.")}
              </Alert>
            )}
          </LocalizationProvider>
        </Box>

        {/* Last row - Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Plaćanja
        </Typography>
        <DataGrid
          rows={foundProducts}
          columns={columns}
          getRowId={(row) => row.artikl_uid}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          sx={{ border: 0 }}
        />
      </Box>
    </Box>
  );
};

export default TransactionsByProducts;
