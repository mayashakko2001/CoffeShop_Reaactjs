
import Category from "./Admin/Category/Category";
import ListProducts from "./Admin/Product/ListProducts";

import Slider from "./Slider";

function Home(){
    return(
        <div className='Home'>
        <>
            <Slider/>
            
            <ListProducts/>
            </>
        </div>
    )
}
export default Home;