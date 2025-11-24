import './Product.scss';

export interface Product {
    name: string,
    price: number,
    imgUrl: string,
    quantity: number,
};

export function ProductRow({ name, price, imgUrl, quantity }: Product) {
    return <tr className='ProductRow'>
        <td>{name}</td>
        <td>{price}</td>
        <td><img className='ProductRowPicture' src={imgUrl} alt={`изображение товара ${name}`} /></td>
        <td>{quantity}</td>
    </tr>
}