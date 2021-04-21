import ReactDOM from 'react-dom'
import Router from './Router'

export default function App() {
  return (
    <div>
      <Router />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
