import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllComp, fetchGteCompById } from "../../rtk/Slices/Complaints-slice";
import { Link, useParams } from 'react-router-dom';
function ViewComplaints() {
    const dispatch = useDispatch();
    const { loading, error, complaints } = useSelector((state) => state.ComplaintsSlice);
    const [comp, setComp] = useState([]);
const {compID}=useParams()
    useEffect(() => {
        dispatch(fetchGetAllComp());
    }, [dispatch]);

    useEffect(() => {
        if (complaints) {
            setComp(complaints);
        }
    }, [complaints]);





    return (
        <table className="table table-striped mt-5 products-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>WRITER</th>
                    <th>USER ID</th>
                    <th>DESCRIPTION</th>
                    <th>OPERATION</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="5">Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan="5">Error: {error.message}</td>
                    </tr>
                ) : comp.length > 0 ? (
                    comp.map((complaint) => (
                        <tr key={complaint.id}>
                            <td>{complaint.id}</td>
                            <td>{complaint.username}</td>
                            <td>{complaint.user_id}</td>
                            <td>{complaint.description}</td>
                            <td>
                            <Link to={`/viewCompId/${compID}`} className="btn btn-info" style={{ fontSize: '16px', padding: '5px 10px', width: '30%' }}>VIEW</Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Can not found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ViewComplaints;