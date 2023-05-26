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
import { Movie } from "./pages/Movie"

const Router = () => (
    <HashRouter>
      <Switch>        
        <Route path="/" exact component={Movie} />
        <Route path="/products" exact component={Products} />
        <Route path="/enter" exact component={Enter} />
        <Route path="/cart" exact component={Cart}/>
        <Route path="/movieschedule" exact component={MovieSchedule}/>
        <Route path="/movies" exact component={Home}/>
      </Switch>
    </HashRouter>
)

export { Router }