import { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import CodeRender from '../lib'
import 'antd/dist/antd.css'
import '../lib/style/index.less'
import markdown from './example.md'

class App extends Component {
  render() {
    return (
      <div className="container">
        <CodeRender
          theme="dark"
          showCode
          dependencies={{
            Button
          }}
          source={markdown}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
