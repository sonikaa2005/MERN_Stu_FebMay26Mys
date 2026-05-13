import {useParams} from "react-router-dom";

export function MultipleDynamicParams(){
    const {userId,orderId} = useParams();
    return(
        <div>
            <h2>Multiple Dynamic Params</h2>
            <p>User ID from URl  : {userId} </p>
            <p>User ID from URl  : {userId} </p>
        </div>
    )
}