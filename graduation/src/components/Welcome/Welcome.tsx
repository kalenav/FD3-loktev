import { SymbolSelect } from "../SymbolSelect/SymbolSelect";

export function Welcome() {
  return (
    <div>
      <h2>Welcome!</h2>
      <p>Start by selecting a symbol pair:</p>
      <SymbolSelect />
    </div>
  );
}