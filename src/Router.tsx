import {
  Route,
  HashRouter,
  Switch
} from "react-router-dom"

import { Movie } from "./pages/Movie"
import { Products } from "./pages/Products"
import { Enter } from "./pages/Enter"
import { Cart } from "./pages/Cart"
import { MovieSchedule } from "./pages/MovieSchedule"
import { Home } from "./pages/Home"
import { Employee } from "./pages/Employee"
import { Profile } from "./pages/Profile"
import { ProductsTable } from "./pages/ProductsTable"
import { ProfileEmployee } from "./pages/ProfileEmployee"

const Router = () => (
    <HashRouter>
      <Switch>        
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/enter" exact component={Enter} />
        <Route path="/cart" exact component={Cart}/>
        <Route path="/movieschedule" exact component={MovieSchedule}/>
        <Route path="/movies" exact component={Movie}/>
        <Route path="/employee" exact component={Employee}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/products-table" exact component={ProductsTable}/>
        <Route path="/profileEmployee" exact component={ProfileEmployee}/>

        

      </Switch>
    </HashRouter>
)

export { Router }