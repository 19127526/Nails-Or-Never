import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Rating} from "primereact/rating";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {classNames} from "primereact/utils";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import { Image } from 'primereact/image';
import useSWR from "swr";
import {
  deleteServiceParent, deleteServiceSub,
  getDetailParentServicesById,
  getDetailParentServicesByParentName, getListServicesById, postServiceSub, putServiceParent, putServiceSub
} from "../../../api-client/services/Services.api";
import {PlusOutlined} from "@ant-design/icons";
import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {useDispatch} from "react-redux";
import {Form, Input, Upload} from "antd";
import {getBase64, onImageEdit} from "../../../util/utils";

const serviceMethod = {
  edit: "edit",
  add: "add"
}

const ParentServicePage = () => {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };


  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');


  //open sub service dialog
  const [subServiceDialog, setSubServiceDialog] = useState(false);
  const [deleteParentServiceDialog, setDeleteParentServiceDialog] = useState(false);
  //open parent service diaglog
  const [parentServiceDialog, setParentServiceDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [subServiceMethod, setSubServiceMethod] = useState(null);
  const [parentServiceMethod, setParentServiceMethod] = useState(null)
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const router = useRouter();
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {parentId} = router.query;
  const [listSubService, setListSubService] = useState([]);
  const [parentService, setParentService] = useState();
  const [parentServiceTemp, setParentServiceTemp] = useState();
  const {mutate : mutateLabelParent} = useSWR('list-service-parent-with-out-pagination')
  const {
    data: listServiceByParentName,
    mutate: mutateListService,
    error
  } = useSWR(`list-sub-service-by-parent-id-${parentId}`, () => getListServicesById({id: parentId, page : 1, limit : 9999999999}));
  useEffect(() => {
    dispatch(turnOnLoading());
    const getDetailParentService = async () => {
      await getDetailParentServicesById({id: parentId})
        .then(res => {
          setFileImageMainList([{
            url: res?.data?.data?.image?.toString()
          }]);
          setParentServiceTemp(res?.data?.data)
          setParentService(res?.data?.data)
          form.setFieldsValue({
            id : res?.data?.data?.id,
            name : res?.data?.data?.name,
            description : res?.data?.data?.description,
          });
        })
        .catch(err => {

        })
    }
    getDetailParentService()
    dispatch(turnOffLoading())
  }, [parentId, isLoadingDetail])


  useEffect(() => {
    if (listServiceByParentName === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListSubService(listServiceByParentName?.data?.services)
      dispatch(turnOffLoading());
    }
  }, [listServiceByParentName, dispatch]);

  useEffect(() => {
    mutateListService();
  }, [mutateListService, parentId])

  const handleRemoveMainImage = (e) => {
    setPreviewImage('')
  }

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


  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  };

  const openNewParentService = () => {
    setParentServiceMethod(serviceMethod?.edit);
    setSubmitted(false);
    setParentServiceDialog(true);
  }
  const openNewSubService = () => {
    setSubServiceMethod(serviceMethod?.add);
    setProduct(emptyProduct);
    setSubmitted(true);
    setSubServiceDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setSubServiceDialog(false);
  };

  const hideDialogParent = () => {
    setParentServiceDialog(false);
    setFileImageMainList([{
      url: parentServiceTemp?.image?.toString()
    }])
    setPreviewImage('')
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
    setDeleteParentServiceDialog(false);
  };

  const hideDeleteParentDialog = () => {
    setDeleteParentServiceDialog(false)
  }

  const saveProduct = async () => {
    if(product?.name != "" && product?.price != 0 && product?.time != 0) {
      dispatch(turnOnLoading())
      if (subServiceMethod == serviceMethod?.add) {
        //call api add sub service
        await postServiceSub({price : product?.price, name : product?.name,
                                      description: product?.description, time : product?.time,
                                      services_parents : parentId})
          .then(res => {
            setProduct(emptyProduct);
            dispatch(turnOffLoading());
            setSubServiceDialog(false);
            mutateListService()
            toast.current.show({severity: 'success', summary: 'Successful', detail: `Add Service Success`, life: 3000});
          })
          .catch(err => {
            dispatch(turnOffLoading())
            toast.current.show({severity: 'info', summary: 'Fail', detail: `Add Service Fail`, life: 3000});

          })
      } else if (subServiceMethod == serviceMethod?.edit) {
        //call api update sub service
        await putServiceSub({id: product?.id, price : product?.price, name : product?.name,
                                        description: product?.description, time : product?.time,
                                        services_parents : product?.services_parents})
          .then(res => {
            setProduct(emptyProduct);
            dispatch(turnOffLoading())
            setSubServiceDialog(false)
            mutateListService();

            toast.current.show({severity: 'success', summary: 'Successful', detail: `Save Service Success`, life: 3000});

          })
          .catch(err => {
            dispatch(turnOffLoading())
            toast.current.show({severity: 'info', summary: 'Fail', detail: `Save Service Fail`, life: 3000});
          })
      }

    }



  };

  const editProduct = (product) => {
    setSubServiceMethod(serviceMethod?.edit)
    setProduct({...product});
    setSubServiceDialog(true);
    setSubmitted(true)
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    //call api delete sub service
    dispatch(turnOnLoading())
    await deleteServiceSub({id : product?.id})
      .then(res => {
        mutateListService()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Service ${product?.name} Deleted`, life: 3000});
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

  const confirmDeleteParentService = () => {
    setDeleteParentServiceDialog(true)
  }


  const deleteSelectedSubService = async () => {
    let flag = false
    dispatch(turnOnLoading())
    for(let i = 0; i < selectedProducts?.length; i++) {
      await deleteServiceSub({id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateListService()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Service Select Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete service`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };

  const deleteParentService = async () => {
    dispatch(turnOnLoading())
    await deleteServiceParent({id:parentId})
      .then(res => {
        mutateLabelParent()
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Parent Service Deleted', life: 3000 });
      })
      .catch(err => {
        toast.current.show({ severity: 'info', summary: 'Fail', detail: err.toString(), life: 3000 });
      })
    setDeleteParentServiceDialog(false)
    dispatch(turnOffLoading())
  }


  const onInputSubServiceChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberSubServiceChange = (e, name) => {
    const val = e.value || 0;
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New Sub Service" icon="pi pi-plus" severity="sucess" className="mr-2"
                  onClick={openNewSubService}/>
          <Button label="Delete Sub Service" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                  disabled={!selectedProducts || !selectedProducts.length}/>
        </div>
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Detail Parent Service" icon="pi pi-clone" severity="sucess" className="mr-2"
                onClick={openNewParentService}/>
        <Button label="Delete Parent Service" icon="pi pi-trash" severity="danger" onClick={confirmDeleteParentService}/>
      </React.Fragment>
    );
  };

  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData?.id}
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.description == undefined || rowData?.description == null || rowData?.description == '' ? "" : rowData?.description}
      </>
    );
  };


  const timeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.time} minutes
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100"/>
      </>
    );
  };

  const saveParentService = async (form) => {

    //check file image
    let tempImageMain = [];
    if (fileImageMainList[0].url === undefined || fileImageMainList[0].url === null) {
      tempImageMain.push(fileImageMainList[0]?.originFileObj)
    } else {
      await onImageEdit(fileImageMainList[0].url)
        .then(res => {
          tempImageMain.push(res)
        })
        .catch(err => {
        })
    }

    const formData = new FormData();
    formData.append('id', parentId);
    formData.append('name', form?.name);
    formData.append('description', form?.description);
    formData.append('file', tempImageMain[0]);

    const putServiceParentFunc = async () => {
      dispatch(turnOnLoading());
      await putServiceParent(formData)
        .then(res => {
          dispatch(turnOffLoading());
          mutateLabelParent();
          setFileImageMainList([])
          setParentServiceDialog(false)
          setIsLoadingDetail(prevState => !prevState)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Parent Service Updated', life: 3000 });
        })
        .catch(err => {
          dispatch(turnOffLoading());
          toast.current.show({ severity: 'info', summary: 'Fail', detail: `${err?.toString()}`, life: 3000 });
          console.log(err)
        })
    }

    putServiceParentFunc();

  }

  const priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatCurrency(rowData.price)}
      </>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.services_parents}
      </>
    );
  };

  const ratingBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        <Rating value={rowData.rating} readOnly cancel={false}/>
      </>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span
          className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
      </>
    );
  };

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
      <h5 className="m-0">Manage parent service: {parentService?.name} </h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
    </div>
  );

  const parentServiceDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialogParent}/>
    </>
  );
  const subServiceDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog}/>
      <Button label="Save" icon="pi pi-check" text onClick={saveProduct}/>
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog}/>
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct}/>
    </>
  );
  const deleteSubServiceDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog}/>
      <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedSubService}/>
    </>
  );

  const deleteParentServiceDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog}/>
      <Button label="Yes" icon="pi pi-check" text onClick={deleteParentService}/>
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast}/>
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            value={listSubService}
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
            emptyMessage="No service found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{width: '4rem'}}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{minWidth: '15rem'}}></Column>
            <Column field="name" header="Name" sortable body={nameBodyTemplate}
                    headerStyle={{minWidth: '15rem'}}></Column>
            <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
            <Column field="service_parents" header="Services Parent" sortable body={categoryBodyTemplate}
                    headerStyle={{minWidth: '10rem'}}></Column>
            <Column field="description" header="Description" sortable body={descriptionBodyTemplate}
                    headerStyle={{minWidth: '15rem'}}></Column>
            <Column field="time" header="Time" sortable body={timeBodyTemplate}
                    headerStyle={{minWidth: '15rem'}}></Column>
            <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
          </DataTable>
          {/*sub service*/}
          <Dialog visible={subServiceDialog} style={{width: '450px'}}
                  header={subServiceMethod == serviceMethod?.add ? "Add Sub Service" : "Edit Sub Service"} modal
                  className="p-fluid" footer={subServiceDialogFooter} onHide={hideDialog}>
            {product.image && <Image src={`/demo/images/product/${product.image}`} alt={product.image} width={250} preview
                                   className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={product.name} onChange={(e) => onInputSubServiceChange(e, 'name')} required
                         autoFocus className={classNames({'p-invalid': submitted && !product.name})}/>
              {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea id="description" value={product.description == null || product.description == '' ? '' : product.description}
                             onChange={(e) => onInputSubServiceChange(e, 'description')} required rows={3} cols={20}/>
            </div>


            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber id="price" value={product?.price}
                             onValueChange={(e) => onInputNumberSubServiceChange(e, 'price')} mode="currency"
                             className={classNames({'p-invalid': submitted && !product.price})}
                             currency="USD" locale="en-US" required/>
                {submitted && !product.price && <small className="p-invalid">Price is required.</small>}
              </div>
              <div className="field col">
                <label htmlFor="quantity">Time(minutes)</label>
                <InputNumber id="quantity" value={product?.time}
                             className={classNames({'p-invalid': submitted && !product.time})}
                             onValueChange={(e) => onInputNumberSubServiceChange(e, 'time')} integeronly="true"/>
                {submitted && !product.time && <small className="p-invalid">Time is required.</small>}
              </div>
            </div>
          </Dialog>

          {/*parent service*/}
          <Dialog visible={parentServiceDialog} style={{width: '450px'}}
                  header={parentServiceMethod == serviceMethod?.add ? "Add Parent Service" : "Edit Parent Service"}
                  modal className="p-fluid" footer={parentServiceDialogFooter} onHide={hideDialogParent}>
            {
              previewImage == '' ?
                <Image src={parentService?.image} alt={parentService?.image} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
                :
                <Image src={previewImage} alt={previewImage}  width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
            }
            <Form layout="vertical" autoComplete="on" onFinish={saveParentService} form={form}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'please enter name'
                  }
                ]}>
                <Input type="text"  className="form-control"  placeholder="Enter name"/>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description">
                <InputTextarea id="description" rows={3} cols={20}/>
              </Form.Item>
              {/*onChange={(e) => onInputParentServiceChange(e, 'description')} value={parentService?.description}*/}

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
              <Button label="Save Service" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
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
                    Are you sure you want to delete <b>{product.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          {/*parent service*/}
          <Dialog visible={deleteParentServiceDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteParentServiceDialogFooter} onHide={hideDeleteParentDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              <span>Are you sure you want to delete the parent service?</span>
            </div>
          </Dialog>

          <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteSubServiceDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && <span>Are you sure you want to delete the selected service?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};


export default ParentServicePage