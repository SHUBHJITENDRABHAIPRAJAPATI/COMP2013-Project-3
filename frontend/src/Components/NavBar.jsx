import { useNavigate } from "react-router-dom";
export default function NavBar({ quantity, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Welcome, username</h3>
        <button type="button" onClick={onLogout} className="logoutBtn">
          Logout
        </button>
        <button type="button" onClick={() => navigate("/add-product")}>
          Add Product
        </button>
      </div>
      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
          alt="Cart"
        />
        <span>{quantity}</span>
      </div>
    </nav>
  );
}
