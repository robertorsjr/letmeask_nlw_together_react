import { Switch, Route } from 'react-router-dom';
import {Home, NewRoom} from "../pages";


export default function Routes(){
    return(
        <Switch>
            <Route path={'/'} component={Home} exact/>
            <Route path={'/room/new'} component={NewRoom} exact/>
        </Switch>
    )
}
