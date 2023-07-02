import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import "./index.css"
import {Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import CardCheckOutComponent from "@/components/checkout/card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {turnOffLoading} from "@/components/loading/index.actions";
import {postCheckout} from "@/api-client/gift-card/GiftCard.api";
import {Snackbar} from "@mui/material";
import {postBooking} from "@/api-client/booking/Booking.api";
import {useRouter} from "next/router";
import {removeAllItem} from "@/pages/gift-card/index.actions";

const CheckOutPage = () => {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState({
        state : false,
        message : ''
    });
    const handleChangePhoneNumber = (e) => {
        let num = e.target.value;
        if(num.toString().length == 3 || num.toString().length == 7) {
            if(e.target.value.length > phoneNumber?.length) {
                setPhoneNumber(num + '-')
            }
            else {
                setPhoneNumber(num)
            }
        }
        else {
            setPhoneNumber(num)
        }
    }
    const giftCardPage = useSelector(state => state.GiftCardPage);
    const [totalPrice, setTotalPrice]= useState(0);
    const giftCard = giftCardPage?.cartItem;
    useEffect(() => {
        if(giftCard?.length != 0) {
        const temp = giftCard.map(index => {
            return index?.price * index?.quantity
        })
        setTotalPrice(temp.reduce((previousScore, currentScore) => previousScore + currentScore, 0))
        }
    }, [giftCard])

    const handleSubmitCheckoutGift = (form) => {
        if([...giftCard].length == 0) {
            setIsOpen({state: true, message: `Cart Item Empty, Please Select Cart Item`})
        }
        else {
            const formData = {
                full_name : form?.fullName,
                email : form?.email,
                phone : form?.phoneNumber,
                address : form?.address,
                subtotal : totalPrice,
                discount : 0,
                tax : 0,
                total : totalPrice,
                method :"cash",
                gift_cards : [...giftCard]?.map(index => {
                    return {
                        gift_card : index?.detailCart?.id,
                        price : index?.price,
                        quantity : index?.quantity

                    }
                })
            }
            const postCheckoutApi = async () => {
                await postCheckout(formData)
                    .then(res => {
                        dispatch(removeAllItem())
                        router.push({
                            pathname : process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_ROUTER as string,
                            query : {
                                name : form?.fullName
                            }
                        })
                        setIsOpen({
                            state : true,
                            message: 'Check out success'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            postCheckoutApi()
        }
    }


    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <meta name="generator" content="Nails Or Never"/>
                <title>{process.env.NEXT_PUBLIC_NAME_PRODUCT} – Checkout GiftCard</title>
            </Head>
            <div className="page-title"
                 style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center mb-0">Checkout</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                autoHideDuration={3000}
                style={{marginTop :"50px"}}
                open={isOpen?.state as boolean}
                anchorOrigin={{ vertical : "top", horizontal : "right" }}
                onClose={() => setIsOpen({...isOpen, state: false})}
                message={`${isOpen?.message}`}
            />
            <section className="section-page-wrap" style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <div className="container-lg">
                    <div className=" container-fluid my-5 ">
                        <div className="row justify-content-center">
                            <div className="col-xl-12">
                                <div>
                                    <div className="row justify-content-around">
                                        <div className="col-md-6">
                                            <div className="card border-0">
                                                <div className="card-header pb-0" style={{background:"white"}}>
                                                    <h2 className="card-title space ">Checkout</h2>
                                                    <p className="card-text text-muted mt-4 space">SHIPPING DETAIL</p>
                                                </div>
                                                <div className="card-body card-check-out">
                                                    <Form
                                                        size={"middle"}
                                                        layout="vertical"
                                                        autoComplete="on"
                                                        onFinish={handleSubmitCheckoutGift}
                                                    >
                                                        <div className="card-body "
                                                             style={{padding: "0rem 1.25rem 0rem 1.25rem"}}>
                                                            <Form.Item
                                                                name="fullName"
                                                                label="Full Name"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please enter full name"
                                                                    },
                                                                ]}
                                                            >

                                                                <div className="input-group">
                                                                    <Input type="text" style={{height: "45px"}}
                                                                           className="form-control"
                                                                           placeholder="Please enter full name"
                                                                    />
                                                                </div>
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="address"
                                                                label="Address"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please enter my address"
                                                                    },
                                                                ]}
                                                            >

                                                                <div className="input-group">
                                                                    <Input type="text" style={{height: "45px"}}
                                                                           className="form-control"
                                                                           placeholder="Please enter my address"
                                                                    />
                                                                </div>
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="email"
                                                                label="Email"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please enter my email"
                                                                    },
                                                                    {
                                                                        type: 'email',
                                                                        message: "Email invalid"
                                                                    },
                                                                ]}
                                                            >

                                                                <div className="input-group">
                                                                    <Input type="text" style={{height: "45px"}}
                                                                           className="form-control"
                                                                           placeholder="Please enter my email"
                                                                    />
                                                                </div>
                                                            </Form.Item>

                                                            <Form.Item
                                                                name="phoneNumber"
                                                                label="Phone Number"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please enter my phone number"
                                                                    },

                                                                    ({getFieldValue}) => ({
                                                                        validator(_, value) {
                                                                            let isError = false;
                                                                            [...value]?.map(index => {
                                                                                const reg = /^-?\d*(\.\d*)?$/;
                                                                                if (reg.test(index) || index === '' || index === undefined) {

                                                                                } else {
                                                                                    isError = true
                                                                                }
                                                                            })
                                                                            if(isError == true) {
                                                                                return Promise.reject(new Error('Please enter only number'));
                                                                            }
                                                                            else {
                                                                                return Promise.resolve();
                                                                            }


                                                                        }
                                                                    }),
                                                                    ({getFieldValue}) => ({
                                                                        validator(_, value) {
                                                                            if (value?.length != 12) {
                                                                                return Promise.reject(new Error('Please enter full phone number'));
                                                                            } else {
                                                                                return Promise.resolve();
                                                                            }
                                                                        }
                                                                    }),

                                                                ]}
                                                            >

                                                                <div className="input-group">
                                                                    <Input type="text" style={{height: "45px"}}
                                                                           className="form-control"
                                                                           placeholder="Please enter my phone number"
                                                                           maxLength={12}  onChange={(e) => handleChangePhoneNumber(e)} value={phoneNumber}/>
                                                                </div>
                                                            </Form.Item>
                                                        </div>

                                                        <div
                                                             style={{
                                                                 display: "flex",
                                                                 justifyContent: "center",
                                                                 backgroundColor: "initial",
                                                                 padding: "0px 0 5px 0"
                                                             }}>
                                                            <button className="button icon-button" type="submit"
                                                                    value="Submit"
                                                                    style={{padding: " 0.375rem 1.0rem"}}>
                                                                <ShoppingCartIcon className="fa-solid fa-calendar-days"
                                                                                  sx={{fontSize: 18}} style={{
                                                                    paddingBottom: "3px",
                                                                    paddingRight: "2px"
                                                                }}/>
                                                                <span>Checkout</span>
                                                            </button>
                                                        </div>
                                                    </Form>

                                                    <div className="col-lg-12 col-xl-12 mt-2">
                                                        <div className="purchase-text">
                                                            <p>By clicking 'Checkout' you agree to our
                                                                privacy policy and terms of service.
                                                                You also agree to receive periodic email updates,
                                                                discounts, and special offers.</p>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="card border-0 ">
                                                <div className="card-header card-2" style={{background: "#FFFFFF"}}>
                                                    <p className="card-text text-muted mt-md-4   space">
                                                        YOUR ORDER
                                                    </p>
                                                    <hr className="my-2"/>

                                                    <div className="master-container">
                                                        <div className="card-check-out cart">
                                                            {
                                                                [...giftCard]?.map((index, number) => (
                                                                    <>
                                                                        {number != 0 ? <hr/> : <></>}
                                                                        <CardCheckOutComponent index={index}/>
                                                                    </>
                                                                ))
                                                            }

                                                        </div>

                                                        <div className="card-check-out checkout">
                                                            <h3 style={{
                                                                padding: "10px 10px 0px 10px",
                                                                marginBottom: "0px"
                                                            }}>Checkout Price</h3>
                                                            <hr/>
                                                            <div className="details"
                                                                 style={{padding: "0px 10px 0px 10px"}}>
                                                                <span>Subtotal:</span>
                                                                <span>${totalPrice}</span>
                                                                <span>Tax/Fee</span>
                                                                <span>$0</span>
                                                                <span>Total:</span>
                                                                <span>${totalPrice}</span>
                                                            </div>
                                                            <div className="checkout--footer-checkout">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

CheckOutPage.Layout = MainLayout
export default CheckOutPage
