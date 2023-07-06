import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';
import {Calendar} from "primereact/calendar";
import {DatePicker, Form} from "antd";
import {Avatar, Badge, Descriptions, List, message, Spin} from "antd"
import {convertDateInit, getFormatDate} from "../../../util/utils";
import useSWR from "swr";
import {getALlEmployees} from "../../../api-client/employees/Employees.api";
import {deleteBookingById, getBookingByDate} from "../../../api-client/booking/Booking.api";
import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {useDispatch} from "react-redux";


const emptyBooking = {
  id : null,
  full_name : null,
  email : null,
  booking_time : null,
  finished_time : null,
  status : 0
}


const BookingPage = () => {
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyBooking);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [calendarValue, setCalendarValue] = useState(convertDateInit(new Date()));
  const [listBooking, setListBooking] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const dt = useRef(null);
  const {
    data: listBookingByDate,
    mutate: mutateBooking,
  } = useSWR(`list-booking-by-time`, () => getBookingByDate({date: calendarValue}));
  useEffect(() => {
    if (listBookingByDate === undefined) {
      dispatch(turnOnLoading());
    } else {
      setListBooking(listBookingByDate?.data?.data)
      dispatch(turnOffLoading());
    }
  }, [listBookingByDate, dispatch]);

  useEffect(() => {
    mutateBooking();
  }, [mutateBooking, calendarValue])
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        _product.id = createId();
        _product.code = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    await deleteBookingById({id:product.id})
      .then(res => {
        mutateBooking();
        setDeleteProductDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Booking Deleted Success', life: 3000 });
      })
      .catch(err => {
        mutateBooking();
        setDeleteProductDialog(false);
        toast.current.show({ severity: 'success', summary: 'Info', detail: 'Booking Deleted Fail', life: 3000 });
      })
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };


  const deleteSelectedProducts =async () => {

    let flag = false
    dispatch(turnOnLoading())
    for(let i = 0; i < selectedProducts?.length; i++) {
      await deleteBookingById({id : selectedProducts[i]?.id})
        .then(res => {

        })
        .catch(err => {
          flag = true
        })
    }
    if (flag == false) {
      dispatch(turnOffLoading())
      mutateBooking()
      toast.current.show({severity: 'success', summary: 'Successful', detail: `Booking Deleted`, life: 3000});
    }
    else {
      dispatch(turnOffLoading())
      toast.current.show({severity: 'info', summary: 'Fail', detail: `Error when delete booking`, life: 3000});
    }
    setDeleteProductsDialog(false)
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
        </div>
      </React.Fragment>
    );
  };


  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <DatePicker size={"large"}  onChange={(e) => {
          const date = getFormatDate({day: e?.$D, month: Number(e?.$M) + 1, year: e?.$y});
          setCalendarValue(date)
        }} />
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
        {rowData.full_name}
      </>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.email}
      </>
    );
  };

  const finishTimeTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.finished_time}
      </>
    );
  };

  const bookingTimeTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData?.booking_time}
      </>
    );
  };




  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {
          rowData?.status == 1 ?
            <>
              <span className="p-column-title">Status</span>
              <span className={`product-badge status-instock`}>Confirm</span>
            </>
            :
            <>
              <span className="p-column-title">Status</span>
              <span className={`product-badge status-outofstock`}>Not Confirm</span>
            </>
        }

      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Booking</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
    </div>
  );

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={listBooking}
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
            emptyMessage="No products found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
            <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="full_name" header="Full Name" sortable body={fullNameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="booking_time" header="Booking Time" sortable body={bookingTimeTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="finish_time" header="Finish Time" body={finishTimeTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="status" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
          </DataTable>

          <Dialog visible={productDialog} style={{ width: '1000px' }} header="Booking Detail" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
            <Descriptions size={"large"} bordered colon={true}>
              <Descriptions.Item label="Full Name" span={2}>{product?.full_name}</Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>{product?.email}</Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={2}>{product?.cellphone_number}</Descriptions.Item>
              <Descriptions.Item label="Appoint Note" span={2}>{product?.appointment_note}</Descriptions.Item>
              <Descriptions.Item label="Booking Date" span={4}>{product?.booking_date}</Descriptions.Item>
              <Descriptions.Item label="Booking Time" span={2}>{product?.booking_time}</Descriptions.Item>
              <Descriptions.Item label="Finish Time" span={2}>{product?.finished_time}</Descriptions.Item>
              <Descriptions.Item label="Status" span={4}>
                <Badge status={product?.status === 1 ? "Confirm" : "Not Confirm"} text={product?.status === 1 ? "Confirm" : "Not Confirm"}/>
              </Descriptions.Item>
              <Descriptions.Item label="Employee" span={4}>
                    <Descriptions size={"small"} bordered title={"Information Employee"} >
                      <Descriptions.Item label="Full Name" span={2}>{product?.employee?.full_name}</Descriptions.Item>
                      <Descriptions.Item label="Email" span={2}>{ product?.employee?.email}</Descriptions.Item>
                      <Descriptions.Item label="Phone Number" span={2}>{ product?.employee?.phone_number}</Descriptions.Item>
                      <Descriptions.Item label="Address" span={2}>{ product?.employee?.address}</Descriptions.Item>
                    </Descriptions>
              </Descriptions.Item>
            </Descriptions>


          </Dialog>

          <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {product && (
                <span>
                                    Are you sure you want to delete <b>{product.id}</b>?
                                </span>
              )}
            </div>
          </Dialog>

          <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {product && <span>Are you sure you want to delete the selected products?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
