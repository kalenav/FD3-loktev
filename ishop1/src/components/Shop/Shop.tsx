import './Shop.scss';
import { Product, ProductRow } from "../Product/Product";

export default function Shop({ productList }: { productList: Array<Product> }) {
    return <table className='Shop'>
        <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Картинка</th>
            <th>Количество</th>
        </tr>
        {productList.map(product => <ProductRow
            name={product.name}
            price={product.price}
            imgUrl={product.imgUrl}
            quantity={product.quantity}
        />)}
    </table>
}