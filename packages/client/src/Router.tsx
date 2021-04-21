import type { FC } from 'react'
import React from 'react'
// import loadbale from '@loadable/component'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Home from './pages/home'

interface RouterItemConfig {
  path: string
  exact: boolean
  component: React.FunctionComponent<any>
  routes?: RouterItemConfig[]
}

const routers: RouterItemConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home // loadbale(() => import('./pages/home'))
  }
]

export function RouteWithSubRoutes(route: RouterItemConfig) {
  return (
    <Route
      path={route.path}
      render={props => {
        return <route.component {...props} routes={route.routes} />
      }}
    />
  )
}

const Router: FC = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/components">组件库</Link>
        </li>
      </ul>
      <Switch>
        {routers.map(item => {
          return (
            <Route key={item.path} exact={item.exact} path={item.path}>
              <item.component />
            </Route>
          )
        })}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
