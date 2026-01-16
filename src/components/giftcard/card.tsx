import {Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import React, {useState} from "react";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./card.css"
import {useDispatch, useSelector} from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addItem} from "@/pages/gift-card/index.actions";

const CardGiftComponent = (props : any) => {
    const {detail} = props
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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            style={{ height: '100%', width: '100%' }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(127, 166, 129, 0.2)',
                        transform: 'translateY(-5px)'
                    }
                }}
            >
                <CardActionArea 
                    className="card-giftcard"
                    sx={{ flex: 1 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <CardMedia
                            component="img"
                            height={300}
                            sx={{
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                objectFit: "cover",
                                transition: 'transform 0.3s ease'
                            }}
                            image={detail?.image}
                            alt={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}-${detail?.theme}`}
                        />
                    </motion.div>
                    <CardContent className="service-list">
                        <motion.h2 
                            className="service-list-name"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {detail?.theme}
                        </motion.h2>
                        <motion.div 
                            className="service-item-name"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {detail?.description == null || detail?.description == '' ? "Empty" : detail?.description}
                        </motion.div>
                    </CardContent>
                </CardActionArea>
                <CardActions 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '12px 16px',
                        gap: 2
                    }}
                >
                    <motion.div 
                        className="card cart-gift-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="quantity-gift-card">
                            <motion.button 
                                onClick={DecNum}
                                whileHover={{ backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.9 }}
                                style={{ cursor: 'pointer' }}
                            >
                                <RemoveIcon sx={{ fontSize: 18, color: '#7fa681' }} />
                            </motion.button>
                            <motion.label
                                key={count}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {count}
                            </motion.label>
                            <motion.button 
                                onClick={IncNum}
                                whileHover={{ backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.9 }}
                                style={{ cursor: 'pointer' }}
                            >
                                <AddIcon sx={{ fontSize: 18, color: '#7fa681' }} />
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.button 
                        className="button icon-button" 
                        onClick={() => handleAddGiftIntoCart()}
                        whileHover={{ scale: 1.05, backgroundColor: '#7fa681' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ShoppingCartIcon 
                            sx={{fontSize: 18}}
                            style={{paddingBottom: "3px", paddingRight: "2px"}}
                        />
                        <span>Add to cart</span>
                    </motion.button>
                </CardActions>
            </Card>
        </motion.div>
    )
}

export default CardGiftComponent