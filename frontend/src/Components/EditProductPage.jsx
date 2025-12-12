import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm editingId={id} />
    </div>
  );
}
