import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import TransactionsByType from "../components/TransactionsByType";

dayjs.locale("hr");

const TransactionsByProducts = () => {
  const columns: GridColDef[] = [
    { field: "artikl_uid", headerName: "ID", width: 100, minWidth: 50 },
    { field: "naziv_artikla", headerName: "Naziv", width: 150, minWidth: 100 },
    { field: "kolicina", headerName: "Količina", width: 150, minWidth: 50 },
    { field: "iznos", headerName: "Iznos", width: 200, minWidth: 150 },
    { field: "usluga", headerName: "Usluga", flex: 1, minWidth: 150 },
  ];
  return <TransactionsByType tip="artikli" columns={columns} />;
};

export default TransactionsByProducts;
