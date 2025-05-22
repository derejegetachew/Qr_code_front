import {Switch,Route} from 'react-router-dom'
import Layout1 from '../layouts/backend/Layout1'
import BlankLayout from '../layouts/BlankLayout';

const LayoutsRoute = props => {
    return (
        <Switch>
            <Route path="/auth" component={BlankLayout} />
            <Route path="/extra-pages" component={BlankLayout} />
            <Route path="/" component={Layout1} />
        </Switch>
    )
}
export default LayoutsRoute