import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Reports from "../../VacationsArea/Reports/Reports";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";


function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                {/* Register */}
                <Route path="/register" element={<Register />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Logout */}
                <Route path="/logout" element={<Logout />} />

                {/* Home */}
                <Route path="/home" element={<Home />} />

                <Route path="/vacations" element={<VacationList />} />

                {/* Add vacation */}
                <Route path="/vacations/new" element={<AddVacation />} />

                {/* Edit vacation */}
                <Route path="/vacations/edit/:vacId" element={<EditVacation />} />

                {/* reports */}
                <Route path="/reports" element={<Reports/>} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
