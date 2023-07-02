import {Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import React, {useState} from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./card.css"
import {useDispatch, useSelector} from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addItem} from "@/pages/gift-card/index.actions";

const CardGiftComponent = ({detail}) => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const handleAddGiftIntoCart = () => {
        dispatch(addItem({detailCart : detail, quantity : count, price : 30}))
    }
    const IncNum = () => {
        setCount(count + 1);
    };
    const DecNum = () => {
        if (count > 1) setCount(count - 1);
        else {
            setCount(1);
        }
    };
    return (
        <>
            <div className="col-xs-12 col-sm-6 col-md-6 col-item mt-2" style={{}} key={detail?.id}>
                <Card>
                    <CardActionArea className="card-giftcard">
                        <CardMedia
                            component="img"
                            height={300}
                            style={{
                                backgroundPosition: "center",
                                backgroundSize: "unset",
                                backgroundRepeat: "no-repeat"
                            }}
                            image={detail?.image}
                            alt={detail?.image}
                        />
                        <CardContent className="service-list">
                            <h2 className="service-list-name">{detail?.theme}</h2>
                            <div className="service-item-name">
                                {detail?.description == null || detail?.description == '' ? "Empty" : detail?.description}
                            </div>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{float: "left"}}>
                        <div className="card cart-gift-card col-12">
                            <div className="quantity-gift-card">
                                <button onClick={DecNum}>
                                    <RemoveIcon/>
                                </button>
                                <label>{count}</label>
                                <button onClick={IncNum}>
                                    <AddIcon/>
                                </button>
                            </div>
                        </div>
                    </CardActions>

                    <CardActions style={{float: "right"}}>
                        <button className="button icon-button" onClick={() => handleAddGiftIntoCart()}>
                            <ShoppingCartIcon className="fa-solid fa-calendar-days" sx={{fontSize: 18}}
                                              style={{paddingBottom: "3px", paddingRight: "2px"}}/>
                            <span>Add to cart</span>
                        </button>
                    </CardActions>
                </Card>
            </div>

        </>
    )
}

export default CardGiftComponent