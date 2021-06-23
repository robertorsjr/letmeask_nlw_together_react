import { Switch, Route } from 'react-router-dom';
import {Home, NewRoom, Room} from "../pages";


export default function Routes(){
    return(
        <Switch>
            <Route path={'/'} component={Home} exact/>
            <Route path={'/rooms/new'} component={NewRoom} exact/>
            <Route path={'/rooms/:id+'} component={Room} exact/>
        </Switch>
    )
}
