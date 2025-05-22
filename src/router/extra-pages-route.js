import {Switch,Route} from 'react-router-dom'

//auth pages
// import ConfirmMail  from '../views/backend/Auth/ConfirmMail'
// import LockScreen  from '../views/backend/Auth/LockScreen'
// import RecoverPassword  from '../views/backend/Auth/RecoverPassword'
 import SignIn  from "../views/backend/User/Auth/SignIn"
// import SignUp  from '../views/backend/Auth/SignUp'

//ExtarPages
import Maintainance from '../views/backend/pages/Maintainance'
import  Error404    from '../views/backend/pages/Error/Error404'
import  Error500    from '../views/backend/pages/Error/Error500'
import CommingSoon  from  '../views/backend/pages/CommingSoon'

const ExtraPages = () => {
    return (
        <Switch>
            {/* auth */}
            {/* <Route path="/auth/confirm-mail" component={ConfirmMail} />
            <Route path="/auth/lock-screen" component={LockScreen} />
            <Route path="/auth/recoverpw" component={RecoverPassword} />
            <Route path="/auth/sign-in" component={SignIn} />
            <Route path="/auth/sign-up" component={SignUp} /> */}
            <Route path="/auth/sign-in" component={SignIn} />
            {/* ExtraPages */}
            <Route path="/extra-pages/pages-error" component={Error404} />
            <Route path="/extra-pages/pages-error-500" component={Error500} />
            <Route path="/extra-pages/pages-comingsoon" component={CommingSoon} />
            <Route path="/extra-pages/pages-maintenance" component={Maintainance} />
        </Switch>
    )
}

export default ExtraPages