import './Shop.scss';
import { Product, ProductRow } from "../Product/Product";

export default function Shop({ productList }: { productList: Array<Product & { id: string }> }) {
    return <table className='Shop'>
        <tbody>
            <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Картинка</th>
                <th>Количество</th>
            </tr>
            {productList.map(product => <ProductRow
                key={product.id}
                name={product.name}
                price={product.price}
                imgUrl={product.imgUrl}
                quantity={product.quantity}
            />)}
        </tbody>
    </table>
}