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
import {InputTextarea} from "primereact/inputtextarea";
import { Image } from 'primereact/image';
import useSWR from "swr";
import {PlusOutlined} from "@ant-design/icons";
import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {useDispatch} from "react-redux";
import {Form, Input, Upload} from "antd";
import {getBase64, onImageEdit} from "../../../util/utils";
import {
  deleteGalleryParentById, deleteGallerySubById,
  getDetailGalleryParentById, getListGallerySub,
  getListSubGalleryByParentId,
  postGalleryParent, postGallerySub, putGalleryParent, putGallerySub
} from "../../../api-client/gallery/Gallery.api";

const serviceMethod = {
  edit: "edit",
  add: "add"
}

const ParentGalleryPage = () => {
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

  //edit parent gallery
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');

  //new sub gallery
  const [fileImageNewList, setFileImageNewList] = useState([]);

  //edit sub gallery
  const [fileImageEditList, setFileImageEditList] = useState([]);
  const [previewImageEdit, setPreviewImageEdit] = useState('');


  const [products, setProducts] = useState(null);
  //open edit sub gallery dialog
  const [subGalleryEditDialog, setSubGalleryEditDialog] = useState(false);

  //open add sub gallery dialog
  const [subGalleryAddDialog, setSubGalleryAddDialog] = useState(false);

  const [deleteParentGalleryDialog, setDeleteParentGalleryDialog] = useState(false);
  //open parent service diaglog
  const [parentGalleryDialog, setParentGalleryDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [subGalleryMethod, setSubGalleryMethod] = useState(null);
  const [parentGalleryMethod, setParentGalleryMethod] = useState(null)
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
  const {galleryId} = router.query;
  const [listSubGallery, setListSubGallery] = useState([]);
  const [parentGallery, setParentGallery] = useState();
  const [parentGalleryTemp, setParentGalleryTemp] = useState();
  const {mutate : mutateListGalleryParent} = useSWR('list-gallery-parent-with-out-pagination')
  const {
    data: listSubGalleryByParentId,
    mutate: mutateListSubGallery,
  } = useSWR(`list-sub-gallery-by-parent-id-${galleryId}`, () => getListGallerySub({
    id: galleryId,
    page: 1,
    limit: 99999
  }));

  useEffect(() => {
    dispatch(turnOnLoading());
    const getDetailParentGallery = async () => {
      await getDetailGalleryParentById({id: galleryId})
        .then(res => {
          const data = res?.data?.data
          setFileImageMainList([{
            url: data?.image?.toString()
          }]);
          setParentGalleryTemp(data)
          setParentGallery(data)
          form.setFieldsValue({
            id : data?.id,
            theme : data?.theme,
            description : data?.description,
          });
        })
        .catch(err => {
          console.log(err)
        })
    }
    getDetailParentGallery()
    dispatch(turnOffLoading())
  }, [galleryId, isLoadingDetail])


  useEffect(() => {
    if (listSubGalleryByParentId === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListSubGallery(listSubGalleryByParentId?.data?.gallery)
      dispatch(turnOffLoading());
    }
  }, [listSubGalleryByParentId, dispatch]);

  useEffect(() => {
    mutateListSubGallery();
  }, [mutateListSubGallery, galleryId])

  const handleRemoveMainImage = (e) => {
    setPreviewImage('')
  }

  const handleChangeNewImage = async ({fileList: newFileList}) => {
    setFileImageNewList(newFileList)
  }

  const handleChangeEditImage = async ({fileList: newFileList}) => {
    const file = newFileList[0]
    setFileImageEditList(newFileList)
    if (file != undefined) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        setPreviewImageEdit(file.url || file.preview);
      }
    }

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
    setParentGalleryMethod(serviceMethod?.edit);
    setSubmitted(false);
    setParentGalleryDialog(true);
  }
  const openNewSubService = () => {
    // setSubGalleryMethod(serviceMethod?.add);
    setProduct(emptyProduct);
    setSubmitted(true);
    setSubGalleryAddDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setFileImageEditList([])
    setSubGalleryEditDialog(false);
    setPreviewImageEdit('')
  };

  const hideDialogAddSub = () => {
    setFileImageNewList([])
    setSubGalleryAddDialog(false)
  }

  const hideDialogParent = () => {
    setParentGalleryDialog(false);
    setFileImageMainList([{
      url: parentGalleryTemp?.image?.toString()
    }])
    setPreviewImage('')
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
    setDeleteParentGalleryDialog(false);
  };

  const hideDeleteParentDialog = () => {
    setDeleteParentGalleryDialog(false)
  }

  const addNewSubGallery = async () => {
    if(fileImageNewList?.length == 0) {
      toast.current.show({severity: 'info', summary: 'Information', detail: `Please upload image`, life: 3000});
    }
    else {
      //check file image
      const formData = new FormData();
      formData.append('galleryParents', galleryId);
      for (let i = 0; i < fileImageNewList.length; i++) {
        formData.append('files', fileImageNewList[i]?.originFileObj);
      }
      dispatch(turnOnLoading());
      const postGalleryParentFnc = async () => {
        await postGallerySub(formData)
          .then(res =>{
            dispatch(turnOffLoading());
            setFileImageNewList([]);
            setSubGalleryAddDialog(false);
            mutateListSubGallery()
            toast.current.show({severity: 'success', summary: 'Successful', detail: `Add Gallery Success`, life: 3000});
          })
          .catch(err => {
            dispatch(turnOffLoading());
            toast.current.show({severity: 'info', summary: 'Information', detail: `Add Gallery Fail`, life: 3000});
          })
      }
      postGalleryParentFnc();

    }
  }
  const editSubGallery = () => {
    if(fileImageEditList.length == 0) {
      toast.current.show({severity: 'info', summary: 'Information', detail: `Please upload image`, life: 3000});
    }
    else if(fileImageEditList[0]?.url != undefined){
      toast.current.show({severity: 'info', summary: 'Information', detail: `Please upload different image`, life: 3000});
    }
    else {
      //check file image
      const formData = new FormData();
      formData.append('galleryParents', galleryId);
      formData.append('id',product?.id);
      formData.append('file', fileImageEditList[0]?.originFileObj);
      dispatch(turnOnLoading());
      const putGallerySubFnc = async () => {
        await putGallerySub(formData)
          .then(res => {
            dispatch(turnOffLoading());
            setFileImageEditList([])
            setSubGalleryEditDialog(false)
            setProduct(emptyProduct);
            setPreviewImageEdit('')
            mutateListSubGallery()
            toast.current.show({severity: 'success', summary: 'Successful', detail: `Edit Gallery Success`, life: 3000});
          })
          .catch(err => {
            dispatch(turnOffLoading());
            toast.current.show({severity: 'info', summary: 'Information', detail: `Edit Gallery Fail`, life: 3000});
          })
      }
      putGallerySubFnc();

    }
  };

  const editProduct = (product) => {
    // setSubGalleryMethod(serviceMethod?.edit)
    setFileImageEditList([{
      url : product?.image
    }])
    setProduct({...product});
    setSubGalleryEditDialog(true);
    setSubmitted(true)
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteOnlySubGallery = async () => {
    //call api delete sub service
    dispatch(turnOnLoading())
    await deleteGallerySubById({parentId: galleryId, id : product?.id})
      .then(res => {
        mutateListSubGallery()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Gallery ${product?.name} Deleted`, life: 3000});
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
    setDeleteParentGalleryDialog(true)
  }


  const deleteSelectedSubGallery = async () => {
    let flag = false
    dispatch(turnOnLoading())
    for(let i = 0; i < selectedProducts?.length; i++) {
      await deleteGallerySubById({parentId: galleryId, id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateListSubGallery()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Gallery Select Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete service`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };

  const deleteParentService = async () => {
    dispatch(turnOnLoading())
    await deleteGalleryParentById({id : galleryId})
      .then(res => {
        mutateListGalleryParent()
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Parent Gallery Deleted', life: 3000 });
      })
      .catch(err => {
        toast.current.show({ severity: 'info', summary: 'Fail', detail: err.toString(), life: 3000 });
      })
    setDeleteParentGalleryDialog(false)
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
          <Button label="New Sub Gallery" icon="pi pi-plus" severity="sucess" className="mr-2"
                  onClick={openNewSubService}/>
          <Button label="Delete Sub Gallery" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                  disabled={!selectedProducts || !selectedProducts.length}/>
        </div>
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Detail Parent Gallery" icon="pi pi-clone" severity="sucess" className="mr-2"
                onClick={openNewParentService}/>
        <Button label="Delete Parent Gallery" icon="pi pi-trash" severity="danger" onClick={confirmDeleteParentService}/>
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
        <img src={`${rowData.image}`} alt={rowData.image} className="shadow-2" width="100"/>
      </>
    );
  };

  const saveParentGallery = async (form) => {

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
    formData.append('id', galleryId);
    formData.append('theme', form?.theme);
    formData.append('description', form?.description);
    formData.append('file', tempImageMain[0]);

    const putGalleryParentFnc = async () => {
      dispatch(turnOnLoading());
      await putGalleryParent(formData)
        .then(res => {
          mutateListGalleryParent()
          setParentGalleryDialog(false)
          setIsLoadingDetail(prevState => !prevState)
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Parent Gallery Updated', life: 3000 });
        })
        .catch(err => {
          toast.current.show({ severity: 'info', summary: 'Fail', detail: `${err?.toString()}`, life: 3000 });
          console.log(err)
        })
    }

    putGalleryParentFnc();
    dispatch(turnOffLoading());
  }


  const galleryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Gallery Parent</span>
        {rowData?.gallery_parents}
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
      <h5 className="m-0">Manage parent gallery: {parentGallery?.theme} </h5>
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

  const subAddSubGalleryDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialogAddSub}/>
      <Button label="Save" icon="pi pi-check" text onClick={addNewSubGallery}/>
    </>
  );

  const subEditSubGalleryDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog}/>
      <Button label="Save" icon="pi pi-check" text onClick={editSubGallery}/>
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
            value={listSubGallery}
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
            emptyMessage="No gallery found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{width: '4rem'}}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{minWidth: '15rem'}}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column style={{textAlign :"center"}} field="service_parents" header="Services Parent" sortable body={galleryBodyTemplate}
                    headerStyle={{minWidth: '10rem'}}></Column>
            <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
          </DataTable>
          {/*edit sub service*/}
          <Dialog visible={subGalleryEditDialog} style={{width: '450px'}}
                  header={"Edit Sub Gallery"} modal
                  className="p-fluid" footer={subEditSubGalleryDialogFooter} onHide={hideDialog}>
            {/*}test*/}

            {
              previewImageEdit == '' ?
                <Image src={product?.image} alt={product?.image} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
                :
                <Image src={previewImageEdit} alt={previewImageEdit} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
            }
            <div className="field">
              <Upload
                listType="picture-card"
                fileList={fileImageEditList}
                onChange={handleChangeEditImage}
                beforeUpload={(file) => {
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, svg and jpeg file`);
                  }
                  return false;
                }}
              >
                {
                  fileImageEditList?.length == 0
                    ?
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
                    :""
                }
              </Upload>
            </div>
          </Dialog>

          {/*add sub gallery*/}
          <Dialog visible={subGalleryAddDialog} style={{width: '450px'}}
                  header={"Add Sub Gallery"} modal
                  className="p-fluid" footer={subAddSubGalleryDialogFooter} onHide={hideDialogAddSub}>
            <Upload
              listType="picture-card"
              fileList={fileImageNewList}
              onChange={handleChangeNewImage}
              multiple={true}
              beforeUpload={(file) => {
                const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml' || file.type === 'image/webp';
                if (!isPNG) {
                  message.error(`${file.name} is not a png, svg and jpeg file`);
                }
                return false;
              }}
            >
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
            </Upload>
          </Dialog>



          {/*parent service*/}
          <Dialog visible={parentGalleryDialog} style={{width: '450px'}}
                  header={parentGalleryMethod == serviceMethod?.add ? "Add Parent Gallery" : "Edit Parent Gallery"}
                  modal className="p-fluid" footer={parentServiceDialogFooter} onHide={hideDialogParent}>
            {
              previewImage == '' ?
                <Image src={parentGallery?.image} alt={parentGallery?.image} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
                :
                <Image src={previewImage} alt={previewImage} width={250} preview
                       className="mt-0  mb-5 " style={{display:"flex",justifyContent:"center"}}/>
            }
            <Form layout="vertical" autoComplete="on" onFinish={saveParentGallery} form={form}>
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
                <Button label="Save Gallery" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
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
                    Are you sure you want to delete gallery?
                </span>
              )}
            </div>
          </Dialog>

          {/*parent service*/}
          <Dialog visible={deleteParentGalleryDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteParentServiceDialogFooter} onHide={hideDeleteParentDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              <span>Are you sure you want to delete the parent gallery?</span>
            </div>
          </Dialog>

          <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteSubServiceDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && <span>Are you sure you want to delete the selected gallery?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};


export default ParentGalleryPage