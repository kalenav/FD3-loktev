import { memo } from "react";
import { SymbolSelect } from "../SymbolSelect/SymbolSelect";

export const Welcome = memo(() => {
  return (
    <div>
      <h2>Welcome!</h2>
      <p>Start by selecting a symbol pair:</p>
      <SymbolSelect />
    </div>
  );
});