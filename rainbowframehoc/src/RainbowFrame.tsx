import { JSX } from "react";

export function RainbowFrame({ colors, children }: { colors: string[], children: JSX.Element }) {
  return colors.reduce((content, color) => <div style={{ border: `solid ${color} 2px` }}>{content}</div>, children);
}