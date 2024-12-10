import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductsSearch from "./pages/ProductsSearch";
import TransactionsByPayment from "./pages/TransactionsByPayment";
import TransactionsByProducts from "./pages/TransactionsByProducts";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <div className="min-w-64">
          <Sidebar />
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/search" element={<ProductsSearch />} />
            <Route path="/payments" element={<TransactionsByPayment />} />
            <Route path="/productsSold" element={<TransactionsByProducts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
