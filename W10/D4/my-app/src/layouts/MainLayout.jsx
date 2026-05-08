import { NavLink,Outlet } from "react-router-dom";
// Navlink: used for navigation b/w pages/routes
//Outlet: used to display child route components inside the layout

export function MainLayout() {
    return(
        <section>
            <h2>Main Layout</h2>
            {/* navigation bar */}
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/Dashboard">Dashboard</NavLink>

                    {/* Outlet is a placeholder where nested route components render */}
                <Outlet />
            </nav>
        </section>
    )
}