import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Form, Input, Upload} from "antd";
import useSWR from "swr";

import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {getBase64, onImageEdit} from "../../../util/utils";
import {Button} from "primereact/button";
import {Rating} from "primereact/rating";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Image} from "primereact/image";
import {PlusOutlined} from "@ant-design/icons";
import {InputTextarea} from "primereact/inputtextarea";
import {deleteGiftCard, getAllGiftCard, postGiftCard, putGiftCard} from "../../../api-client/giftcard/Gifcard.api";

const GiftCardPage = () => {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    theme: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
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
  const [listGiftCard, setListGiftCard] = useState([]);
  const {
    data: listGiftCardApi,
    mutate: mutateListSubGallery,
  } = useSWR(`list-gift-card`, () => getAllGiftCard());


  useEffect(() => {
    if (listGiftCardApi === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListGiftCard(listGiftCardApi?.data?.giftCard)
      dispatch(turnOffLoading());
    }
  }, [listGiftCardApi, dispatch]);

  useEffect(() => {
    mutateListSubGallery();
  }, [mutateListSubGallery])



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
      theme : undefined,
      description : undefined,
    });
    setPreviewImage('');
    setFileImageMainList([]);
    setSubGalleryEditDialog(false);
  };

  const hideDialogAddGift = () => {
    form.setFieldsValue({
      theme : undefined,
      description : undefined,
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
      theme : product?.theme,
      description : product?.description,
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

  const deleteOnlySubGallery = async () => {
    //call api delete sub service
    dispatch(turnOnLoading())
    await deleteGiftCard({ id : product?.id})
      .then(res => {
        mutateListSubGallery()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Gift Card ${product?.theme} Deleted`, life: 3000});
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
      await deleteGiftCard({id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateListSubGallery()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Gift Card Select Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete gift card`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };




  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New Gift Card" icon="pi pi-plus" severity="sucess" className="mr-2"
                  onClick={openNewSubService}/>
          <Button label="Delete Gift Card" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                  disabled={!selectedProducts || !selectedProducts.length}/>
        </div>
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



  const themeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.theme}
      </>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.description == undefined ? "Empty" : rowData?.description}
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
    formData.append('theme', form?.theme);
    formData.append('description', form?.description);
    formData.append('file', fileImageMainList[0]?.originFileObj);

    dispatch(turnOnLoading());
    const putGiftCardFnc = async () => {
      await putGiftCard(formData)
        .then(res =>{
          dispatch(turnOffLoading());
          setProduct(emptyProduct);
          hideDialogEditGift();
          mutateListSubGallery()
          toast.current.show({severity: 'success', summary: 'Successful', detail: `Edit Gift Card ${product?.theme} Success`, life: 3000});
        })
        .catch(err => {
          dispatch(turnOffLoading());
          toast.current.show({severity: 'info', summary: 'Information', detail: `Edit Gift Card ${product?.theme} Fail`, life: 3000});
        })
    }
    putGiftCardFnc();


  }
  const addNewGiftCard = (form) => {
    const formData = new FormData();
    formData.append('theme', form?.theme);
    formData.append('description', form?.description);
    formData.append('file', fileImageMainList[0]?.originFileObj);

    dispatch(turnOnLoading());
    const postGiftCardFnc = async () => {
      await postGiftCard(formData)
        .then(res =>{
          mutateListSubGallery();
          dispatch(turnOffLoading());
          hideDialogAddGift()
          toast.current.show({severity: 'success', summary: 'Successful', detail: `Add Gift Card Success`, life: 3000});
        })
        .catch(err => {
          dispatch(turnOffLoading());
          toast.current.show({severity: 'info', summary: 'Information', detail: `Add Gift Card Fail`, life: 3000});
        })
    }
    postGiftCardFnc();

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
      <h5 className="m-0">Manage Gift Card </h5>
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
      <Button label="Yes" icon="pi pi-check" text onClick={deleteOnlySubGallery}/>
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
            value={listGiftCard}
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
            emptyMessage="No gift card found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{width: '4rem'}}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{minWidth: '15rem'}}></Column>

            <Column field="theme"  header="Theme" sortable body={themeBodyTemplate}
                    headerStyle={{minWidth: '15rem'}}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="description"  header="Description" sortable body={descriptionBodyTemplate}
                    headerStyle={{minWidth: '15rem'}}></Column>
            <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
          </DataTable>
          {/*edit sub service*/}
          <Dialog visible={subGalleryEditDialog} style={{width: '450px'}}
                  header={"Edit Gift Card"} modal
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
                name="theme"
                label="Theme"
                rules={[
                  {
                    required: true,
                    message: 'please enter theme'
                  }
                ]}>
                <Input type="text"  className="form-control"  placeholder="Enter theme"/>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description">
                <InputTextarea id="description" rows={3} cols={20}/>
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
                <Button label="Save Gift Card" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
                        htmlType="submit"/>
              </div>

            </Form>
          </Dialog>

          {/*add sub gallery*/}
          <Dialog visible={subGalleryAddDialog} style={{width: '450px'}}
                  header={"Add Gift Card"} modal
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
                name="theme"
                label="Theme"
                rules={[
                  {
                    required: true,
                    message: 'please enter theme'
                  }
                ]}>
                <Input type="text"  className="form-control"  placeholder="Enter theme"/>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description">
                <InputTextarea id="description" rows={3} cols={20}/>
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
                <Button label="Add Gift Card" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
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
                    Are you sure you want to delete gift card {product?.theme} ?
                </span>
              )}
            </div>
          </Dialog>


          <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteSubServiceDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && <span>Are you sure you want to delete the selected gift card?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default GiftCardPage