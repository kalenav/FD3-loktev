import { JSX, useEffect, useState } from "react";

export function RainbowFrame({ colors, children }: { colors: string[], children: JSX.Element }) {
  const [content, setContent] = useState<JSX.Element>(children);
  useEffect(() => {
    setContent(children);
    colors.forEach(color => setContent(prevContent => (
      <div style={{ border: `solid ${color} 2px` }}>{prevContent}</div>
    )));
  }, [colors, children]);
  return content;
}