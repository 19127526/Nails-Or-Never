import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useState} from "react";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Spin} from "antd";
import {Snackbar} from "@mui/material";
import image from "../../public/images/Untitled.jpeg"
import {isInputEmpty} from "@/utils/fotmar-date-time";
import {postContact} from "@/api-client/contact/Contact.api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";


interface emptyContactInter {
    name: any,
    email: any,
    phone: any,
    message: any,
}

const emptyContact: emptyContactInter = {
    name: undefined,
    email: undefined,
    phone: undefined,
    message: undefined
}
const ContactPage = (props: any) => {
    const {aboutUs} = props
    const [contact, setContact] = useState(emptyContact)
    const [isOpen, setIsOpen] = useState({
        state: false,
        message: ''
    });
    const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState({
        status: false,
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const handleChangePhoneNumber = (e: any) => {
        let num = e.target.value;
        if (isNaN(num) == false || num =='-' ) {
            if (num.toString().length == 3 || num.toString().length == 7) {
                if (e.target.value.length > contact?.phone?.length) {
                    setContact({...contact, phone: num + '-'})
                } else {
                    setContact({...contact, phone: num})
                }
            } else {
                setContact({...contact, phone: num})
            }
            setIsErrorPhoneNumber({
                status: false,
                message: 'Please Enter Only Number'
            })
        }
        else {
            if ( num.toString().includes("-")) {
                if (num.toString().length == 3 || num.toString().length == 7) {
                    if (e.target.value.length > contact?.phone?.length) {
                        setContact({...contact, phone: num + '-'})
                    } else {
                        setContact({...contact, phone: num})
                    }
                } else {
                    setContact({...contact, phone: num})
                }
                setIsErrorPhoneNumber({
                    status: false,
                    message: 'Please Enter Only Number'
                })
            }
            else {
                setIsErrorPhoneNumber({
                    status: true,
                    message: 'Please Enter Only Number'
                })
                setContact({...contact, phone: num})
            }
        }
    }

    const handleChangeInputText = (e: any, type: any) => {
        setContact({...contact, [type]: e.target.value})
    }

    const handleSubmitContact = async (event: any) => {
        event.preventDefault();
        if (isInputEmpty(contact.name) == false && isInputEmpty(contact.email) == false
            && isInputEmpty(contact.phone) == false && isInputEmpty(contact.message) == false) {
            const phoneTmpArr = contact.phone.toString().split("-");
            if(phoneTmpArr.length != 3) {
                setIsOpen({state: true, message: `Format Phone Number Invalid`});
            }
            else {
                const formData: emptyContactInter = {
                    name: contact?.name,
                    message: contact?.message,
                    phone: contact?.phone,
                    email: contact?.email
                }
                const postContactApi = async () => {
                    setIsLoading(true);
                    await postContact(formData)
                        .then(res => {
                            setIsOpen({state: true, message: `Send Contact Success`});
                            setContact(emptyContact);
                            setIsLoading(false)
                        })
                        .catch(err => {
                            setIsOpen({state: true, message: `Send Contact Error`});
                            setIsLoading(false)
                        })
                }
                postContactApi()
            }

        } else {
            setIsOpen({state: true, message: `Please Fill Information`});
        }
    }
    return (
        aboutUs != null ?
            <>
                <Spin spinning={isLoading}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                        <meta name="generator" content="Nails Or Never"/>
                        <title>Contact with me - {process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>
                        <meta charSet="utf-8"/>
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                        <meta name="robots" content="max-image-preview:large"/>
                        <link ref="canonical" href="https://nailsornever.com"/>

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
                        <meta property="og:title"
                              content={`Contact with me - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                        <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118,
                        ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                        mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials.
                        You can find all nail-related services and gift-card. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT},
                        we take pride in providing you with all good products and qualified services to help you rejuvenate your beauty.
                        You always feel friendly and welcome from our passionate staff who understand what you want.`}/>
                        <meta property="og:image"
                              content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                        <meta name="generator" content={`Contact with me - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>


                    </Head>

                    <Snackbar
                        autoHideDuration={3000}
                        style={{marginTop: "50px"}}
                        open={isOpen?.state as boolean}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        onClose={() => setIsOpen({...isOpen, state: false})}
                        message={`${isOpen?.message}`}
                    />

                    <div className="page-title"
                         style={{backgroundImage: `url(${image.src})`}}>
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
                                                <p><LocationOnIcon className="fa-solid fa-location-dot me-2"/>
                                                    {aboutUs?.address}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="contact-info-box">
                                                <h4>Email</h4>
                                                <a className="text-decoration-underline"
                                                   href={`mailto:${aboutUs?.email}`}>
                                                    <p><EmailIcon className="fa-solid fa-envelope me-2"/>
                                                        {aboutUs?.email}
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="contact-info-box">
                                                <h4>Phone</h4>
                                                <a className="text-decoration-underline" href={`tel:${aboutUs?.tel}`}>
                                                    <p> <LocalPhoneIcon className="fa-solid fa-phone me-2"/>
                                                        {aboutUs?.tel}
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
                                        <div className="row gy-1">
                                            <div className="col-md-12">
                                                <h2 className="title mb-0">Get in touch</h2>
                                                <p>Questions regarding our? Fill out the form below.</p>
                                            </div>

                                            <form className="col-md-12" onSubmit={handleSubmitContact}>
                                                <div className="row g-3">
                                                    <div className="col-md-12">
                                                        <label className="label-field" htmlFor="fullname">Full
                                                            name</label>
                                                        <div className="text-field">
                                                            <input autoComplete="off" type="text" name="Fullname"
                                                                   value={contact?.name}
                                                                   id="fullname" placeholder="Enter your full name"
                                                                   
                                                                   onChange={(e) => handleChangeInputText(e as any, 'name')}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label-field" htmlFor="email">Email
                                                            address</label>
                                                        <div className="text-field">
                                                            <input autoComplete="off" type="email" name="fEmail"
                                                                   id="email"
                                                                   placeholder="Enter your email address" 
                                                                   value={contact?.email}
                                                                   onChange={(e) => handleChangeInputText(e as any, 'email')}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label-field" htmlFor="phone">Phone
                                                            number</label>
                                                        <div className="text-field">
                                                            <input autoComplete="off" type="text" name="fPhone"
                                                                   id="phone"
                                                                   maxLength={12} placeholder="Enter your phone number"
                                                                   value={contact?.phone as any}
                                                                   onChange={(e) => handleChangePhoneNumber(e as any)}/>
                                                        </div>
                                                        {
                                                            isErrorPhoneNumber?.status == true ?
                                                                <span style={{color: "red"}}>{isErrorPhoneNumber?.message}</span>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <label className="label-field" htmlFor="message">Message</label>
                                                        <div className="text-field">
                                                            <textarea autoComplete="off" rows={5}
                                                                      name="fMessage" id="message"
                                                                      placeholder="Enter your message"
                                                                       value={contact?.message}
                                                                      onChange={(e) => handleChangeInputText(e as any, 'message')}></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 text-center" style={{paddingTop: "14px"}}>
                                                    <button type="submit"
                                                            value="Submit" className="button button-lg">Send Message
                                                    </button>
                                                </div>
                                            </form>


                                            {/*<FormattedInputs/>*/}
                                            {/*<div className="col-md-12" style={{marginTop: "10px"}}>*/}
                                            {/*    <Form className="row g-3"*/}
                                            {/*          size={"middle"}*/}
                                            {/*          layout="vertical"*/}
                                            {/*          autoComplete="on"*/}
                                            {/*          onFinish={handleSubmitContact} form={form}>*/}

                                            {/*        <div className="col-md-12">*/}
                                            {/*            <Form.Item*/}
                                            {/*                name="name"*/}
                                            {/*                label="Full Name"*/}
                                            {/*                rules={[*/}
                                            {/*                    {*/}
                                            {/*                        required: true,*/}
                                            {/*                        message: "Please enter full name"*/}
                                            {/*                    },*/}
                                            {/*                ]}*/}
                                            {/*            >*/}

                                            {/*                <div className="input-group">*/}
                                            {/*                    <InputAntd type="text" style={{height: "45px"}}*/}
                                            {/*                               className="form-control"*/}
                                            {/*                               value={contact?.name}*/}

                                            {/*                               onChange={(e) => handleChangeInputText(e, 'name')}*/}
                                            {/*                               placeholder="Please enter full name"*/}
                                            {/*                    />*/}
                                            {/*                </div>*/}
                                            {/*            </Form.Item>*/}
                                            {/*        </div>*/}
                                            {/*        <div className="col-md-6">*/}
                                            {/*            <Form.Item*/}
                                            {/*                name="email"*/}
                                            {/*                label="Email"*/}
                                            {/*                rules={[*/}
                                            {/*                    {*/}
                                            {/*                        required: true,*/}
                                            {/*                        message: "Please enter email"*/}
                                            {/*                    },*/}
                                            {/*                    {*/}
                                            {/*                        type: 'email',*/}
                                            {/*                        message: "Email invalid"*/}
                                            {/*                    },*/}
                                            {/*                ]}*/}
                                            {/*            >*/}

                                            {/*                <div className="input-group">*/}
                                            {/*                    <InputAntd type="text" style={{height: "45px"}}*/}
                                            {/*                               className="form-control"*/}
                                            {/*                               value={contact?.email}*/}
                                            {/*                               onChange={(e) => handleChangeInputText(e, 'email')}*/}
                                            {/*                               placeholder="Please enter my email"*/}
                                            {/*                    />*/}
                                            {/*                </div>*/}
                                            {/*            </Form.Item>*/}

                                            {/*        </div>*/}

                                            {/*        <div className="col-md-6">*/}
                                            {/*            <Form.Item*/}
                                            {/*                style={{*/}
                                            {/*                    WebkitUserSelect: "none",*/}
                                            {/*                    KhtmlUserSelect: "none",*/}
                                            {/*                    MozUserSelect: "none", msUserSelect: "none",*/}
                                            {/*                    userSelect: "none"*/}
                                            {/*                }}*/}
                                            {/*                name="phone"*/}
                                            {/*                label="Phone Number"*/}
                                            {/*                rules={[*/}
                                            {/*                    {*/}
                                            {/*                        required: true,*/}
                                            {/*                        message: "Please enter my phone number"*/}
                                            {/*                    },*/}

                                            {/*                    ({getFieldValue}) => ({*/}
                                            {/*                        validator(_, value) {*/}
                                            {/*                            let isError: boolean = false;*/}
                                            {/*                            [...value]?.map((index: any) => {*/}
                                            {/*                                const reg = /^-?\d*(\.\d*)?$/;*/}
                                            {/*                                if (reg.test(index) == false && index !== '' && index !== undefined) {*/}
                                            {/*                                    isError = true*/}
                                            {/*                                }*/}
                                            {/*                            })*/}
                                            {/*                            if (isError) {*/}
                                            {/*                                return Promise.reject(new Error('Please enter only number'));*/}
                                            {/*                            } else {*/}
                                            {/*                                return Promise.resolve();*/}
                                            {/*                            }*/}
                                            {/*                        }*/}
                                            {/*                    }),*/}
                                            {/*                    ({getFieldValue}) => ({*/}
                                            {/*                        validator(_, value) {*/}
                                            {/*                            if (value?.length != 12) {*/}
                                            {/*                                return Promise.reject(new Error('Please enter full phone number'));*/}
                                            {/*                            } else {*/}
                                            {/*                                return Promise.resolve();*/}
                                            {/*                            }*/}
                                            {/*                        }*/}
                                            {/*                    }),*/}

                                            {/*                ]}*/}
                                            {/*            >*/}
                                            {/*                <div className="input-group">*/}
                                            {/*                    <InputAntd type="text" style={{*/}
                                            {/*                        height: "45px", WebkitUserSelect: "none",*/}
                                            {/*                        KhtmlUserSelect: "none",*/}
                                            {/*                        MozUserSelect: "none", msUserSelect: "none",*/}
                                            {/*                        userSelect: "none"*/}
                                            {/*                    }}*/}
                                            {/*                               className="form-control"*/}
                                            {/*                               placeholder="Please enter my phone number"*/}
                                            {/*                               maxLength={12}*/}
                                            {/*                               max={12}*/}
                                            {/*                               aria-valuemax={12}*/}
                                            {/*                               onChange={(e) => handleChangePhoneNumber(e)}*/}
                                            {/*                               value={contact?.phone}/>*/}
                                            {/*                </div>*/}
                                            {/*            </Form.Item>*/}
                                            {/*        </div>*/}

                                            {/*        <div className="col-lg-12">*/}
                                            {/*            <Form.Item*/}
                                            {/*                name="message"*/}
                                            {/*                label="Message"*/}
                                            {/*                rules={[*/}
                                            {/*                    {*/}
                                            {/*                        required: true,*/}
                                            {/*                        message: "Please enter message"*/}
                                            {/*                    },*/}
                                            {/*                ]}*/}
                                            {/*            >*/}
                                            {/*                <div className="input-group">*/}
                                            {/*                    <TextArea rows={4} value={contact?.message}*/}
                                            {/*                              onChange={(e) => handleChangeInputText(e, 'message')}/>*/}
                                            {/*                </div>*/}
                                            {/*            </Form.Item>*/}
                                            {/*        </div>*/}

                                            {/*        <div className="col-md-12 text-center">*/}
                                            {/*            <button type="submit"*/}
                                            {/*                    value="Submit" className="button button-lg">Send Message*/}
                                            {/*            </button>*/}
                                            {/*        </div>*/}
                                            {/*    </Form>*/}


                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Spin>
            </>
            :
            <></>
    )
}

export async function getServerSideProps(context: any) {
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