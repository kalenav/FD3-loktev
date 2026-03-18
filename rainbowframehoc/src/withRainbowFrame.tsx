import { RainbowFrame } from "./RainbowFrame";

export function withRainbowFrame(colors: string[]) {
  return (Component: React.ComponentType<any>) => (props: Record<string, unknown>) => {
    return <RainbowFrame colors={colors}>
      <Component {...props} />
    </RainbowFrame>
  }
}