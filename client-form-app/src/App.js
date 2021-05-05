import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { FormLogin } from './FormLogin'
import { useState } from 'react'
import { tokenContext } from './context'
import StudentList from './StudentList'

function App() {
  const [token, setToken] = useState('')

  return (

    <tokenContext.Provider value={[token, setToken]}>
      <Router>
        <Switch>

          <Route exact path="/">
            <div className="container"><FormLogin /></div>
          </Route>
          <Route path="/student">
            <StudentList />
          </Route>
        </Switch>
      </Router>

    </tokenContext.Provider >
  )
}

export default App;
