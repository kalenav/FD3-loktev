import { Product as ProductType } from '../../model/product.interface';
import './Product.scss';

export default function Product({
  product,
  selected,
  onSelect,
  onDelete,
}: {
  product: ProductType,
  selected: boolean,
  onSelect: () => void,
  onDelete: () => void,
}) {
  return (
    <tr
      className={selected ? 'selected' : ''}
      onClick={onSelect}
    >
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.url}</td>
      <td>{product.quantity}</td>
      <td><button onClick={e => { e.stopPropagation(); onDelete(); }}>Delete</button></td>
    </tr>
  );
}