import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/home" className="menu-link">Home</NavLink>
            <span> | </span>
            <NavLink to="/vacations" className="menu-link">Vacations</NavLink>
            <span> | </span>
            <NavLink to="/reports" className="menu-link">Reports</NavLink>
            
            
        </div>
    );
}

export default Menu;
