import { useCallback } from 'react';
import { Product as ProductType } from "../../../../model/product.interface";
import Product from '../../../Product/Product';
import './ProductList.scss';

export default function ProductList({
  products,
  selectedProductId,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
  changeDisabled,
}: {
  products: Array<ProductType>,
  selectedProductId: number | null,
  onSelect: (id: number) => void,
  onCreate: () => void,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  changeDisabled: boolean,
}) {
  const selectProduct = useCallback((id: number) => {
    if (changeDisabled) {
      return;
    }
    onSelect(id);
  }, [changeDisabled]);

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
              selected={selectedProductId === product.id}
              buttonsDisabled={changeDisabled}
              onSelect={() => selectProduct(product.id)}
              onEdit={() => onEdit(product.id)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </tbody>
      </table>
      <button
        className="new-product-button"
        disabled={changeDisabled}
        onClick={() => onCreate()}
      >New product</button>
    </>
  )
}