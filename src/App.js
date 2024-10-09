import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Products from './components/Products';
import Home from './components/Home';
import About from './components/About';
import BarSider from './components/BarSider';
import ProductPage from './components/Admin/Product/ProductPage';
import Login from './components/Admin/Login';
import RegisterAdmin from './components/Admin/User/RegisterAdmin';
import './components/css/BarSide.css';
import { useSelector } from 'react-redux';
import ProductEdit from './components/Admin/Product/ProductEdit';
import ViewProduct from './components/Admin/Product/ViewProduct';
import UserList from './components/Admin/User/UserList';
import ViewUser from './components/Admin/User/ViewUser';
import RegisterUser from './components/Admin/User/RegisterUser';

import DeleteUser from './components/Admin/User/DeleteUser';
import Category from './components/Admin/Category/Category';
import ProductManager from './components/Admin/Product/productManager';
import AddCat from './components/Admin/Category/AddCat';
import DeleteCat from './components/Admin/Category/DeleteCat';
import ViewComplaints from './components/Admin/Complaints/ViewComplaints';
import WriteComplaints from './components/Admin/Complaints/WriteComplaints';
import ViewCompById from './components/Admin/Complaints/ViewCompById';
import GetAllOrders from './components/Admin/Order/GetAllOrders';
import DetailsOrder from './components/Admin/Order/Buy';
import Buy from './components/Admin/Order/Buy';
import AddOrder from './components/Admin/Order/AddOrder';
import ListOrder from './components/Admin/Order/ListOrder';
import Orders from './components/Admin/Order/Orders';
import DdOrder from './components/Admin/Order/DdOrder';
import Payments from './components/Admin/Payments/ListPayments';
import ListPayments from './components/Admin/Payments/ListPayments';
import DetailsPay from './components/Admin/Payments/DetailsPay';
import './App.css';
function App() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register_admin' element={<RegisterAdmin />} />
        <Route path='/register_user' element={<RegisterUser />} />
        <Route path='/' element={<Navigate to="/login" replace />} />

        <Route
          path='/*'
          element={
            <>
              <NavBar />
              <div className="row">
                {role === '1' && (
                  <div className='col-2 side'>
                    <BarSider />
                  </div>
                )}
                <div className={role === '1' ? 'col-10' : 'col-12'}>
                  <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/productPage' element={<ProductPage />} />
                    <Route path='/view_product/:productId' element={<ViewProduct />} />
                    
                    <Route path='/Write-complaints' element={<WriteComplaints />} />
                    <Route path='/Buy/:productId' element={<Products />} />
                    <Route path='/order1' element={<AddOrder />} />
                    <Route path='/Add_Order' element={<GetAllOrders />} />
                    <Route path='/DetailsPay' element={<DetailsPay />} />

                  {/*<Route path='/get_Catogery_By_Id/:catId' element={<Category/>}/>*/ }{/* <Route path='/category' element={<Category/>}/>*/ } 

                    
                    {role === '1' && (
                      <>
                        <Route path='/productsManager' element={<ProductManager />} />
                        <Route path='/edit/:productId' element={<ProductEdit />} />
                        <Route path="/add_product" element={<ProductManager />} />
                        <Route path="/add_cat" element={<AddCat/>}/>
                        <Route path='/deleteProduct/:id' element={<ProductPage />} />
                        <Route path='/users' element={<UserList />} />
                        <Route path='/view_user/:userId' element={<ViewUser />} />
                        <Route path='/delete_user/:userId' element={<DeleteUser />} />
                        <Route path='/delete_cat/:id' element={<DeleteCat />} />
                        <Route path='/view-complaints' element={<ViewComplaints />} />
                        <Route path='/viewCompId/:id' element={<ViewCompById />} />
                        <Route path='/delete_order/:orderId' element={<GetAllOrders />} />
                        <Route path='/ListOrder' element={<ListOrder />} />
                        <Route path='/viewOrder' element={<Orders />} />
                        <Route path='/dd/:orderId' element={<DdOrder />} />
                        <Route path='/DetailsPay/:payId' element={<DetailsPay />} />
                        <Route path='/Payments' element={<ListPayments />} />
                        <Route path='/AddPayments' element={<DdOrder />} />
                        
                       


                        
                      </>
                    )}
                  </Routes>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;