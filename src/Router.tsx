import {
  Route,
  HashRouter,
  Switch
} from "react-router-dom"

import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { Enter } from "./pages/Enter"
import { Cart } from "./pages/Cart"
import { MovieSchedule } from "./pages/MovieSchedule"


const Router = () => (
    <HashRouter>
      <Switch>        
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/enter" exact component={Enter} />
        <Route path="/cart" exact component={Cart}/>
        <Route path="/movieschedule" exact component={MovieSchedule}/>
      </Switch>
    </HashRouter>
)

export { Router }