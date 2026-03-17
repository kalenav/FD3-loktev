import { Product as ProductType } from '../../model/product.interface';
import './Product.scss';

export default function Product({
  product,
  selected,
  buttonsDisabled,
  onSelect,
  onEdit,
  onDelete,
}: {
  product: ProductType,
  selected: boolean,
  buttonsDisabled: boolean,
  onSelect: () => void,
  onEdit: () => void,
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
      <td>
        <button disabled={buttonsDisabled} onClick={e => { e.stopPropagation(); onEdit(); }}>Edit</button>
        <button disabled={buttonsDisabled} onClick={e => { e.stopPropagation(); onDelete(); }}>Delete</button>
      </td>
    </tr>
  );
}