import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { SymbolChartList } from "./components/SymbolChartList/SymbolChartList";
import { Welcome } from "./components/Welcome/Welcome";

function App() {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(selectedSymbols.length > 0 ? '/symbols' : '/');
  }, [selectedSymbols.length > 0]);

  return (
    <Routes>
      <Route path="/symbols" element={<SymbolChartList />} />
      <Route path="/help" element={<div>this is just a router demo :)</div>} />
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}

export default App;