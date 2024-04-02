import { 
  CartLink, CartListItem, CartImage, CartItemInfo, 
  CartItemActions, CartButton, CartItemQuantity, 
  CartItemTitle, CartItemPrice 
} from './styles';

const calculateLineTotal = (item) => {
  const price = item.product_id.price ? parseFloat(item.product_id.price.replace(' Lei', '')) : 0;
  const lineTotal = price * item.quantity;
  return `${lineTotal.toFixed(2)} Lei`;
};

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => (
  <CartListItem>
    <CartLink to={`/products/${item.product_id._id}`}>
      <CartImage src={item.product_id.image} alt={item.product_id.name} />
    </CartLink>
    <CartItemInfo>
      <CartLink to={`/products/${item.product_id._id}`}>
        <CartItemTitle>{item.product_id.name}</CartItemTitle>
      </CartLink>
      <CartItemPrice>{calculateLineTotal(item)}</CartItemPrice>
      {item.line_total && <CartItemPrice>{item.line_total.formatted_with_symbol}</CartItemPrice>}
    </CartItemInfo>
    <CartItemActions>
      <CartButton variant="outlined" onClick={() => handleUpdateCartQty(item._id, item.quantity - 1)}>-</CartButton>
      <CartItemQuantity>{item.quantity}</CartItemQuantity>
      <CartButton variant="outlined" onClick={() => handleUpdateCartQty(item._id, item.quantity + 1)}>+</CartButton>
      <CartButton variant="contained" color="error" onClick={() => handleRemoveFromCart(item._id)}>Șterge</CartButton>
    </CartItemActions>
  </CartListItem>
);

export default CartItem;