import { DoubleButton } from './DoubleButton';
import { withRainbowFrame } from './withRainbowFrame';

const DoubleButtonWithRainbowFrame = withRainbowFrame(['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'])(DoubleButton);

function App() {
  return (
    <DoubleButtonWithRainbowFrame caption1='One' caption2='Two' cbPressed={alert}>
      <p>text</p>
    </DoubleButtonWithRainbowFrame>
  );
}

export default App;
