import MainLayout from "@/components/layout/main";
import Head from "next/head";
import React, {useEffect, useState} from "react";


import {
    Avatar as AvatarMui,
    Box,
    Button,
    Collapse,
    List as ListMui,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Step,
    StepButton,
    Stepper
} from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import {Checkbox, Descriptions, Form, Input, List as ListAntd, Spin} from 'antd';
import VirtualList from 'rc-virtual-list';
import {getAllEmployee, getFreeTimeByDate, getFreeTimeByEmIdAndDate} from "@/api-client/employee/Employee.api";
import {getSubServicePagination} from "@/api-client/service/Services.api";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Dayjs} from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {DigitalClock, TimeView} from '@mui/x-date-pickers';
import {
    convertDateStrToNumber,
    convertHourToMinutes,
    convertMinuteToHour,
    convertStringToTime,
    getFormatDate,
    getTimeBooking
} from "@/utils/fotmar-date-time";
import {getDetailAboutUs} from "@/api-client/about-us/AboutUs.api";
import {convertWorkingHourToBookingArray, getTimeAndUnit} from "@/utils/format-working-hour";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {postBooking} from "@/api-client/booking/Booking.api";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "@/components/loading/index.actions";
import {useRouter} from "next/router";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LoadingComponent from "@/components/loading";
import "./loading.css"
import {isEmpty} from "@/utils/format-price";
import image from "../../public/images/Untitled.jpeg"
interface stepInterFace {
    label: string,
    icon: JSX.Element,
}

const {TextArea} = Input;

interface activeStepInterFace {
    number: number,
    label: string,
}




const LoadingBooking = () => {
    return (
        <div className="loading-booking">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

const steps: stepInterFace[] = [
    {
        icon: <HomeRepairServiceIcon/>,
        label: "Select Service"
    },
    {
        icon: <CalendarMonthIcon/>,
        label: "Select Staff & Time"
    },
    {
        icon: <ContactsIcon/>,
        label: "Fill Information"
    }
];

let busyTime : any[] = [];
const emptyInformation = {
    fullName: '',
    email: '',
    phoneNumber: '',
    note: ''
}
interface employeeInter{
    id : any,
    full_name : any,
    email : any,
    address : any,
    phone_number : any,
    image : any,
    status : any
}
const BookingPage = (props : any) => {
    const {employee, service} = props
    const [isLoading,setIsLoading] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState({
        employee: {} as employeeInter,
        date: '' as string,
        time: '' as string,
        distanceTime: '' as string,
        timeBusy: [] as any[],
        service: [] as any[]
    });
    const [detailAboutUs, setDetailAboutUs] = useState({
        id: undefined,
        name: undefined,
        description: undefined,
        working_hour: undefined,
        tel: undefined,
        email: undefined,
        address: undefined,
        footage: undefined
    })
    const [isOpen, setIsOpen] = useState({
        state: false,
        message: ''
    });
    const [currentTime, setCurrentTime] = useState<Dayjs | null>(null)
    const [currentDate, setCurrentDate] = useState(-1)
    const [activeStep, setActiveStep] = useState<activeStepInterFace>({label: steps[0]?.label as string, number: 0});
    const [listIsOpen, setListIsOpen] = useState(new Array(service?.services?.length).fill(false));
    const totalSteps = () => {
        return steps.length;
    };
    const router = useRouter()

    const [information, setInformation] = useState(emptyInformation)
    const dispatch = useDispatch()


    useEffect(() => {
        const getDetailAboutUsApi = async () => {
            await getDetailAboutUs()
                .then(res => {
                    setDetailAboutUs(res?.data?.aboutUs[0])
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        }
        getDetailAboutUsApi()
    }, [])

    const handleClickBooking = (e : any) => {
    }

    const handleNext = () => {
        if (activeStep?.number + 1 == 2) {
            if (selectedBooking?.service?.length == 0 || selectedBooking?.date == '' ||
                isEmpty(selectedBooking?.employee) == true || selectedBooking?.time == ''
                || currentTime == null
                || selectedBooking?.distanceTime == '') {
                setIsOpen({
                    state: true,
                    message: 'You need to choose full information'
                })
            } else {
                setActiveStep((prevActiveStep) => ({
                    number: prevActiveStep?.number + 1,
                    label: steps[prevActiveStep?.number + 1]?.label
                } as activeStepInterFace))
            }
        } else {
            setActiveStep((prevActiveStep) => ({
                number: prevActiveStep?.number + 1,
                label: steps[prevActiveStep?.number + 1]?.label
            } as activeStepInterFace))
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => ({
            number: prevActiveStep?.number - 1,
            label: steps[prevActiveStep?.number - 1]?.label
        } as activeStepInterFace));
    };

    const handleStep = (step: activeStepInterFace) => () => {
        if (step?.number == 2) {
            if (selectedBooking?.service?.length == 0 || selectedBooking?.date == '' ||
                isEmpty(selectedBooking?.employee) == true || selectedBooking?.time == ''
                || currentTime == null
                || selectedBooking?.distanceTime == '') {
                setIsOpen({
                    state: true,
                    message: 'You need to choose full information'
                })
            } else {
                setActiveStep(step);
            }
        } else {
            setActiveStep(step);
        }

    };

    const handleSelectEmploy = (index : any) => {
        setIsLoading(true)
        if (selectedBooking?.employee != undefined) {
            if (index?.id == selectedBooking?.employee?.id) {
                setSelectedBooking({...selectedBooking, employee: {} as employeeInter})
            } else {
                setSelectedBooking({...selectedBooking, employee: index})
            }
        } else {
            setSelectedBooking({...selectedBooking, employee: index})
        }
        setCurrentTime(null)
    }


    const handleOpenCollapse = (number : any) => {
        const data = listIsOpen?.map((index : any, numberTemp : any) => {
            if (numberTemp == number) {
                return !index;
            }
            return index
        })
        setListIsOpen(data);
    }

    const handleChangeDate = async (e : any) => {
        const dateTemp = e?.$d?.toString()?.split(" ")[0]
        setCurrentDate(convertDateStrToNumber(dateTemp) as number)
        const date = getFormatDate({day: e?.$D, month: Number(e?.$M) + 1, year: e?.$y});

        if(selectedBooking?.date == '' || selectedBooking?.date != date) {
            setSelectedBooking({...selectedBooking, date: date as string});
            setIsLoading(true)
            setCurrentTime(null)
        }
        else {
            setSelectedBooking({...selectedBooking, date: date as string});
            setCurrentTime(null)
        }
    }

    useEffect(() => {
        const getTimeByEmployIdAndDate = async () => {
            if (selectedBooking?.date != '') {
                if (isEmpty(selectedBooking?.employee) == true) {
                    await getFreeTimeByDate(selectedBooking?.date as string)
                        .then(res => {
                            setIsLoading(false)
                            // employee = res?.data?.data
                        })
                        .catch(err => {
                        })
                } else {
                    await getFreeTimeByEmIdAndDate(selectedBooking?.employee?.id as number, selectedBooking?.date as string)
                        .then(res => {
                            setIsLoading(false)
                            setSelectedBooking({...selectedBooking, timeBusy : res?.data?.busyTime as any[]})
                        })
                        .catch(err => {
                        })
                }
            }
            else {
                setIsLoading(false)
            }
        }
        getTimeByEmployIdAndDate()
    }, [selectedBooking?.employee, selectedBooking?.date])

    const handleChangeTime = (e : any) => {
        const formatTime = getTimeBooking({hour: e?.$H, minute: e?.$m});
        let numberHour = (convertHourToMinutes(formatTime));
        if (selectedBooking?.service?.length != 0) {
            selectedBooking?.service?.map((index : any) => {
                numberHour += Number(index?.time)
            })
        }
        const hourAfterService = convertMinuteToHour(numberHour);
        if (busyTime?.filter(index => index == numberHour || index == Number(numberHour+5) || index == Number(numberHour-5))[0] != undefined) {
            setIsOpen({state: true, message: `You can\'t booking in this time ${formatTime} - ${hourAfterService}`})
        } else {
            setCurrentTime(e as Dayjs)
            setSelectedBooking({
                ...selectedBooking,
                time: formatTime,
                distanceTime: `${getTimeAndUnit(formatTime)} - ${getTimeAndUnit(hourAfterService)}`
            })
        }
    }

    const shouldDisableTime = (value: Dayjs, view: TimeView) => {
        const hour = value.hour();
        const minute = value.minute();
        const isInto = convertWorkingHourToBookingArray(detailAboutUs?.working_hour)?.filter(index => [...index?.currentDate]?.includes(currentDate))
        const valueTemp = convertHourToMinutes(getTimeBooking({hour: hour, minute: minute}))
        if (isInto[0] != undefined) {
            const hourOpenTime = convertStringToTime(isInto[0]?.time?.start).hour;
            const minuteOpenTime = convertStringToTime(isInto[0]?.time?.start).minute;
            const hourCloseTime = convertStringToTime(isInto[0]?.time?.end).hour;
            const minuteCloseTime = convertStringToTime(isInto[0]?.time?.end).minute;
            const open = convertHourToMinutes(getTimeBooking({hour:hourOpenTime, minute: minuteOpenTime}));
            const close = convertHourToMinutes(getTimeBooking({hour:hourCloseTime, minute: minuteCloseTime}));
            if(open > valueTemp || close < valueTemp) {
                busyTime.push(valueTemp)
                return true;
            }
        }
        if(selectedBooking?.timeBusy?.length !=0 && selectedBooking?.timeBusy != undefined) {
            if (selectedBooking?.timeBusy?.length == 1) {
                const start = convertHourToMinutes(selectedBooking?.timeBusy[0]?.booking_time)
                const end = convertHourToMinutes(selectedBooking?.timeBusy[0]?.finished_time)
                if (start <= valueTemp && end >= valueTemp) {
                    busyTime.push(valueTemp)
                    return true;
                }
            } else {
                let condition = '';
                const data = [...selectedBooking?.timeBusy]?.map((index : any, number : any) => {
                    const start = convertHourToMinutes(index?.booking_time)
                    const end = convertHourToMinutes(index?.finished_time);
                    if (number == 0) {
                        condition += `((${start} <= ${valueTemp} && ${end} >= ${valueTemp})||`;
                    } else if (number == [...selectedBooking?.timeBusy]?.length - 1) {
                        condition += `(${start} <= ${valueTemp} && ${end} >= ${valueTemp}))`;
                    } else {
                        condition += `(${start} <= ${valueTemp} && ${end} >= ${valueTemp})||`;
                    }
                })
                if (eval(condition)) {
                    busyTime.push(valueTemp)
                    return true;
                }
            }
        }
        return false
    };

    const handleSelectService = (index : any) => {
        const data = [...selectedBooking?.service];
        if (selectedBooking?.service.length == 0 || data?.filter(indexTemp => indexTemp?.id == index?.id)[0] == undefined) {
            data?.push(index);
            setCurrentTime(null);
            setSelectedBooking({...selectedBooking, service: data})
        } else if (data?.filter(indexTemp => indexTemp?.id == index?.id)[0] != undefined) {
            const dataTemp = data?.map((indexTemp : any) => {
                if (indexTemp?.id == index?.id) {
                    return undefined
                }
                return indexTemp
            }).filter(index => index != undefined);
            setCurrentTime(null);
            setCurrentTime(null);
            setSelectedBooking({...selectedBooking, service: dataTemp as any[]})
        }
    }


    const handleChangePhoneNumber = (e : any) => {
        let num = e.target.value;
        if (num.toString().length == 3 || num.toString().length == 7) {
            if (e.target.value.length > information?.phoneNumber?.length) {
                setInformation({...information, phoneNumber: num + '-'})
            } else {
                setInformation({...information, phoneNumber: num})
            }
        } else {
            setInformation({...information, phoneNumber: num})
        }
    }
    const handeChangeInputText = (e : any, type : any) => {
        let data = e.target.value;
        setInformation({...information, [type]: data})
    }

    const handleSubmitBooking = async (form : any) => {
        const formData = {
            full_name: form?.full_name,
            cellphone_number: form?.cellphone_number,
            email: form?.email,
            appointment_note: form?.appointment_note,
            services: selectedBooking?.service?.map((index : any) => {
                return index?.id
            }),
            employees_id: selectedBooking?.employee?.id,
            booking_date: selectedBooking?.date,
            booking_time: selectedBooking?.time + ":00",
        }
        const postBookingApi = async () => {
            setIsLoading(true)
            await postBooking(formData)
                .then(res => {
                    setIsOpen({state: true, message: "Success"})
                    router.push({
                        pathname: process.env.NEXT_PUBLIC_BOOKING_SUCCESS_ROUTER as string,
                        query: {
                            name: form?.full_name
                        }
                    })
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoading(false)
                    setIsOpen({state: true, message: "Your booking has been booked by someone else"})
                })
        }
        postBookingApi()
    }

    return (
        employee != null && service != null ?
            <Spin spinning={isLoading} >
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible"content="IE=edge"/>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <meta name="robots" content="max-image-preview:large"/>
                      <link ref="canonical" href="https://nailsornever.com"/>
                    <title>Booking Service Nail - {process.env.NEXT_PUBLIC_NAME_PRODUCT}</title>
                    <meta name="description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services, from ${[...service?.services]?.map(index => `${index?.name}`)}, We can booking with ${employee?.employees?.length} employess. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    `}/>
                    <meta name="keywords"
                          content={`AMERICA NAILS &amp; SPA,MALTA,Booking Nail Service extensions`}/>
                    <meta property="og:url" content="https://nailsornever.com/"/>
                    <meta property="og:type" content="Website"/>
                    <meta property="og:title" content={`Booking Service Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>
                    <meta property="og:description" content={`Located conveniently in Malta, NewYork, 12118, 
                    ${process.env.NEXT_PUBLIC_NAME_PRODUCT} is one of the best salons in this area. ${process.env.NEXT_PUBLIC_NAME_PRODUCT} offers premier nails care and spa treatment services to satisfy your needs of enhancing natural beauty and refreshing your day.
                    mynewline Our salon takes pride in providing our valued customers all good services and top-high quality products as well as materials. 
                    You can find all nail-related services, from ${[...service?.services]?.map(index => `${index?.name}`)},  We can booking with ${employee?.employees?.length} employess. At ${process.env.NEXT_PUBLIC_NAME_PRODUCT}, 
                    `}/>
                    <meta property="og:image"
                          content="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"/>
                    <meta name="generator"  content={`Booking Service Nail - ${process.env.NEXT_PUBLIC_NAME_PRODUCT}`}/>



                </Head>

                <div className="page-title"
                     style={{backgroundImage: `url(${image.src})`}}>
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="text-center mb-0">Booking</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="section-page-wrap" style={{paddingTop: "30px", paddingBottom: "30px"}}>
                    <Snackbar
                        autoHideDuration={3000}
                        style={{marginTop: "50px"}}
                        open={isOpen?.state as boolean}
                        anchorOrigin={{vertical: "top", horizontal: "right"}}
                        onClose={() => setIsOpen({...isOpen, state: false})}
                        message={`${isOpen?.message}`}
                    />
                    <div className="container-lg">
                        <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                            <div className="col-sm-9 col-md-12 col-lg-4">
                                <Box sx={{maxWidth: 10000}}>
                                    <Stepper activeStep={activeStep?.number as number} nonLinear orientation="vertical">
                                        {steps.map((index : any, number : any) =>  (
                                            <Step key={index?.label}>
                                                <StepButton icon={index?.icon}
                                                            color="inherit"
                                                            onClick={handleStep({
                                                                label: index?.label as string,
                                                                number: number as number
                                                            } as activeStepInterFace)}
                                                            className={activeStep?.number == number ? "button icon-button ms-xl-4 button-step active" : "button icon-button ms-xl-4 button-step"}>
                                                    {index?.label}
                                                </StepButton>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </div>

                            <div className="col-lg-8 col-md-12">
                                <React.Fragment>
                                    <div className="row">
                                        {
                                            activeStep?.number == 0 ?
                                                <>
                                                    <div className="pb-0">
                                                        <h2 className="card-title space ">List Service</h2>
                                                        <hr className="my-0"/>
                                                    </div>
                                                    <ListMui
                                                        sx={{width: '100%', bgcolor: 'background.paper'}}
                                                        component="nav"
                                                        aria-labelledby="nested-list-subheader"
                                                    >
                                                        {
                                                            service?.services?.map((index : any, number : any) => (
                                                                <>

                                                                    <ListItemButton
                                                                        onClick={() => handleOpenCollapse(number)}>
                                                                        <ListItemText primary={index?.name}/>
                                                                        {listIsOpen[number] ? <ExpandLessIcon/> :
                                                                            <ExpandMoreIcon/>}
                                                                    </ListItemButton>
                                                                    <Collapse in={listIsOpen[number]} timeout="auto"
                                                                              unmountOnExit>
                                                                        <ListMui component="div" disablePadding>
                                                                            {
                                                                                index?.service?.map((index : any) => (
                                                                                    <ListItemButton sx={{pl: 4}}
                                                                                                    onClick={() => handleSelectService(index)}>
                                                                                        {
                                                                                            selectedBooking?.service?.filter(indexTemp => indexTemp?.id == index?.id)[0] != undefined ?
                                                                                                <>
                                                                                                    <ListItemIcon>
                                                                                                        <Checkbox
                                                                                                            checked={true}/>
                                                                                                    </ListItemIcon>
                                                                                                    <span>
                                                                                                        <ListItemText
                                                                                                            primary={`${index?.name} (${index?.time} minutes)`}/>
                                                                                                        <ListItemText
                                                                                                            primary={`$${index?.price}`}/>
                                                                                                    </span>
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <ListItemIcon>
                                                                                                        <Checkbox/>
                                                                                                    </ListItemIcon>
                                                                                                    <span>
                                                                                                        <ListItemText
                                                                                                            primary={`${index?.name} (${index?.time} minutes)`}/>
                                                                                                        <ListItemText
                                                                                                            primary={`$${index?.price}`}/>
                                                                                                    </span>
                                                                                                </>
                                                                                        }
                                                                                    </ListItemButton>
                                                                                ))
                                                                            }

                                                                        </ListMui>
                                                                    </Collapse>
                                                                </>
                                                            ))
                                                        }

                                                    </ListMui>
                                                </>
                                                :
                                                activeStep?.number == 1 ?

                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <div className="pb-0">
                                                                <h2 className="card-title space ">List Employee</h2>
                                                                <hr className="my-0"/>
                                                            </div>
                                                            <ListAntd>
                                                                <VirtualList
                                                                    itemKey={"employee"}
                                                                    data={employee?.employees}
                                                                    height={300}
                                                                    itemHeight={employee?.employees?.length}
                                                                >
                                                                    {(item, number) => (
                                                                        <ListAntd.Item
                                                                            style={{background: selectedBooking?.employee?.id == item?.id ? "#7fa681" : "none"}}
                                                                            key={item?.id} actions={[<button
                                                                            className="button icon-button"
                                                                            onClick={() => handleSelectEmploy(item)}>
                                                                            <span>{selectedBooking?.employee?.id == item?.id ? "Cancel" : "Select"}</span>
                                                                        </button>]}>
                                                                            <ListAntd.Item.Meta
                                                                                avatar={<AvatarMui style={{
                                                                                    marginLeft: "5px",
                                                                                    backgroundRepeat: "no-repeat",
                                                                                    backgroundPosition: "center",
                                                                                    backgroundImage: `url(${item?.image})`,
                                                                                    backgroundSize: "contain"
                                                                                }}/>}
                                                                                // src={item?.image}
                                                                                title={<a>{item?.full_name}</a>}
                                                                                description={item.email}
                                                                            />
                                                                        </ListAntd.Item>
                                                                    )}
                                                                </VirtualList>
                                                            </ListAntd>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="pb-0">
                                                                <h2 className="card-title space ">Date & Time</h2>
                                                                <hr className="my-0"/>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-8 col-md-12">
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <h4 className="card-title space"
                                                                            style={{textAlign: "center"}}>Date</h4>
                                                                        <DateCalendar disablePast
                                                                                      onChange={(e) => handleChangeDate(e)}/>
                                                                    </LocalizationProvider>
                                                                </div>
                                                                {
                                                                    selectedBooking?.date != undefined ?
                                                                        <div className="col-lg-4 col-md-12">
                                                                            <h4 className="card-title space"
                                                                                style={{textAlign: "center"}}>Time</h4>
                                                                            <LocalizationProvider
                                                                                dateAdapter={AdapterDayjs}>
                                                                                <DigitalClock
                                                                                             className={"digital-clock"}
                                                                                              onChange={(e) => handleChangeTime(e)}
                                                                                              shouldDisableTime={shouldDisableTime}
                                                                                              timeStep={15}

                                                                                              value={currentTime as any}
                                                                                              views={["hours"]}
                                                                                    // skipDisabled={true}
                                                                                />
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                        :
                                                                        <></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    activeStep?.number == 2 ?
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <div className="pb-0">
                                                                    <h2 className="card-title space ">Information</h2>
                                                                    <hr className="my-0"/>
                                                                </div>
                                                            </div>
                                                            <div className={"col-12 mt-3"} style={{margin:"0 0 0 2px"}} >
                                                                <Descriptions title="Service Info" bordered>
                                                                    <Descriptions.Item
                                                                        label="Date">{selectedBooking?.date}</Descriptions.Item>
                                                                    <Descriptions.Item
                                                                        label="Time">{selectedBooking?.distanceTime}</Descriptions.Item>
                                                                    <Descriptions.Item
                                                                        label="Employee">{selectedBooking?.employee?.full_name}</Descriptions.Item>
                                                                    <Descriptions.Item label="List Service">
                                                                        {
                                                                            selectedBooking?.service?.map((index : any) => (
                                                                                <>
                                                                                    {index?.name} ({index?.time} minute)
                                                                                    <br/>
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </Descriptions.Item>
                                                                </Descriptions>
                                                            </div>
                                                            <div className='col=12 mt-4'>
                                                                <Form
                                                                    size={"middle"}
                                                                    layout="vertical"
                                                                    autoComplete="off"
                                                                    onFinish={handleSubmitBooking}
                                                                >
                                                                    <div className="card-body "
                                                                         style={{padding: "0rem 1.25rem 0rem 1.25rem"}}>
                                                                        <Form.Item
                                                                            name="full_name"
                                                                            label="Full Name"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "Please enter full name"
                                                                                },
                                                                            ]}
                                                                        >

                                                                            <div className="input-group">
                                                                                <Input type="text"
                                                                                       style={{height: "45px"}}
                                                                                       className="form-control"
                                                                                       placeholder="Please enter full name"
                                                                                       value={information?.fullName}
                                                                                       onChange={(e) => handeChangeInputText(e, 'fullName')}
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
                                                                                <Input type="text"
                                                                                       style={{height: "45px"}}
                                                                                       className="form-control"
                                                                                       placeholder="Please enter my email"
                                                                                       value={information?.email}
                                                                                       onChange={(e) => handeChangeInputText(e, 'email')}
                                                                                />
                                                                            </div>
                                                                        </Form.Item>

                                                                        <Form.Item
                                                                            name="cellphone_number"
                                                                            label="Phone Number"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "Please enter my phone number"
                                                                                },

                                                                                ({getFieldValue}) => ({
                                                                                    validator(_, value) {
                                                                                        [...value]?.map((index : any) => {
                                                                                            const reg = /^-?\d*(\.\d*)?$/;
                                                                                            if (reg.test(index) || index === '' || index === undefined) {
                                                                                            } else {
                                                                                                return Promise.reject(new Error('Please enter only number'));
                                                                                            }
                                                                                        })
                                                                                        return Promise.resolve();
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
                                                                                <Input type="text"
                                                                                       style={{height: "45px"}}
                                                                                       className="form-control"
                                                                                       placeholder="Please enter my phone number"
                                                                                       maxLength={12}
                                                                                       onChange={(e) => handleChangePhoneNumber(e)}
                                                                                       value={information?.phoneNumber}/>
                                                                            </div>
                                                                        </Form.Item>


                                                                        <Form.Item
                                                                            name="appointment_note"
                                                                            label="Note"
                                                                        >
                                                                            <div className="input-group">
                                                                                <TextArea className="form-control"
                                                                                          rows={4}
                                                                                          value={information?.note}
                                                                                          onChange={(e) => handeChangeInputText(e, 'note')}/>
                                                                            </div>
                                                                        </Form.Item>


                                                                    </div>

                                                                    <div className=""
                                                                         style={{
                                                                             display: "flex",
                                                                             justifyContent: "center",
                                                                             backgroundColor: "initial",
                                                                             padding: "0px 0 5px 0"
                                                                         }}>
                                                                        <button className="button icon-button"
                                                                                type="submit"
                                                                                value="Submit"
                                                                                style={{padding: " 0.375rem 1.0rem"}}>
                                                                            <ShoppingCartIcon
                                                                                className="fa-solid fa-calendar-days"
                                                                                sx={{fontSize: 18}} style={{
                                                                                paddingBottom: "3px",
                                                                                paddingRight: "2px"
                                                                            }}/>
                                                                            <span
                                                                                onClick={(e) => handleClickBooking(e)}>Booking</span>
                                                                        </button>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                        }
                                        <div className="col-12 mb-2"
                                             style={{display: "flex", justifyContent: "space-around"}}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep?.number === 0}
                                                onClick={handleBack}
                                                sx={{mr: 1}}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                disabled={activeStep?.number == steps.length - 1 ? true : false}
                                                onClick={handleNext} sx={{mr: 1}}>
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </section>

            </Spin>

            :
            <></>
    )
}


export async function getServerSideProps(context : any) {
    try {
        // `getStaticProps` is executed on the server side.
        const listEmployee = await getAllEmployee()
        const listService = await getSubServicePagination(1 as number, 999999 as number)

        const dataService = await listService?.data;
        const dataEmployee = await listEmployee?.data;
        return {
            props: {
                employee: dataEmployee,
                service: dataService,
            }
        }
    } catch (err) {
        return {
            props: {
                employee: null,
                service: null,
            }
        }
    }
}


BookingPage.Layout = MainLayout
export default BookingPage