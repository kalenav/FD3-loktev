import { useCallback, useMemo, useState } from "react";
import { Product as ProductType } from "../../model/product.interface";
import Card from "../Card/Card";
import './Shop.scss';
import ProductEditForm from "./subcomponents/ProductEditForm/ProductEditForm";
import ProductList from "./subcomponents/ProductList/ProductList";

export default function Shop({ products }: { products: Array<ProductType> }) {
  const [productList, setProductList] = useState(products.slice());
  const [formActive, setFormActive] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = useMemo(() => {
    return productList.find(p => p.id === selectedProductId) || null;
  }, [productList, selectedProductId]);

  const concludeProductEdit = useCallback((product: Omit<ProductType, 'id'>, id?: number) => {
    const productIndex = id ? productList.findIndex(p => p.id === id) : productList.length;
    id ??= Math.max(...productList.map(p => p.id)) + 1;
    const newProductList = productList.slice();
    newProductList[productIndex] = { ...product, id };
    setProductList(newProductList);
  }, [productList]);

  const deleteProduct = useCallback((id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure?')) {
      return;
    }
    const newProductList = productList.slice();
    newProductList.splice(newProductList.findIndex(p => p.id === id), 1);
    setProductList(newProductList);
  }, [productList]);

  return (
    <div className="shop">
      <ProductList
        products={productList}
        onSelect={id => {
          setSelectedProductId(id);
          setFormActive(false);
        }}
        onCreate={() => {
          setSelectedProductId(null);
          setFormActive(true);
          setFormDirty(false);
          setCreating(true);
        }}
        onEdit={id => {
          setSelectedProductId(id);
          setFormActive(true);
          setFormDirty(false);
        }}
        onDelete={deleteProduct}
        сhangeDisabled={creating || (formActive && formDirty)}
      />
      {formActive && (
        <ProductEditForm
          key={selectedProduct?.id ?? 0}
          product={selectedProduct || undefined}
          onDirty={() => setFormDirty(true)}
          onSubmit={formValues => {
            concludeProductEdit(formValues as Omit<ProductType, 'id'>, selectedProduct?.id);
            setFormActive(false);
            setCreating(false);
          }}
          onCancel={() => { setFormActive(false); setCreating(false); }}
        />
      )}
      {selectedProduct && !formActive && (
        <Card name={selectedProduct.name} price={selectedProduct.price} />
      )}
    </div>
  )
}