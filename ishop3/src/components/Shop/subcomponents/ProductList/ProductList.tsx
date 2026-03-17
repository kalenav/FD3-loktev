import { useCallback, useState } from 'react';
import { Product as ProductType } from "../../../../model/product.interface";
import Product from '../../../Product/Product';
import './ProductList.scss';

export default function ProductList({
  products,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
  сhangeDisabled,
}: {
  products: Array<ProductType>,
  onSelect: (id: number) => void,
  onCreate: () => void,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  сhangeDisabled: boolean,
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const selectProduct = useCallback((id: number) => {
    if (сhangeDisabled) {
      return;
    }
    setSelected(id);
    onSelect(id);
  }, [сhangeDisabled]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>URL</th>
            <th>Quantity</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              selected={selected === product.id}
              buttonsDisabled={сhangeDisabled}
              onSelect={() => selectProduct(product.id)}
              onEdit={() => { setSelected(product.id); onEdit(product.id); }}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </tbody>
      </table>
      <button
        className="new-product-button"
        disabled={сhangeDisabled}
        onClick={() => { setSelected(null); onCreate(); }}
      >New product</button>
    </>
  )
}