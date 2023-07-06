import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import React, {useRef, useState} from "react";
import {Form, Input, Modal, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Button} from "primereact/button";
import {getBase64} from "../../../util/utils";
import {postServiceParent} from "../../../api-client/services/Services.api";
import {Toast} from "primereact/toast";
import useSWR from "swr";
import {turnOnLoading, turnOffLoading} from "../../../components/loading/index.actions";
import {useDispatch} from "react-redux";
import {postGalleryParent} from "../../../api-client/gallery/Gallery.api";

const AddParentGalleryPage = () => {
  const [fileImageMainList, setFileImageMainList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const {mutate} = useSWR('list-gallery-parent-with-out-pagination')
  const toast = useRef(null);
  const dispatch = useDispatch()
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChangeMainImage = async ({fileList: newFileList}) => {
    setFileImageMainList(newFileList)
  };

  const handleAddParentService = async (form) => {
    dispatch(turnOnLoading())
    const formData = new FormData();
    formData.append('theme', form?.theme);
    formData.append('description', form?.description);
    formData.append('file', fileImageMainList[0]?.originFileObj);

    await postGalleryParent(formData)
      .then(res => {
        mutate()
        toast.current.show({severity: 'success', summary: 'Successful', detail: `Add Service Success`, life: 3000});

      })
      .catch(err => {
        toast.current.show({severity: 'info', summary: 'Fail', detail: `Add service fail (parent service do not same name)`, life: 3000});
      })
    dispatch(turnOffLoading())
  }
  return ( <div className="col-12">
    <div className="card">
      <h5>Add parent gallery</h5>
      <div>
        <Toast ref={toast}/>
        <Form layout="vertical" autoComplete="on" onFinish={handleAddParentService}>
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
            <InputTextarea id="description" placeholder="Enter description"  rows={3} cols={25}/>
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
              onChange={handleChangeMainImage}
              onPreview={handlePreview}
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

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          <div className="field d-flex justify-content-center mt-2" style={{display :"flex"}}>
            <Button label="Add Gallery" icon="pi pi-check" style={{width: "auto"}} severity="sucess"
                    htmlType="submit"/>
          </div>

        </Form>
      </div>
    </div>
  </div>)
}

export default AddParentGalleryPage