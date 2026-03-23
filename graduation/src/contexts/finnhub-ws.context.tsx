import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { throttleStockDataPoint } from "../redux/stock-data-throttler.middleware";

const FinnhubWebSocketContext = createContext<{
  subscribeToSymbolUpdates: (symbol: string) => void,
}>({
  subscribeToSymbolUpdates: () => { },
});

export function FinnhubWebSocketProvider({ children }: { children: React.ReactNode }) {
  const ws = useMemo(() => new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_API_KEY}`), []);
  const symbolUpdatesQueue = useRef<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const onOpen = () => {
      symbolUpdatesQueue.current.forEach(subscribeToSymbolUpdates);
      symbolUpdatesQueue.current.length = 0;
    };
    const onMessage = (rawMessage: { data: string }) => {
      const message = JSON.parse(rawMessage.data);
      switch (message.type) {
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' }));
          break;
        case 'trade':
          let tradeWithMaxPrice = message.data[0];
          for (const trade of message.data) {
            if (trade.p > tradeWithMaxPrice.p) {
              tradeWithMaxPrice = trade;
            }
          }
          dispatch(throttleStockDataPoint({
            stockSymbol: tradeWithMaxPrice.s,
            timestamp: tradeWithMaxPrice.t,
            price: tradeWithMaxPrice.p,
          }));
          break;
        default:
          break;
      }
    };
    ws.addEventListener('open', onOpen);
    ws.addEventListener('message', onMessage);
    return () => {
      ws.removeEventListener('open', onOpen);
      ws.removeEventListener('message', onMessage);
      ws.close();
    }
  }, [ws]);

  const subscribeToSymbolUpdates = useCallback((symbol: string) => {
    if (ws.readyState === WebSocket.CONNECTING) {
      symbolUpdatesQueue.current.push(symbol);
      return;
    }
    if (ws.readyState !== WebSocket.OPEN) {
      console.warn('websocket already closing or closed :(');
      return;
    }
    ws.send(JSON.stringify({ type: "subscribe", symbol }));
  }, [ws]);

  return (
    <FinnhubWebSocketContext.Provider value={{ subscribeToSymbolUpdates }}>
      {children}
    </FinnhubWebSocketContext.Provider>
  );
}

export const useFinnhubWS = () => useContext(FinnhubWebSocketContext);