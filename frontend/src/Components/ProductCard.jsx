import { useNavigate } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  _id,
  handleDeleteProduct,
  currentUser,
}) {
  const navigate = useNavigate();

  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>

      {/*Short circuit so only admin can see edit product button and delete button*/}
      {currentUser === "admin" && (
        <div>
          <button
            id="edit-button"
            onClick={() => {
              navigate(`/edit-product/${_id}`, {
                state: { productName, brand, image, price, _id, currentUser },
              });
            }}
          >
            Edit
          </button>

          <button
            className="RemoveButton"
            onClick={() => handleDeleteProduct(_id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
