import { useCallback, useState } from "react";
import { Product as ProductType } from "../../model/product.interface";
import Card from "../Card/Card";
import './Shop.scss';
import ProductEditForm from "./subcomponents/ProductEditForm/ProductEditForm";
import ProductList from "./subcomponents/ProductList/ProductList";

export default function Shop({ products }: { products: Array<ProductType> }) {
  const [productList, setProductList] = useState(products.slice());
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [formActive, setFormActive] = useState(false);
  const [formDirty, setFormDirty] = useState(false);

  const getProductById = useCallback((id: number) => {
    return productList.find(p => p.id === id) || null;
  }, [productList]);

  const selectProduct = useCallback((id: number) => {
    if (formActive && formDirty) {
      return;
    }
    setSelectedProduct(getProductById(id));
    setFormActive(false);
  }, [formActive, formDirty, getProductById]);

  const startProductCreate = useCallback(() => {
    setSelectedProduct(null);
    startProductEdit();
  }, []);
  const startProductEdit = useCallback((id?: number) => {
    id && selectProduct(id);
    setFormActive(true);
    setFormDirty(false);
  }, [selectProduct]);
  
  const concludeProductEdit = useCallback((product: Omit<ProductType, 'id'>, id?: number) => {
    setFormActive(false);
    const newProductList = productList.slice();
    if (!id) {
      const newProductId = Math.max(...newProductList.map(p => p.id)) + 1;
      newProductList.push({ ...product, id: newProductId });
      setProductList(newProductList);
      selectProduct(newProductId);
      return;
    }
    const productIndex = newProductList.findIndex(p => p.id === id);
    newProductList[productIndex] = { ...product, id };
    setProductList(newProductList);
    selectProduct(id);
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
        onSelect={selectProduct}
        onNew={startProductCreate}
        onEdit={startProductEdit}
        onDelete={deleteProduct}
        buttonsDisabled={formActive && formDirty}
        forcedSelectedProductId={(formActive && formDirty) ? selectedProduct?.id : undefined}
      />
      {formActive && (
        // не уверен, что это юзкейс key. руководствовался тем, что если выбрать другой продукт, пока открыта форма,
        // то formActive не поменяется, весь этот кусок не перерисуется, и форма останется старой. поэтому заставляю его
        // по-любому перерисовываться, если выбран другой продукт
        <ProductEditForm
          key={selectedProduct?.id ?? 0}
          product={selectedProduct || undefined}
          onDirty={() => setFormDirty(true)}
          onSubmit={formValues => concludeProductEdit(formValues as ProductType, selectedProduct?.id)}
          onCancel={() => { setFormActive(false); setFormDirty(false); }}
        />
      )}
      {selectedProduct && !formActive && (
        <Card name={selectedProduct.name} price={selectedProduct.price} />
      )}
    </div>
  )
}