import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUserById } from "../../rtk/Slices/userSlice";
import { useParams } from "react-router-dom";

function ViewUser() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const loading = useSelector((state) => state.userSlice.loading);
    const error = useSelector((state) => state.userSlice.error);
    const [currentUser, setCurrentUsers] = useState(null);
   

    useEffect(() => {
        const handleView = async () => {
            try {
                const fetchedUser = await dispatch(fetchGetUserById(userId)).unwrap();
                setCurrentUsers(fetchedUser);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        handleView();
    }, [userId, dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    // Check if currentUser is null or undefined
    if (!currentUser) return <div>No user found</div>;

    return (
        <div className="row">
              {currentUser ? (
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-name">Name: {currentUser.name}</h5>
                        <p className="card-email">Email: {currentUser.email}</p>
                        <p className="card-phone">Phone: {currentUser.phone}</p>
                    </div>
                </div>
            </div>):(<div style={{color:'white'}}>not found</div>
            )}
        </div>
    );
}

export default ViewUser;