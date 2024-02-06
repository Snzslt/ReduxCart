import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, Fragment} from 'react';
import {uiActions} from './store/ui-slice'; 

let Isinitial = true;

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'sending...',
      message: 'send cart data!',
    })
    );
    const response = await fetch(
     'https://redu-fe8a8-default-rtdb.firebaseio.com/cart.json', 
    {
      method: 'PUT',
      body: JSON.stringify(cart),
    }
    );
    if(!response.ok){
      throw new Error('Sending cart data failed.');
    }

    
    const responseData = await response.json();

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'sent cart data succeddfully',
    })
    );
    };
    if(Isinitial){
      Isinitial = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'sending cart data failed!',
      })
      );
    });
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
