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
  buttonsDisabled,
  selectionChangeDisabled,
}: {
  products: Array<ProductType>,
  onSelect: (id: number) => void,
  onCreate: () => void,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  buttonsDisabled: boolean,
  selectionChangeDisabled: boolean,
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const selectProduct = useCallback((id: number) => {
    if (selectionChangeDisabled) {
      return;
    }
    setSelected(id);
    onSelect(id);
  }, [selectionChangeDisabled]);

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
          {products.map((product, index) => (
            <Product
              key={product.id}
              product={product}
              selected={selected === product.id}
              buttonsDisabled={buttonsDisabled}
              onSelect={() => selectProduct(product.id)}
              onEdit={() => { setSelected(product.id); onEdit(product.id); }}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </tbody>
      </table>
      <button
        className="new-product-button"
        disabled={buttonsDisabled}
        onClick={() => { setSelected(null); onCreate(); }}
      >New product</button>
    </>
  )
}