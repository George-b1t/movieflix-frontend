import {
  Route,
  HashRouter,
  Switch
} from "react-router-dom"

import { Home } from "./pages/Home"
import { Products } from "./pages/Products"

const Router = () => (
    <HashRouter>
      <Switch>        
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </HashRouter>
)

export { Router }