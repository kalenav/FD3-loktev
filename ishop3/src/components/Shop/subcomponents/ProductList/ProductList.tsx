import { useCallback, useState } from 'react';
import { Product as ProductType } from "../../../../model/product.interface";
import Product from '../../../Product/Product';
import './ProductList.scss';

export default function ProductList({
  products,
  onSelect,
  onNew,
  onEdit,
  onDelete,
  buttonsDisabled,
  forcedSelectedProductId,
}: {
  products: Array<ProductType>,
  onSelect: (id: number) => void,
  onNew: () => void,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  buttonsDisabled: boolean,
  forcedSelectedProductId?: number,
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const selectProduct = useCallback((id: number) => {
    if (!!forcedSelectedProductId && forcedSelectedProductId !== id) {
      return;
    }
    setSelected(id);
    onSelect(id);
  }, [forcedSelectedProductId]);

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
        onClick={() => { setSelected(null); onNew(); }}
      >New product</button>
    </>
  )
}