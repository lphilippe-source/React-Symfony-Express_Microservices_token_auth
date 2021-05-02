import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { useEffect,useState } from 'react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const FormLogin = () => {
  const [isSubmited,setIsSubmited] = useState(null)
  const[error,setError] = useState(null)
  const [isPending,setPending] = useState(true)
  const[token,setToken] = useState(null)

    useEffect(()=>{
  const getData = async () => {
    const url = "https://localhost:8000/api/login_check"
    const options={
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isSubmited)
    }  
    console.log(options)
        return await fetch(url, options)
                    .then(res=>{
                        if(!res.ok){
                          throw Error("impossible d'atteindre le serveur")
                        }
                        return res.json()
                    })
                    .then((data)=>{
                        setToken(data)
                        setPending(false)
                        setError(null)
                    })
                    .catch(error=>{
                        setError(error.message)
                        setPending(false)
                    })
      }
        isSubmited && getData()
        
        return console.log('ok')
    },[isSubmited])

  const onFinish = (values) => {
   
  setIsSubmited(values)
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
