import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { throttleSymbolData } from "../redux/symbol-data-throttler.middleware";
import type { FinnhubTradeMessage } from "../types/finnhub-trade-message.interface";

const FinnhubWebSocketContext = createContext<{
  subscribeToSymbolUpdates: (symbol: string) => void,
  unsubscribeFromSymbolUpdates?: (symbol: string) => void
}>({
  subscribeToSymbolUpdates: () => {},
  unsubscribeFromSymbolUpdates: () => {}
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
          const symbolToNewTrades: Record<string, Array<{ price: number, timestamp: number }>> = {};
          (message as FinnhubTradeMessage).data.forEach(trade => {
            (symbolToNewTrades[trade.s] ??= []).push({ price: trade.p, timestamp: trade.t });
          });
          Object.keys(symbolToNewTrades).forEach(symbol => {
            dispatch(throttleSymbolData({ symbol, newTrades: symbolToNewTrades[symbol] }));
          });
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

  const unsubscribeFromSymbolUpdates = useCallback((symbol: string) => {
    if (ws.readyState !== WebSocket.OPEN) {
      console.warn('websocket not open :(');
      return;
    }
    ws.send(JSON.stringify({ type: "unsubscribe", symbol }));
  }, [ws]);


  return (
    <FinnhubWebSocketContext.Provider value={{ subscribeToSymbolUpdates, unsubscribeFromSymbolUpdates }}>
      {children}
    </FinnhubWebSocketContext.Provider>
  );
}

export const useFinnhubWS = () => useContext(FinnhubWebSocketContext);