import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../rtk/Slices/userSlice";
import { Link } from "react-router-dom";
import '../../css/User.css';

function User() {
    const users = useSelector((state) => state.userSlice.users);
    const loading = useSelector((state) => state.userSlice.loading);
    const error = useSelector((state) => state.userSlice.error);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <>
            {role === 1 && (
                <Link to={'/add_admin'} className="btn btn-success">Add New Admin</Link>
            )}
            <div className="row">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div className="col-12 col-sm-6 col-md-4 mb-4" key={user.id}>
                            <div className="card user-card">
                            <img 
    className="card-img-top" 
    src="https://th.bing.com/th/id/OIP.WjKuPHyCdWrR4SuvXwRASAHaHa?rs=1&pid=ImgDetMain" 
    alt="User" 
/>
                                <div className="card-body">
                                    <h5 className="card-name">Name: {user.name}</h5>
                                    <p className="card-email">Email: {user.email}</p>
                                    <p className="card-phone">Phone: {user.phone}</p>
                                    <Link to={`/view_user/${user.id}`} className="btn btn-primary btn-sm">View Details</Link>
                                    <Link to={`/delete_user/${user.id}`} className="btn btn-danger btn-sm">Delete User</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No users found</div>
                )}
            </div>
        </>
    );
}

export default User;