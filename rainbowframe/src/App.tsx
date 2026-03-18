import { RainbowFrame } from './RainbowFrame';

function App() {
  return (
    <RainbowFrame colors={['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple']}>
      <p>Hello!</p>
    </RainbowFrame>
  );
}

export default App;
