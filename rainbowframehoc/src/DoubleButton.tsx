import { JSX } from "react";

export function DoubleButton({
  caption1,
  caption2,
  cbPressed,
  children
}: {
  caption1: string;
  caption2: string;
  cbPressed: (v: number) => void,
  children: JSX.Element
}) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <input style={{ height: 'min-content' }} type="button" value={caption1} onClick={() => cbPressed(1)} />
    {children}
    <input style={{ height: 'min-content' }} type="button" value={caption2} onClick={() => cbPressed(2)} />
  </div>
}