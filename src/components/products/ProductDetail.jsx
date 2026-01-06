import { useParams } from "react-router-dom";
import Header from "../Header";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div id="productPage">
      <Header />
    </div>
  );
}
