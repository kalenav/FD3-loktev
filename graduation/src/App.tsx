import { StockChart } from "./components/StockChart/StockChart";
import { useLiveStockData } from "./hooks/use-live-stock-data";

function App() {
  const stockData = useLiveStockData(['BINANCE:BTCUSDT']);

  return (
    <StockChart data={stockData['BINANCE:BTCUSDT'] || []} />
  )
}

export default App
