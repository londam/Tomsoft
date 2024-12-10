import { GridColDef } from "@mui/x-data-grid";
import TransactionsByType from "../components/TransactionsByType";

const TransactionsByPayment = () => {
  const columns: GridColDef[] = [
    { field: "vrste_placanja_uid", headerName: "ID", width: 100, minWidth: 50 },
    { field: "naziv", headerName: "Naziv", width: 150, minWidth: 100 },
    { field: "iznos", headerName: "Iznos", width: 150, minWidth: 50 },
    {
      field: "nadgrupa_placanja_uid",
      headerName: "Nadgrupa plaćanja UID",
      width: 200,
      minWidth: 150,
    },
    {
      field: "nadgrupa_placanja_naziv",
      headerName: "Nadgrupa plaćanja naziv",
      flex: 1,
      minWidth: 150,
    },
  ];

  return <TransactionsByType tip="placanja" columns={columns} />;
};

export default TransactionsByPayment;
