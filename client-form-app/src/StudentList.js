import { List, Avatar } from 'antd';
import { useContext, useEffect, useState } from 'react'
import { tokenContext } from './context'
const StudentList = () => {

  const [token] = useContext(tokenContext)
  const [error, setError] = useState(null)
  const [isPending, setPending] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const getData = async (data) => {

      const url = 'https://localhost:8080/students'
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + data
        }
      }

      console.log(options)
      return await fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw Error("impossible d'atteindre le serveur")
          }
          console.log(res)
          return res.json()
        })
        .then((data) => {
          setList(data)
          setPending(false)
          setError(null)
          console.log(data)
        })
        .catch(error => {
          setError(error.message)
          setPending(false)
        })
    }

    (async () => {
      return token && await token
    })()
      .then((data) => getData(data.token))
    return console.log("token is set", token)
  }, [token])

  return <List
    itemLayout="horizontal"
    dataSource={list}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.lastname} {item.firstname}</a>}
        />
      </List.Item>
    )}
  />
}

export default StudentList;