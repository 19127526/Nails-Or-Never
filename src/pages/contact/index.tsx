import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Form, Input} from "antd";
import {postContact} from "@/api-client/contact/Contact.api";
import {Snackbar} from "@mui/material";

const {TextArea} = Input;

const emptyContact = {
    name: undefined,
    email: undefined,
    phone: undefined,
    message: undefined
}
const ContactPage = ({aboutUs}) => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [form] = Form.useForm();
    const [contact, setContact] = useState(emptyContact)
    const [isOpen, setIsOpen] = useState({
        state : false,
        message : ''
    });
    const handleChangePhoneNumber = (e) => {
        let num = e.target.value;
        if (num.toString().length == 3 || num.toString().length == 7) {
            if (e.target.value.length > contact?.phone?.length) {
                setContact({...contact, phone: num + '-'})
            } else {
                setContact({...contact, phone: num})
            }
        } else {
            setContact({...contact, phone: num})
        }
    }

    const handleChangeInputText = (e, type) => {
        setContact({...contact, [type] : e.target.value})
    }

    const handleSubmitContact = async (formData) => {
        await postContact(formData)
            .then(res => {
                setIsOpen({state: true, message: `Send Contact Success`});
                setContact(emptyContact)
                form.setFieldsValue(emptyContact)
            })
            .catch(err => {

            })
    }


    return (
        aboutUs != null ?
            <>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="generator" content="Nails Or Never"/>
                    <title>Contact with me-{process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="max-image-preview:large"/>
                    <meta name="canonical" href="https://nailsornever.com"/>

                    <meta name="description" content={` Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        You can find all nail-related services and gift-card. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT},
                        we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty.
                        You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                    <meta name="keywords"
                          content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp; SPA,MALTA,Contact extensions`}/>
                    <meta property="og:url" content="https://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:title" content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT} &amp-Contact; SPA`}/>
                    <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        You can find all nail-related services and gift-card. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT},
                        we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty.
                        You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                    <meta property="og:image"
                          content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                    <meta name="generator"  content={`${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>



                </Head>

                <Snackbar
                    autoHideDuration={3000}
                    style={{marginTop :"50px"}}
                    open={isOpen?.state as boolean}
                    anchorOrigin={{ vertical : "top", horizontal : "right" }}
                    onClose={() => setIsOpen({...isOpen, state: false})}
                    message={`${isOpen?.message}`}
                />

                <div className="page-title"
                     style={{backgroundImage: "url(https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/page-bg.jpg)"}}>
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="text-center mb-0">Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-page-wrap contact">
                    <div className="container-lg">
                        <div className="row gy-5 gx-3 g-lg-5">
                            <div className="col-lg-6 order-1 order-lg-0">
                                <div className="heading-flex mb-4">
                                    <h2 className="title text-uppercase">Contact</h2>
                                    <h3 className="sub-title">Information</h3>
                                </div>
                                <div className="row g-2 g-sm-4 gx-md-5">
                                    <div className="col-sm-6">
                                        <div className="contact-info-box">
                                            <h4>Address</h4>
                                            <p><i
                                                className="fa-solid fa-location-dot d-sm-none me-2"></i>{aboutUs?.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="contact-info-box">
                                            <h4>Email</h4>
                                            <a className="text-decoration-underline" href={`mailto:${aboutUs?.email}`}>
                                                <p><i
                                                    className="fa-solid fa-envelope d-sm-none me-2"></i>{aboutUs?.email}
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="contact-info-box">
                                            <h4>Phone</h4>
                                            <a className="text-decoration-underline" href={`tel:${aboutUs?.tel}`}>
                                                <p><i className="fa-solid fa-phone d-sm-none me-2"></i>{aboutUs?.tel}
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="contact-info-box">
                                            <h4>Social Media</h4>
                                            <ul className="list-social">
                                                <li><a target="_blank" href="#">
                                                    <FacebookIcon className="fa-solid fa-calendar-days"
                                                                  sx={{fontSize: 20}}/>
                                                </a></li>

                                                <li><a target="_blank" href="#">
                                                    <InstagramIcon className="fa-solid fa-calendar-days"
                                                                   sx={{fontSize: 20}}/>
                                                </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 order-0 order-lg-1">
                                <div className="contact-form ps-lg-5">
                                    <div className="row gy-5">
                                        <div className="col-md-12">
                                            <h2 className="title mb-0">Get in touch</h2>
                                            <p>Questions regarding our? Fill out the form below.</p>
                                        </div>

                                        <div className="col-md-12" style={{marginTop: "10px"}}>
                                            <Form className="row g-3"
                                                  size={"middle"}
                                                  layout="vertical"
                                                  autoComplete="on"
                                                  onFinish={handleSubmitContact} form={form}>

                                                <div className="col-md-12">
                                                    <Form.Item
                                                        name="name"
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
                                                                   value={contact?.name}
                                                                   onChange={(e) => handleChangeInputText(e,'name')}
                                                                   placeholder="Please enter full name"
                                                            />
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="email"
                                                        label="Email"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please enter email"
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
                                                                   value={contact?.email}
                                                                   onChange={(e) => handleChangeInputText(e,'email')}
                                                                   placeholder="Please enter my email"
                                                            />
                                                        </div>
                                                    </Form.Item>

                                                </div>

                                                <div className="col-md-6">
                                                    <Form.Item
                                                        name="phone"
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
                                                                    if (isError == true) {
                                                                        return Promise.reject(new Error('Please enter only number'));
                                                                    } else {
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
                                                                   maxLength={12}
                                                                   onChange={(e) => handleChangePhoneNumber(e)}
                                                                   value={contact?.phone}/>
                                                        </div>
                                                    </Form.Item>
                                                </div>

                                                <div className="col-lg-12">
                                                    <Form.Item
                                                        name="message"
                                                        label="Message"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please enter message"
                                                            },
                                                        ]}
                                                    >
                                                        <div className="input-group">
                                                            <TextArea rows={4}  value={contact?.message}   onChange={(e) => handleChangeInputText(e,'message')}/>
                                                        </div>
                                                    </Form.Item>
                                                </div>

                                                <div className="col-md-12 text-center">
                                                    <button type="submit"
                                                            value="Submit" className="button button-lg">Send Message
                                                    </button>
                                                </div>
                                            </Form>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            :
            <></>
    )
}

export async function getServerSideProps(context) {
    try {
        const detailAboutUs = await getDetailAboutUs()
        const dataAboutUs = await detailAboutUs?.data;
        return {
            props: {
                aboutUs: dataAboutUs?.aboutUs[0]
            }
        }
    } catch (err) {
        return {
            props: {
                aboutUs: null,
            }
        }
    }
}

ContactPage.Layout = MainLayout
export default ContactPage