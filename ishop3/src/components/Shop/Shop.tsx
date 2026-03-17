import { useState } from "react";
import { Product as ProductType } from "../../model/product.interface";
import Product from "../Product/Product";
import './Shop.scss';

export default function Shop({ products }: { products: Array<ProductType> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [productList, setProductList] = useState(products.slice());

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
        {productList.map((product, index) => (
          <Product
            key={product.id}
            product={product}
            selected={selected === product.id}
            onSelect={() => setSelected(product.id)}
            onDelete={() => {
              // eslint-disable-next-line no-restricted-globals
              if (!confirm('Are you sure?')) {
                return;
              }
              (product.id === selected) && setSelected(null);
              const newProductList = productList.slice();
              newProductList.splice(index, 1);
              setProductList(newProductList);
            }}
          />
        ))}
      </tbody>
    </table>
  )
}