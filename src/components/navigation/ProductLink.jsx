import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductLink({ productId, children, ...props }) {
  return (
    <Link to={`/products/${productId}`} {...props}>
      {children}
    </Link>
  );
}

ProductLink.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  children: PropTypes.node.isRequired,
};
