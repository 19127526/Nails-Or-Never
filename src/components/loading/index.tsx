
import React from "react";
import Image from "../../images/alice-esthetic-logo-2.png"
import {useSelector} from "react-redux";
import {mainName} from "@/constants/label";

const LoadingComponent = () => {

    return (
        <div id="loading" >
            <div className="loading-img">
                <img
                    src="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"
                    alt={`${mainName}`}/>
            </div>
        </div>
    )
}



export default LoadingComponent