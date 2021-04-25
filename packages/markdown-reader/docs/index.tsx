import ReactDOM from 'react-dom'
import Markdown from '../src/Markdown'
// @ts-ignore
import md from '../README.md'
import './highlight.less'

const App = () => {
  // const md = require('../README.md')
  // return <Markdown>{md.default | md}</Markdown>
  return <Markdown>{md}</Markdown>
}

ReactDOM.render(<App />, document.getElementById('app'))
