import { useEffect } from "react";
import { fetchGetCompById } from "../../rtk/Slices/Complaints-slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

function ViewCompById() {
    const dispatch = useDispatch();
    const { loading, error, complaints } = useSelector((state) => state.ComplaintsSlice);
    const { compID } = useParams();

    useEffect(() => {
        if (compID) {
            dispatch(fetchGetCompById(compID));
        }
    }, [dispatch, compID]);

    // تحقق مما إذا كانت الشكوى موجودة
    const complaint = Array.isArray(complaints) && complaints.length > 0 ? complaints[0] : null;

    return (
        <>
            <h1 style={{color:'white'}}>Complaint Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {complaint ? (
                <div key={complaint.id}>
                    <p><strong>ID:</strong> {complaint.id}</p>
                    <p><strong>Writer:</strong> {complaint.username}</p>
                    <p><strong>User ID:</strong> {complaint.user_id}</p>
                    <p><strong>Description:</strong> {complaint.description}</p>
                </div>
            ) : (
                <p style={{color:'white'}}>Not found</p>
            )}
        </>
    );
}

export default ViewCompById;