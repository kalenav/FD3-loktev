import { useSelector } from "react-redux";
import { SymbolChartList } from "./components/SymbolChartList/SymbolChartList";
import { Welcome } from "./components/Welcome/Welcome";

function App() {
  const selectedSymbols = useSelector((state: { selectedSymbols: Array<string> }) => state.selectedSymbols);
  console.log(selectedSymbols);

  return (
    selectedSymbols.length ? <SymbolChartList /> : <Welcome />
  );
}

export default App
