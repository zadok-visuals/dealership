import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";
import CarDetail from "./pages/CarDetail";
import { CurrencyProvider } from "./components/CurrencyProvider";

function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
