import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddComp } from "../../rtk/Slices/Complaints-slice";
import Swal from "sweetalert2";

function WriteComplaints() {
    const dispatch = useDispatch();
    const { loading, error, complaints } = useSelector((state) => state.ComplaintsSlice);
    const [writeComp, setComp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (writeComp) {
            dispatch(fetchAddComp(writeComp));
        }
    }, [dispatch, writeComp]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (writeComp) {
                await dispatch(fetchAddComp({ description: writeComp }));
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully added complaint',
                });
                navigate('/productPage');
                setComp(''); // إعادة تعيين القيمة بعد الإرسال
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error: Cannot add, try again!',
            });
        }
    };

    return (
        <form onSubmit={submit}>
            <label style={{color:'white'}}>Description</label>
            <input
                type="text"
                placeholder="Your problem..."
                value={writeComp}
                onChange={(e) => setComp(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default WriteComplaints;