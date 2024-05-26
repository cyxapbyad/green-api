import React, { useState } from 'react';
import { Button, Input, Layout, Form, Card } from 'antd';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';

import 'react-json-view-lite/dist/index.css';

import { GreenAPI } from '../../services/greenApi';

const { TextArea } = Input;
const { Content, Sider } = Layout;

const FormEl = () => {
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('');

  const [formSettings] = Form.useForm();
  const [formMessage] = Form.useForm();
  const [formFile] = Form.useForm();

  const [formState, setFormState] = useState({});

  const handleFormChange = (changedValues) => {
    setFormState({ ...formState, ...changedValues });
  };

  const { getSettings, getStateInstance, sendMessage, sendFileByUrl, contextHolder } = GreenAPI();

  const onGetSettings = async () => {
    await formSettings.validateFields();
    const settings = await getSettings(formState.idInstance, formState.apiTokenInstance);
    setOutput(settings.data);
  };

  const onGetStateInstance = async () => {
    await formSettings.validateFields();
    const settings = await getStateInstance(formState.idInstance, formState.apiTokenInstance);
    setOutput(settings.data);
  };

  const onSendMessage = async () => {
    await formSettings.validateFields();
    await formMessage.validateFields();
    const request = await sendMessage(formState.idInstance, formState.apiTokenInstance, {
      chatId: `${formState.phone}@c.us`,
      message: formState.message,
    });
    setOutput({ status: request.status, ...request.data });
  };

  const onSendFileByUrl = async () => {
    await formSettings.validateFields();
    await formFile.validateFields();
    const request = await sendFileByUrl(formState.idInstance, formState.apiTokenInstance, {
      chatId: `${formState.phone}@c.us`,
      urlFile: formState.fileUrl,
      fileName: fileName,
    });
    setOutput({ status: request.status, ...request.data });
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Layout>
          <Sider
            width={300}
            style={{ padding: '0 10px', background: '#fff' }}
          >
            <Form
              layout='vertical'
              form={formSettings}
              name='settings'
              initialValues={formState}
              onValuesChange={handleFormChange}
            >
              <Form.Item
                name='idInstance'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <Input placeholder='idInstance' />
              </Form.Item>
              <Form.Item
                name='apiTokenInstance'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <Input placeholder='apiTokenInstance' />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  onClick={onGetSettings}
                >
                  getSettings
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  onClick={onGetStateInstance}
                >
                  getStateInstance
                </Button>
              </Form.Item>
            </Form>
            <Form
              layout='vertical'
              form={formMessage}
              name='message'
              initialValues={{ remember: true }}
              onValuesChange={handleFormChange}
            >
              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <Input
                  type='number'
                  value={formState.phone}
                  placeholder='phone (79999999999)'
                />
              </Form.Item>
              <Form.Item
                name='message'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <TextArea
                  rows={7}
                  placeholder='message'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  onClick={onSendMessage}
                >
                  sendMessage
                </Button>
              </Form.Item>
            </Form>
            <Form
              layout='vertical'
              form={formFile}
              name='file'
              initialValues={{ remember: true }}
              onValuesChange={handleFormChange}
            >
              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <Input
                  type='number'
                  value={formState.phone}
                  placeholder='phone (79999999999)'
                />
              </Form.Item>
              <Form.Item
                name='fileUrl'
                rules={[{ required: true, message: 'This is required' }]}
              >
                <Input
                  onChange={(e) => {
                    setFileName(e.target.value.substring(e.target.value.lastIndexOf('/') + 1));
                  }}
                  placeholder='fileUrl'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType='submit'
                  type='primary'
                  onClick={onSendFileByUrl}
                >
                  sendFileByUrl
                </Button>
              </Form.Item>
            </Form>
          </Sider>
          <Content style={{ textAlign: 'left', width: 600, padding: '0 50px' }}>
            <Card style={{ height: '100%', backgroundColor: 'rgb(0, 43, 54)' }}>
              <JsonView
                data={output}
                shouldExpandNode={allExpanded}
                style={darkStyles}
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default FormEl;
