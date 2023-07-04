import React, {useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import useSWR from "swr";
import {getListServicesById} from "../../../api-client/services/Services.api";
import {getAboutUs, putAboutUs} from "../../../api-client/about-us/AboutUs.api";
import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {useDispatch} from "react-redux";
import {Form, Input} from "antd";
import {classNames} from "primereact/utils";
import {InputNumber} from "primereact/inputnumber";
import {MultiSelect} from "primereact/multiselect";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {convertWorkingHourToArray, getTimeAndUnit} from "../../../util/utils";
import {Accordion, AccordionTab} from "primereact/accordion";

const AboutUsPage = () => {
  const [detailAboutUs, setDetailAboutUs] = useState({
    id: null,
    name : null,
    description: null,
    working_hour: null,
    tel: null,
    email: null,
    address: null,
    footage: null
  });

  const [workingHour, setWorkingHour] = useState([]);
  const [form] = Form.useForm();
  const {
    data: detailAboutUsApi,
    mutate: mutateDetailAboutUs,
  } = useSWR(`get-detail-about-us`, () => getAboutUs(),{
    refreshWhenHidden:false,
    revalidateOnMount:false,
    revalidateIfStale:false,
    revalidateOnFocus:false,

  });
  const toast = useRef(null);

  const handleChangeTel = (e) =>{
    let num = e.target.value
    if(num.toString().length == 3 || num.toString().length == 7) {
      setDetailAboutUs({
        ...detailAboutUs,
        tel: num + '-'
      })
    }
    else {
      setDetailAboutUs({
        ...detailAboutUs,
        tel: num
      })
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (detailAboutUsApi === undefined) {
      dispatch(turnOnLoading());
    } else {
      const data = detailAboutUsApi?.data?.aboutUs[0];
      form.setFieldsValue({
        id: data?.id,
        name : data?.name,
        description: data?.description,
        working_hour: data?.working_hour,
        tel: data?.tel,
        email: data?.email,
        address: data?.address,
        footage: data?.footage
      });
      setWorkingHour(convertWorkingHourToArray(data?.working_hour)?.map((index,number) => {
        return {
          ...index,
          key: number
        }
      }))
      setDetailAboutUs(data)
      dispatch(turnOffLoading());
    }
  }, [detailAboutUsApi, dispatch]);

  useEffect(() =>{
    mutateDetailAboutUs()
  },[mutateDetailAboutUs])


  const handleChangeText = (e, type) => {
    setDetailAboutUs({
      ...detailAboutUs,
      [type]: e.target.value
    })
  }
  const handleChangeWorkingHour = (e, key, type) => {
    const data = [...workingHour]?.map(index => {
      if(index?.key == key) {
        return {
          ...index,
          time: {
            ...index?.time,
            [type]: e.target.value,
          }
        }
      }
      return index
    })
    console.log(data)
    setWorkingHour(data)
  }

  const editAboutUs = async (form) => {

    if(detailAboutUs?.tel == '' || detailAboutUs?.name == '' || detailAboutUs?.address == ''
      || detailAboutUs?.email == '' || detailAboutUs?.footage == '') {
      toast.current.show({severity: 'info', summary: 'Information', detail: `Please fill full`, life: 3000});
    }
    else{
      dispatch(turnOnLoading())
      let workingHourTemp = ""
      for(let i = 0; i < workingHour.length; i++) {
        const index = workingHour[i];
        if(i == workingHour?.length - 1) {
          workingHourTemp+= `${index?.date}: ${getTimeAndUnit(index?.time?.start)} - ${getTimeAndUnit(index?.time?.end)}`
        }
        else if(i == 0) {
          workingHourTemp = `${index?.date}: ${getTimeAndUnit(index?.time?.start)} - ${getTimeAndUnit(index?.time?.end)}, `
        }
        else {
          workingHourTemp+= `${index?.date}: ${getTimeAndUnit(index?.time?.start)} - ${getTimeAndUnit(index?.time?.end)}, `
        }
      }
      await putAboutUs({id: detailAboutUs?.id, name: detailAboutUs?.name,
                                                                    tel: detailAboutUs?.tel, email: detailAboutUs?.email,
                                                                    address: detailAboutUs?.address, footage: detailAboutUs?.footage,
                                                                    description: detailAboutUs?.description, working_hour: workingHourTemp})
        .then(res => {
          mutateDetailAboutUs()
          toast.current.show({severity: 'success', summary: 'Success', detail: `Save About Us Success`, life: 3000});
        })
        .catch(err => {
          toast.current.show({severity: 'info', summary: 'Information', detail: `Save About Us Fail`, life: 3000});
        })
      dispatch(turnOffLoading())
    }
  }

  const dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Detail About Us</h5>
          <Toast ref={toast}/>
          <Form className="p-fluid formgrid grid" form={form} layout="vertical" autoComplete="on" onFinish={editAboutUs}>
            <div className="field col-12 md:col-6">
              <label htmlFor="firstname2">Name</label>
              <InputText id="lastname2" type="text"  value={detailAboutUs?.name} onChange={(e) => handleChangeText(e, 'name')}/>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="lastname2">Email</label>
              <InputText id="lastname2" type="email" value={detailAboutUs?.email} onChange={(e) => handleChangeText(e, 'email')}/>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="lastname2">Address</label>
              <InputText id="lastname2" type="text" value={detailAboutUs?.address} onChange={(e) => handleChangeText(e, 'address')}/>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="lastname2">Phone Number</label>
              <InputText  type={"tel"} onChange={handleChangeTel} maxLength={12} value={detailAboutUs?.tel} />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="city">Country</label>
              <InputText id="city" type="text" value={detailAboutUs?.footage} onChange={(e) => handleChangeText(e, 'footage')}/>
            </div>

            <div className="field col-12 md:col-6">
                <label htmlFor="city">Working Hour</label>
              <Accordion activeIndex={0}>
                {
                  workingHour?.map((index, number) =>(
                    <AccordionTab header={index?.date} key={number}>
                        <div className="formgrid grid" >
                          <div className="field col">
                            <label htmlFor="start">Start</label>
                            <InputText id="start"  type="time"  value={index?.time?.start} onChange={(e) => handleChangeWorkingHour(e, index?.key, 'start')} />
                          </div>
                          <div className="field col">
                            <label htmlFor="end">End</label>
                            <InputText id="end" type="time" value={index?.time?.end} onChange={(e) => handleChangeWorkingHour(e, index?.key, 'end')} />
                          </div>
                        </div>
                    </AccordionTab>
                  ))
                }
              </Accordion>
            </div>
            <div className="field col-12">
              <label htmlFor="address">Description</label>
              <InputTextarea id="address" rows="4" value={detailAboutUs?.description} onChange={(e) => handleChangeText(e, 'description')}/>
            </div>

            <div className="field col-12 md:col-12 mt-2" style={{display:"flex", justifyContent: "center"}}>
              <Button label="Update About Us" icon="pi pi-pencil"  style={{width: "auto"}} severity="sucess"
                      htmlType="submit"/>
            </div>
          </Form>

        </div>
      </div>

    </div>
  )
}


export default AboutUsPage