import { useLiveStockData } from "./hooks/use-live-stock-data";

function App() {
  const stockData = useLiveStockData(['BINANCE:BTCUSDT']);
  console.log(stockData);
  return (
    <></>
  )
}

export default App
