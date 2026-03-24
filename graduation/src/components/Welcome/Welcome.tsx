import { memo } from "react";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";
import './Welcome.scss';

export const Welcome = memo(() => {
  return (
    <div className="welcome">
      <h1 className="welcome-heading">Live Crypto Tracker</h1>
      <p className="welcome-subtext">Start by selecting a symbol pair to track</p>
      <SymbolSelect />
    </div>
  );
});