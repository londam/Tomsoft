import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const sampleProducts = [
//   { id: 1, name: "Product 1" },
//   { id: 2, name: "Product 2" },
//   { id: 3, name: "Product 3" },
//   { id: 4, name: "Product 4" },
//   { id: 5, name: "Product 5" },
//   { id: 6, name: "Product 6" },
//   { id: 7, name: "Product 7" },
//   { id: 8, name: "Product 8" },
//   { id: 9, name: "Product 9" },
//   { id: 10, name: "Product 10" },
// ];

const ProductsSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);

  const handleSearch = async () => {
    const apiUrl = import.meta.env.VITE_LUCEED_API_URL_ARTIKLI;
    const username = import.meta.env.VITE_LUCEED_USERNAME;
    const password = import.meta.env.VITE_LUCEED_PASSWORD;

    console.log({ apiUrl, username, password });

    try {
      const response = await fetch(`${apiUrl}/${searchQuery}`, {
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
      setFoundProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "naziv", headerName: "Naziv", flex: 1 },
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
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <TextField
          label="Product name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <DataGrid
        rows={foundProducts}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ border: 0 }}
      />
    </Box>
  );
};

export default ProductsSearch;