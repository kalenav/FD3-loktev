import { Product } from "./components/Product/Product";
import Shop from "./components/Shop/Shop";

const productList: Array<Product & { id: string }> = [
  { id: '1', name: 'Чехол iPhone', price: 12.34, imgUrl: 'https://basket-17.wbbasket.ru/vol2735/part273534/273534851/images/big/1.webp', quantity: 5 },
  { id: '2', name: 'Зимняя шапка', price: 25.28, imgUrl: 'https://basket-02.wbbasket.ru/vol168/part16836/16836697/images/big/1.webp', quantity: 10 },
  { id: '3', name: 'Электробритва', price: 80.42, imgUrl: 'https://basket-23.wbbasket.ru/vol3985/part398548/398548950/images/big/1.webp', quantity: 3 },
];

function App() {
  return <Shop productList={productList} />
}

export default App;