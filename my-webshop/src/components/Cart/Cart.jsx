import { Typography, Grid } from '@mui/material';
import CartItem from './CartItem/CartItem';
import { CartContainer, CartButton, CartLink, SummaryContainer, ItemsContainer, CheckoutButton } from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      Coșul de cumpărături este gol,&nbsp;
      <CartLink to="/">
        adăugați produsele dorite
      </CartLink>
      !
    </Typography>
  );

  if (!cart.line_items) return 'Loading';

  const totalPrice = cart.line_items.reduce((total, item) => {
    const price = item.product_id.price ? parseFloat(item.product_id.price.replace(' Lei', '')) : 0;
    const lineTotal = price * item.quantity;
    return total + lineTotal;
  }, 0).toFixed(2);
  

  const renderCart = () => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h3" gutterBottom>
          Coșul tău de cumpărături.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <ItemsContainer>
          <Grid container spacing={4}>
            {cart.line_items.map((lineItem) => (
             <Grid item xs={12} sm={12} md={12} lg={12} key={lineItem._id}>
               <CartItem
                  item={lineItem}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </Grid>
              ))}
          </Grid>
        </ItemsContainer>
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryContainer>
          <Typography variant="h4">
            Total: {totalPrice ? `${totalPrice} Lei` : 'Loading...'}
          </Typography>
          <div>
            <CartButton
              size="large"
              type="button"
              variant="contained"
              color="error"
              onClick={handleEmptyCart}
            >
              Golire coș de cumpărături
            </CartButton>
            <CheckoutButton
              component={CartLink}
              to="/checkout"
              size="large"
              type="button"
              variant="contained"
            >
              Finalizare comandă
            </CheckoutButton>

          </div>
        </SummaryContainer>
      </Grid>
    </Grid>
  );
  

  return (
    <CartContainer>
    {!cart.line_items.length ? renderEmptyCart() : renderCart()}
  </CartContainer>
  );
};

export default Cart;
