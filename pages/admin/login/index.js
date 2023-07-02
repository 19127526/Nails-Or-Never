import { useRouter } from 'next/router';
import React, {useContext, useEffect, useRef, useState} from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import {message, Spin} from "antd";
import * as types from './index.constraints';
import {turnOffLoading, turnOnLoading} from "../../../components/loading/index.actions";
import {connect, Provider, useDispatch, useSelector} from "react-redux";
import {persistor, store} from "../../../app/store";
import LoadingComponent from "../../../components/loading";
import {PersistGate} from "redux-persist/integration/react";
import {loginAccount} from "./index.thunk";
import {Toast} from "primereact/toast";
import {clearMessageAuthen, loginSuccess} from "./index.actions";
import {CheckOutlined} from "@ant-design/icons";
import { Dialog } from 'primereact/dialog';
import {postOtpSignIn} from "../../../api-client/authen/Authentication.api";


const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  loginAccount: loginAccount,
};
const connector = connect(mapStateToProps, mapDispatchToProps);


const LoginPage = (props) => {
  const { loginAccount } = props;
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const loadingRedux = useSelector(state => state.LoadingPage);
  const LoginPageRedux = useSelector(state => state.LoginPage);
  const { layoutConfig } = useContext(LayoutContext);
  const [productDialog, setProductDialog] = useState(false);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('')
  const router = useRouter();
  const toast = useRef(null);
  useEffect(() => {
    dispatch(turnOffLoading());
    if(LoginPageRedux?.message != null) {
      toast.current.show({severity: 'info', summary: 'Information', detail: `${LoginPageRedux?.message}`, life: 3000});
      dispatch(clearMessageAuthen())
    }
  }, [])
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
  const handleClickSignIn = async () => {
    if(userName == '' || password == '') {
      message.warning('Please fill username and password')
    }
    else {
      const temp = await loginAccount({ username: userName, password: password });
      if (temp.type === types.LOGIN_SUCCESS) {
        showDialog()
        // localStorage.setItem('token', temp?.payload?.token)
        // setTimeout(() => {
        //   dispatch(turnOffLoading());
        //   router.push("/")
        // }, 2000);
        // dispatch(turnOnLoading());
      } else if (temp.type === types.LOGIN_FAIL) {
        message.error('Login invalid');
      }
    }
  }

  const handleSubmitOtp =async () => {
    await postOtpSignIn({username : userName, password : password, otp : otp})
      .then(res => {
        localStorage.setItem('token', res?.data?.user?.token)
        setTimeout(() => {
          dispatch(turnOffLoading());
          router.push("/")
        }, 2000);
        dispatch(loginSuccess(res?.data?.user))
        dispatch(turnOnLoading());

      })
      .catch(err => {
        message.error('Otp incorrect');
      })

  }

  const hideDialog = () => {
    setProductDialog(false)
  }

  const showDialog = () => {
    setProductDialog(true)
  }


  return (
    <Spin  size="large"
           direction="horizon"
           spinning={loadingRedux?.isLoading}>
    <div className={containerClassName}>
      <Dialog visible={productDialog}  header="Confirm Login" modal className="p-fluid"  onHide={hideDialog}>

        <div className="form-card">
          <p className="form-card-title">We're send OTP your mail to confirm it</p>
          <p className="form-card-prompt">Enter last 6 digits of the number we are calling you from</p>
          <div className="form-card-input-wrapper">
            <input type="tel" maxLength="6" placeholder="______" className="form-card-input" onChange={(e) => {
              setOtp(e.target.value)
            }}/>
              <div className="form-card-input-bg"></div>
          </div>
          <button className="form-card-submit" onClick={() => handleSubmitOtp()}>submit</button>

        </div>
      </Dialog>
      <Toast ref={toast}/>
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <img src="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png" alt="Image" height="50" className="mb-3" />
              <div className="text-900 text-3xl font-medium mb-3">Welcome, Admin!</div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                User Name
              </label>
              <InputText inputid="email1" type="text" placeholder="enter user name" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} value={userName} onChange={(e) => setUserName(e.target.value)} />

              <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                Password
              </label>
              <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
              </div>
              <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleClickSignIn}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Spin>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
      <React.Fragment>
        {page}
        <AppConfig simple />
      </React.Fragment>
        </PersistGate>
      </Provider>
  );
};
export default connector(LoginPage);
