import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Form, Input, Switch, Upload, Radio} from "antd";
import useSWR from "swr";

import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {getBase64, onImageEdit} from "../../../util/utils";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Image} from "primereact/image";
import {PlusOutlined} from "@ant-design/icons";
import {
  deleteEmployeesById,
  getALlEmployees,
  postEmployees,
  putEmployees
} from "../../../api-client/employees/Employees.api";

const EmployeesPage = () => {
  let emptyProduct = {
    id: null,
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    image: null,
    status: 0,
  };

  //edit parent gallery
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');


  //open edit sub gallery dialog
  const [subGalleryEditDialog, setSubGalleryEditDialog] = useState(false);

  //open add sub gallery dialog
  const [subGalleryAddDialog, setSubGalleryAddDialog] = useState(false);


  //open parent service diaglog
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const router = useRouter();
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [listEmployees, setListEmployees] = useState([]);
  const {
    data: listEmployeesApi,
    mutate: mutateEmployees,
  } = useSWR(`list-all-employees`, () => getALlEmployees());


  useEffect(() => {
    if (listEmployeesApi === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListEmployees(listEmployeesApi?.data?.employees)
      dispatch(turnOffLoading());
    }
  }, [listEmployeesApi, dispatch]);

  useEffect(() => {
    mutateEmployees();
  }, [mutateEmployees])



  const handleChangeMainImage = async ({fileList: newFileList}) => {
    const file = newFileList[0]
    setFileImageMainList(newFileList)
    if (file != undefined) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        setPreviewImage(file.url || file.preview);
      }
    }
  };

  const handleRemoveMainImage = (e) => {
    setPreviewImage('')
  }


  const openNewSubService = () => {
    setProduct(emptyProduct);
    setSubGalleryAddDialog(true);
  };

  const hideDialogEditGift = () => {
    form.setFieldsValue({
      fullName : undefined,
      email : undefined,
      address : undefined,
      phoneNumber : undefined,
      status : 1,
    });
    setPreviewImage('');
    setFileImageMainList([]);
    setSubGalleryEditDialog(false);
  };

  const hideDialogAddGift = () => {
    form.setFieldsValue({
      fullName : undefined,
      email : undefined,
      address : undefined,
      phoneNumber : undefined,
      status : 1,
    });
    setPreviewImage('');
    setFileImageMainList([]);
    setSubGalleryAddDialog(false)
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };



  const editProduct = (product) => {
    // setSubGalleryMethod(serviceMethod?.edit)

    form.setFieldsValue({
      fullName : product.full_name,
      email : product.email,
      address : product.address,
      phoneNumber : product.phone_number,
      status : product.status,
    });


    setFileImageMainList([{
      url: product?.image
    }])
    setPreviewImage('')
    setProduct({...product});
    setSubGalleryEditDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteOnlyEmployees = async () => {
    //call api delete sub service
    dispatch(turnOnLoading())
    await deleteEmployeesById({ id : product?.id})
      .then(res => {
        mutateEmployees()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Employees ${product?.full_name} Deleted`, life: 3000});
      })
      .catch(err => {
        toast.current.show({severity: 'info', summary: 'Fail', detail: err.toString(), life: 3000});
      })
    dispatch(turnOffLoading())
    setProduct(emptyProduct);
    setDeleteProductDialog(false)
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };


  const deleteSelectedSubGallery = async () => {
    let flag = false
    dispatch(turnOnLoading())
    for(let i = 0; i < selectedProducts?.length; i++) {
      await deleteEmployeesById({id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateEmployees()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Employees Select Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete employees`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };

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




  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New Employees" icon="pi pi-plus" severity="sucess" className="mr-2"
                  onClick={openNewSubService}/>
          <Button label="Delete Employees" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                  disabled={!selectedProducts || !selectedProducts.length}/>
        </div>
      </React.Fragment>
    );
  };


  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.id}
      </>
    );
  };

  const fullNameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.full_name}
      </>
    );
  };



  const emailBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.email}
      </>
    );
  };

  const addressBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.address}
      </>
    );
  }
  const phoneNumberBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.phone_number}
      </>
    );
  }



  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        {
          rowData?.status == 0 ?
            <span className={`product-badge status-LOWSTOCK`}>Rest</span>
            :
          <span className={`product-badge status-INSTOCK`}>Work</span>
        }
      </>
    );
  };




  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img src={`${rowData.image}`} alt={rowData.image} className="shadow-2" width="100"/>
      </>
    );
  };

  const editNewGiftCard = (form) => {

    const formData = new FormData();
    formData.append('id', product?.id);
    formData.append('fullName', form?.fullName);
    formData.append('email', form?.email);
    formData.append('address', form?.address);
    formData.append('phoneNumber', form?.phoneNumber);
    formData.append('status', form?.status);
    formData.append('file', fileImageMainList[0]?.originFileObj);



    dispatch(turnOnLoading());
    const putEmployeesFnc = async () => {
      await putEmployees(formData)
        .then(res =>{
          dispatch(turnOffLoading());
          mutateEmployees();
          setProduct(emptyProduct);
          hideDialogEditGift();
          toast.current.show({severity: 'success', summary: 'Successful', detail: `Edit Employees ${product?.theme} Success`, life: 3000});
        })
        .catch(err => {
          dispatch(turnOffLoading());
          toast.current.show({severity: 'info', summary: 'Information', detail: `Edit Employees ${product?.theme} Fail`, life: 3000});
        })
    }
    putEmployeesFnc();
  }
  const addNewGiftCard = (form) => {
    const formData = new FormData();

    formData.append('fullName', form?.fullName);
    formData.append('email', form?.email);
    formData.append('address', form?.address);
    formData.append('phoneNumber', form?.phoneNumber);
    formData.append('status', form?.status);
    formData.append('file', fileImageMainList[0]?.originFileObj);

    dispatch(turnOnLoading());
    const postEmployeesFnc = async () => {
      await postEmployees(formData)
        .then(res =>{
          dispatch(turnOffLoading());
          hideDialogAddGift()
          mutateEmployees()
          toast.current.show({severity: 'success', summary: 'Successful', detail: `Add Employees Success`, life: 3000});
        })
        .catch(err => {
          dispatch(turnOffLoading());
          console.log(err)
          toast.current.show({severity: 'info', summary: 'Information', detail: `Add Employees Fail`, life: 3000});
        })
    }
    postEmployeesFnc();

  }




  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)}/>
        <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)}/>
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Employees </h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
    </div>
  );


  const subAddSubGalleryDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialogAddGift}/>
    </>
  );

  const subEditSubGalleryDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialogEditGift}/>
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog}/>
      <Button label="Yes" icon="pi pi-check" text onClick={deleteOnlyEmployees}/>
    </>
  );
  const deleteSubServiceDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog}/>
      <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedSubGallery}/>
    </>
  );



  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast}/>
          <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            value={listEmployees}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            emptyMessage="No employees found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{width: '4rem'}}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="full_name" header="Full Name" sortable body={fullNameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="address" header="Address" sortable body={addressBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="phone_number" header="Phone Number" sortable body={phoneNumberBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
          </DataTable>
          {/*edit sub service*/}
          <Dialog visible={subGalleryEditDialog} style={{width: '450px'}}
                  header={"Edit Employees"} modal
                  className="p-fluid" footer={subEditSubGalleryDialogFooter} onHide={hideDialogEditGift}>
            {
              previewImage == '' ?
                <Image src={product?.image} alt={product?.image} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
                :
                <Image src={previewImage} alt={previewImage}  width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
            }
            <Form layout="vertical" autoComplete="on" onFinish={editNewGiftCard} form={form}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: 'please enter name'
                    }
                  ]}>
                  <Input type="text"  className="form-control"  placeholder="Enter name"/>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'please enter email'
                    }
                  ]}>
                  <Input type="email"  className="form-control"  placeholder="Enter email"/>
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: 'please enter address'
                    }
                  ]}>
                  <Input type="text"  className="form-control"  placeholder="Enter address"/>
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'please enter phone number'
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
                  ]}>
                  <Input type="text" maxLength={10}  className="form-control"  placeholder="Enter phone number"/>
                </Form.Item>

                <Form.Item label="Status" name="status"
                 rules={[
                  {
                    required: true,
                    message: 'Please select status'
                  }
                ]}>
                  <Radio.Group>
                    <Radio.Button value={1}>Work</Radio.Button>
                    <Radio.Button value={0}>Rest</Radio.Button>
                  </Radio.Group>
                </Form.Item>


                <Form.Item
                  label="Image"
                  name='image'
                  rules={[
                    ({getFieldValue}) => ({
                      validator(_, value) {
                        if(fileImageMainList?.length == 0) {
                          return Promise.reject(new Error('Please upload image'));
                        }
                        else {
                          return Promise.resolve();
                        }
                      }
                    }),
                  ]}>
                  <Upload
                    listType="picture-card"
                    fileList={fileImageMainList}
                    onRemove={handleRemoveMainImage}
                    onChange={handleChangeMainImage}
                    beforeUpload={(file) => {
                      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
                      if (!isPNG) {
                        message.error(`${file.name} is not a png, svg and jpeg file`);
                      }
                      return false;
                    }}
                  >
                    {fileImageMainList.length === 0 ?
                      <div>
                        <PlusOutlined/>
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                      : ""}
                  </Upload>
                </Form.Item>
                <div className="field d-flex justify-content-center mt-2" style={{display :"flex"}}>
                  <Button label="Save Employees" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
                          htmlType="submit"/>
                </div>

            </Form>
          </Dialog>

          {/*add sub gallery*/}
          <Dialog visible={subGalleryAddDialog} style={{width: '450px'}}
                  header={"Add Employees"} modal
                  className="p-fluid" footer={subAddSubGalleryDialogFooter} onHide={hideDialogAddGift}>
            {
              previewImage == '' ?
                ""
                :
                <Image src={previewImage} alt={previewImage}  width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
            }
            <Form layout="vertical" autoComplete="on" onFinish={addNewGiftCard} form={form}>

              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'please enter name'
                  }
                ]}>
                <Input type="text"  className="form-control"  placeholder="Enter name"/>
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'please enter email'
                  }
                ]}>
                <Input type="email"  className="form-control"  placeholder="Enter email"/>
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'please enter address'
                  }
                ]}>
                <Input type="text"  className="form-control"  placeholder="Enter address"/>
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'please enter phone number'
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
                      if (value?.length != 10) {
                        return Promise.reject(new Error('Please enter full phone number'));
                      } else {
                        return Promise.resolve();
                      }
                    }
                  }),
                ]}>
                <Input type="text" value={phoneNumber}  maxLength={10} onChange={(e) => handleChangePhoneNumber(e)} className="form-control"  placeholder="Enter phone number"/>
              </Form.Item>

              <Form.Item label="Status" name="status"
                 rules={[
                {
                  required: true,
                  message: 'Please select status'
                }
              ]}>
                <Radio.Group>
                  <Radio.Button value={1}>Work</Radio.Button>
                  <Radio.Button value={0}>Rest</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Image"
                name='image'
                rules={[
                  ({getFieldValue}) => ({
                    validator(_, value) {
                      if(fileImageMainList?.length == 0) {
                        return Promise.reject(new Error('Please upload image'));
                      }
                      else {
                        return Promise.resolve();
                      }
                    }
                  }),
                ]}>
                <Upload
                  listType="picture-card"
                  fileList={fileImageMainList}
                  onRemove={handleRemoveMainImage}
                  onChange={handleChangeMainImage}
                  beforeUpload={(file) => {
                    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
                    if (!isPNG) {
                      message.error(`${file.name} is not a png, svg and jpeg file`);
                    }
                    return false;
                  }}
                >
                  {fileImageMainList.length === 0 ?
                    <div>
                      <PlusOutlined/>
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                    : ""}
                </Upload>
              </Form.Item>
              <div className="field d-flex justify-content-center mt-2" style={{display :"flex"}}>
                <Button label="Add Employees" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
                        htmlType="submit"/>
              </div>

            </Form>
          </Dialog>





          <Dialog visible={deleteProductDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && (
                <span>
                    Are you sure you want to delete employees {product?.full_name} ?
                </span>
              )}
            </div>
          </Dialog>


          <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteSubServiceDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && <span>Are you sure you want to delete the selected employees?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default EmployeesPage