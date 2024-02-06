import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, Fragment} from 'react';
import {sendCartData} from './store/cart-slice';
 

let Isinitial = true;

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    if (Isinitial){
      Isinitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);


  return (
    <Fragment>
      {notification && <Notification status={notification.status} title = {notification.title} message ={notification.message}/>}
       <Layout>
      { showcart &&<Cart />}
      <Products />
    </Layout>
    </Fragment>
   
  );
}

export default App;
