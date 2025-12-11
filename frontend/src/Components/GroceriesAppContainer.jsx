import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer() {
  /////////// States ///////////
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  //////////useEffect////////

  useEffect(() => {
    handleProductsFromDB();
  }, [postResponse]);

  ////////Handlers//////////
  const initialProductQuantity = (prods) =>
    prods.map((prod) => {
      return { id: prod.id, quantity: 0 };
    });

  const handleProductsFromDB = async () => {
    try {
      await axios.get("http://localhost:3000/products").then((result) => {
        setProductList(result.data);
        setProductQuantity(initialProductQuantity(result.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((result) => {
            setPostResponse(result.data);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
    setIsEditing(true);
    setPostResponse("");
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); //Backend does not store cookies, so I'm using local storage.
    navigate("/login"); //Can be changed depending on what our login is.
  };

  //Filter products
  const filteredProducts = productList.filter((product) => {
    if (priceFilter === "" || priceFilter === null) return true;
    const priceFix = String(product.price).replace(/[^0-9.]/g, "");
    const priceNumber = parseFloat(priceFix);
    if (isNaN(priceNumber)) return false;

    return priceNumber < Number(priceFilter);
  });

  /////////Renderer
  return (
    <div>
      <NavBar quantity={cartList.length} onLogout={handleLogout} />

      <div className="GroceriesApp-Container">
        <ProductForm
          handleOnSubmit={handleOnSubmit}
          postResponse={postResponse}
          handleOnChange={handleOnChange}
          formData={formData}
          isEditing={isEditing}
        />

        <div className="FilterBox">
          <h3>Filter Price</h3>
          <div>
            <label>
              Show all
              <input
                type="radio"
                name="priceFilter"
                value=""
                checked={priceFilter === ""}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              {"<2.00$"}
              <input
                type="radio"
                name="priceFilter"
                value="2"
                checked={priceFilter === "2"}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              {"<4.00$"}
              <input
                type="radio"
                name="priceFilter"
                value="4"
                checked={priceFilter === "4"}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              {"<6.00$"}
              <input
                type="radio"
                name="priceFilter"
                value="6"
                checked={priceFilter === "6"}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </label>
          </div>
        </div>

        <ProductsContainer
          products={filteredProducts}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
