import Shop from './components/Shop/Shop';
import products from './data/products.json';

function App() {
  return (
    <Shop products={products} />
  );
}

export default App;
