import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState, useContext, useRef } from 'react';
import { tokenContext } from './context'
import { Redirect } from 'react-router-dom'

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
  const [submited, setSubmited] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setPending] = useState(true)
  const [token,setToken] = useContext(tokenContext)
  const [redirect, setRedirect] = useState(false)
  const didMount = useRef(false)

  useEffect(() => {
    const getData =  () => {
      const url = "https://localhost:8000/api/login_check"
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submited)
      }
      console.log(options)
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw Error("impossible d'atteindre le serveur")
          }
          return res.json()
        })
        .then((data) => {

          setPending(false)
          setError(null)
          setToken(data)
        })
        .then(()=>doRedirect())
        .catch(error => {
          setError(error.message)
          setPending(false)
        })
    }
    if (!didMount.current) {
      didMount.current = true
      return console.log('first load')
    }

    submited && getData()

    console.log('token set correctly')
    // return doRedirect()
  }, [submited, setToken])

  function doRedirect() {
    setTimeout(() => {
      didMount.current = false
      setRedirect(true)
    } )
  }
  const onFinish = (values) => {

    setSubmited(values)
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    redirect ? <Redirect to="/student" /> :
      (<Form
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
      )
  )
}
