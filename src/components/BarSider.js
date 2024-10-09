import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css'; // تأكد من استيراد الأيقونات

function BarSider() {
    const role = useSelector((state) => state.auth.role);
    
    return (
        <ul className="list-unstyled">
            <li>
                <Link to='/users'>
                    <i className="bi bi-person" aria-hidden="true"></i> 
                    <span>Users</span>
                </Link>
            </li>
            <li>
                <Link to='/ProductPage'>
                    <i className="bi bi-box" aria-hidden="true"></i> 
                    <span>Products</span>
                </Link>
            </li>
            <li>
                <Link to='/ListOrder'>
                    <i className="bi bi-cart-plus" aria-hidden="true"></i> 
                    <span>Orders</span>
                </Link>
            </li>
            {role === '1' && (
                <li>
                    <Link to='/view-complaints'>
                        <i className="bi bi-exclamation-circle" aria-hidden="true"></i> 
                        <span>Complaints</span>
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default BarSider;