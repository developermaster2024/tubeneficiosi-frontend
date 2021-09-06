import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductModal from "./ProductModal";
import ProductsGrid from "./ProductsGrid";
import { useEffect, useState } from 'react';
import { generateImageUrl } from "../helpers/url";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const ProductsCollection = ({ products, isInGridView, isStore, onAddToCard }) => {

  const history = useHistory();

  const { setLoading, setCustomAlert } = useAuth();

  const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

  const [productOnModal, setProductOnModal] = useState(null);

  useEffect(() => {
    setLoading({ show: loading, message: "Añadiendo al carrito." })
  }, [loading, setLoading])

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
  }, [error, setLoading, setCustomAlert])

  useEffect(() => {
    if (data) {
      if (!isStore) {
        history.push(`/checkout?cartId=${data?.id}`);
        return;
      } else {
        onAddToCard?.(data);
        setCustomAlert?.({ show: true, message: `El producto ha sido añadido al carrito exitosamente.`, severity: "success" })
      }
    }
  }, [data, isStore, history, onAddToCard, setCustomAlert])

  const handleCloseModal = async (e) => {
    setProductOnModal(null);
    if (e) {
      await addToCart({ data: e });
    }
  }

  return (
    <div>
      {isInGridView
        ?
        <ProductsGrid>
          {products.map((product) => <div
            key={product.id}
            className="flex justify-center"
          >
            <ProductCard
              name={product.name}
              slug={product.slug}
              description={product.shortDescription || 'Sin descripción'}
              quantity={product.quantity}
              imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
              imgAlt={product.name}
              price={product.price}
              onBuy={() => { setProductOnModal(product) }}
              buttonText={isStore ? "Añadir al carrito" : "Comprar"}
            />
          </div>)}
        </ProductsGrid>
        : <div className="space-y-4">
          {products.map((product) => <ProductHorizontalCard
            key={product.id}
            name={product.name}
            slug={product.slug}
            description={product.shortDescription}
            quantity={product.quantity}
            imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
            imgAlt={product.name}
            price={product.price}
            onBuy={() => { setProductOnModal(product) }}
            storeName={product.store.name}
            storeImageSrc={generateImageUrl(product.store?.storeProfile?.logo)}
            storeImageAlt={product.store.name}
            storeSlug={product?.store?.slug}
            deliveryMethodTypes={product.deliveryMethodTypes.map(item => item.name)}

          />)}
        </div>
      }
      <ProductModal isStore={isStore} product={productOnModal} closeModal={handleCloseModal} />
    </div>
  )
};

export default ProductsCollection;