//Nested Routes
/** a route inside another route
 * eg., Dashboard-Profile / settings/reports */
import {Link , Outlet} from "react-router-dom"
export function NestedRoutes() {
    return (
        <div>
            <h2>Nested Routes</h2>
            <nav>
                <Link to="/dashboard">Home</Link>|{''}
                <Link to="/dashboard/profile">Profile</Link> |{''}
                <Link to="/dashboard/settings">Settings</Link> | {''}
                <hr />
                {/* <Outlet/> is the place where matched child royes will render */}
                {/* without <Outlet />,child routes will not appear inside the parent layout */}
                <Outlet />
            </nav>
        </div>
    )
}