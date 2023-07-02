import "./card.css"
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addItem, addItemCheckout, removeItem} from "@/pages/gift-card/index.actions";
import {mainName} from "@/constants/label";

const CardCheckOutComponent = ({index}) => {
    const [quantity, setQuantity] = useState(index?.quantity);
    const [price, setPrice]= useState(index?.price);

    const dispatch = useDispatch()
    const IncNum = () => {
        dispatch(addItemCheckout({...index, quantity : quantity + 1}))
        setQuantity(quantity + 1);
    };
    const DecNum = () => {
        if (quantity > 1) {
            dispatch(addItemCheckout({...index, quantity: quantity - 1}))
            setQuantity(quantity - 1);
        }
        else {
            dispatch(removeItem({...index, price : price, quantity : 0}))
        }
    };
    const handleChangePrice = (e) => {
        const data = e.target.value;
        setPrice(data)
        dispatch(addItemCheckout({...index, price: data}))
    }
    const handleBlurPrice = (e) => {
        const data = e.target.value
        if(data < 30 || data > 350) {
            setPrice(30)
            dispatch(addItemCheckout({...index, price: 30}))
        }
    }
    return (
        <div className="products" key={index?.detailCart?.id}>
            <div className="product">
                <img src={index?.detailCart?.image} alt={`${mainName}-${index?.detailCart?.theme}`} width={40} height={40}/>
                <span>{index?.detailCart?.theme}</span>
                <div className="quantity">
                    <button onClick={DecNum}>
                        <RemoveIcon/>
                    </button>
                    <label>{quantity}</label>
                    <button onClick={IncNum}>
                        <AddIcon/>
                    </button>
                </div>
                <div className="price small">
                    <TextField
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true}}
                        sx={{ width: "70%" }}
                        size={"small"}
                        fullWidth={false}
                        style={{
                            width:"70%"
                        }}
                        value={price}
                        minRows={30}
                        maxRows={350}
                        onChange={(e) => handleChangePrice(e)}
                        onBlur={(e) => handleBlurPrice(e)}
                    />
                </div>
            </div>
            <div className="row mt-1">
                <div className={"col-12"} style={{display :"flex", justifyContent :"end", paddingRight:"30px"}}>
                    <label>Total Price: ${(Number(price) * Number(quantity))}</label>
                </div>
            </div>
        </div>
    )
}


export default CardCheckOutComponent