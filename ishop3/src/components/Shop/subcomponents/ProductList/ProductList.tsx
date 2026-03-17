import { useCallback, useState } from 'react';
import { Product as ProductType } from "../../../../model/product.interface";
import Product from '../../../Product/Product';
import './ProductList.scss';

export default function ProductList({
  products,
  onSelect,
  onEdit,
  onDelete,
  buttonsDisabled,
  forcedSelectedProductId,
}: {
  products: Array<ProductType>,
  onSelect: (product: ProductType) => void,
  onEdit: (product: ProductType) => void,
  onDelete: (id: number) => void,
  buttonsDisabled: boolean,
  forcedSelectedProductId?: number,
}) {
  const [selected, setSelected] = useState<ProductType | null>(null);

  const selectProduct = useCallback((product: ProductType) => {
    if (!!forcedSelectedProductId && forcedSelectedProductId !== product.id) {
      return;
    }
    setSelected(product);
    onSelect(product);
  }, [forcedSelectedProductId]);

  return (
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
            selected={selected?.id === product.id}
            buttonsDisabled={buttonsDisabled}
            onSelect={() => selectProduct(product)}
            onEdit={() => { setSelected(product); onEdit(product); }}
            onDelete={() => onDelete(product.id)}
          />
        ))}
      </tbody>
    </table>
  )
}