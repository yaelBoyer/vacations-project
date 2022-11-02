import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationService";
import useVerifyLoggedIn from '../../../Utils/UseVerifyLoggedIn';
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    useVerifyLoggedIn();

    //  States: 
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const totalItemsPerPage = 10;
    const [filterMyVacations, setFilterMyVacations] = useState<VacationModel[]>([]);
    const [page, setPage] = useState<number>(1);
    let [numOfPage, setNumOfPage] = useState<number>();
    const [checked, setChecked] = useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
    }

    const navigate = useNavigate();

    // AJAX Side Effect: 
    useEffect(() => {


        // Get vacations from server: 
        vacationsService.getAllVacations()
            .then(vacations => {
            setVacations(vacations)})
            .catch(err => notifyService.error(err));

            setNumOfPage(Math.ceil(vacations.length / totalItemsPerPage))
            if (checked) { setNumOfPage(Math.ceil(filterMyVacations.length / totalItemsPerPage)) }

    }, [vacations, checked]);

    async function addVacation(){
        navigate('/vacations/new')
    }

    async function filterVacation(event:any) {
        if (event.target.checked) {
            
        vacationsService.getAllVacations(true)
        .then(filterMyVacations => {setFilterMyVacations(filterMyVacations)
        setChecked(true)
    
    })
        .catch(err => notifyService.error(err));
        }else{
            setChecked(false)
            vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
        }
    }

    return (
        <div className="VacationList">
            
            {authService.isAdmin() && <>
                <div className="addButton" onClick={addVacation} >
                    <div className="linkButton" >add Vacations</div>
                </div>
                        </>}
            {!authService.isAdmin() && <>
            <div className='filterButton'>
                <label className='filterButton'>my vacations</label>
                <input  type="checkbox" checked={checked} onClick={filterVacation}/>
            </div>
            </>}
            <div className="cardListWrapper">
                <div  className="VacationListCards">                
                    {checked && filterMyVacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(v => { return (<VacationCard key={v.vacationId} vacation={v} />) })}
                    {!checked && vacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(vac => { return (<VacationCard  key={vac.vacationId} vacation={vac} />) })}
               </div>
               { numOfPage > 1 && <>
               <div className='pagination-wrapper'>
                    <Pagination className="Pagination" count={numOfPage} page={page} onChange={handleChange} defaultPage={1} color="secondary" size="large" />
                </div>
                </>}
            </div>
        </div>
    );
}




    
			


export default VacationList;
