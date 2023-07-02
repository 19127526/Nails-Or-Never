import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Form, Input, Switch, Upload, Radio} from "antd";
import useSWR from "swr";

import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";

import {deleteContactById, getAllContact} from "../../../api-client/contact/Contact.api";
import {InputTextarea} from "primereact/inputtextarea";

const ContactPage = () => {
  let emptyProduct = {
    id: null,
    name: '',
    email: '',
    phone: '',
    message: '',
  };



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
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [listContact, setListContact] = useState([]);
  const {
    data: listContactApi,
    mutate: mutateContact,
  } = useSWR(`list-all-contact`, () => getAllContact());


  useEffect(() => {
    if (listContactApi === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListContact(listContactApi?.data?.contact)
      dispatch(turnOffLoading());
    }
  }, [listContactApi, dispatch]);

  useEffect(() => {
    mutateContact();
  }, [mutateContact])







  const hideDialogEditGift = () => {
    form.setFieldsValue({
      name : undefined,
      email : undefined,
      phone : undefined,
      message : undefined,
    });
    setSubGalleryEditDialog(false);
  };

  const hideDialogAddGift = () => {
    form.setFieldsValue({
      name : undefined,
      email : undefined,
      phone : undefined,
      message : undefined,
    });
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
      name : product.name,
      email : product.email,
      phone : product.phone,
      message : product.message,
    });
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
    await deleteContactById({ id : product?.id})
      .then(res => {
        mutateContact()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Contact ${product?.name} Deleted`, life: 3000});
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
      await deleteContactById({id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateContact()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Contact Select Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete contact`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };




  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Delete Contact" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
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
        {rowData?.name}
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

  const phoneBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.phone}
      </>
    );
  }
  const messageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData?.message}
      </>
    );
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-arrows-alt" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)}/>
        <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)}/>
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Contact</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
    </div>
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
            value={listContact}
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
            emptyMessage="No contact found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{width: '4rem'}}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="name" header="Name" sortable body={fullNameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="phone" header="Phone" sortable body={phoneBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="message" header="Message" sortable body={messageBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
          </DataTable>
          {/*edit sub service*/}
          <Dialog visible={subGalleryEditDialog} style={{width: '450px'}}
                  header={"Detail Contact"} modal
                  className="p-fluid" footer={subEditSubGalleryDialogFooter} onHide={hideDialogEditGift}>
            <Form layout="vertical" autoComplete="on" form={form} size={"large"}>
              <Form.Item
                name="name"
                label="Name"
                >
                <Input type="text"  className="form-control" disabled/>
              </Form.Item>

              <Form.Item
                name="email"
                label="Email">
                <Input type="email"  className="form-control"  disabled />
              </Form.Item>

              <Form.Item
                name="phone"
                label="phone">
                <Input type="text"  className="form-control"  disabled/>
              </Form.Item>

              <Form.Item
                name="message"
                label="Message">
                <InputTextarea  rows={3} cols={20} disabled/>
              </Form.Item>



            </Form>
          </Dialog>




          <Dialog visible={deleteProductDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && (
                <span>
                    Are you sure you want to delete contact {product?.name} ?
                </span>
              )}
            </div>
          </Dialog>


          <Dialog visible={deleteProductsDialog} style={{width: '450px'}} header="Confirm" modal
                  footer={deleteSubServiceDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
              {product && <span>Are you sure you want to delete the selected contact?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ContactPage