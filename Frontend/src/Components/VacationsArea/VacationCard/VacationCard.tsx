import { useEffect, useState } from "react";
import { useNavigate }  from "react-router-dom"
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationService";
import "./VacationCard.css";
import VacationService from "../../../Services/VacationService";
import followService from "../../../Services/FollowService";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import authService from "../../../Services/AuthService";
import ModeEdit from "@mui/icons-material/ModeEdit";

interface VacationCardProps {
  vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  // Getting all route parameters:
  const params = useParams();

  // Navigate method:
  const navigate = useNavigate();

  // State for the single vacation:
  const [vacation, setVacation] = useState<VacationModel>();
  const [vacations, setVacations] = useState<VacationModel[]>();
  let show: boolean = false;
  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) => {
        setVacations(vacations);
      })
      .catch((err) => notifyService.error(err));

    setVacation(props.vacation);
    vacationsService
      .getOneVacation(props.vacation.vacationId)
      .then((vacation) => {
       setVacation(vacation);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  // doing follow by user
  async function addRemoveFollow() {
    try {
      const alert = vacation.isFollowing
        ? "Are you want to remove follow to this vacation?"
        : "Are you want to follow this vacation?";
      const iAmSure = window.confirm(alert);
      if (!iAmSure) return;
      const addFollower = !vacation.isFollowing;
      const response = await followService.addOrRemoveFollow({
        vacationId: vacation.vacationId,
        addFollower: addFollower,
        vacation: vacation,
      });
      if (response.data["success"]) {
        const alert = vacation.isFollowing
          ? "vacation has been removed followe"
          : "vacation has been followed";
        
        notifyService.success(alert);
        let countFollower = vacation.followersCount;
      if (addFollower) {
        countFollower = countFollower++;
      } else {
        countFollower = countFollower - 1;
      }
        setVacation({ ...vacation, isFollowing: addFollower ,followersCount: countFollower

        });
        navigate("/vacations");
      }
    } catch (err: any) {
      notifyService.error(err);
    }
      }

  async function deleteVacation() {
    try {
      const iAmSure = window.confirm(
        "Are you sure you want to delete this vacation?"
      );
      if (!iAmSure) return;

      await VacationService.deleteVacation(vacation?.vacationId);
      notifyService.success("vacation has been deleted");
      let v = vacations.filter((el) => el.vacationId !== vacation.vacationId);
      setVacations(v);
      navigate(0);
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function EditVacationFunction() {
    navigate("/vacations/edit/" + vacation?.vacationId);
  }

  return (
    <div className="VacationCard Box">
        <div className="VacationCardDetailsWrapper">
        {authService.isAdmin() && (
        <>
         <div className="btn-actions-wrapper">
          <button className="del-btn" onClick={deleteVacation}>
            <RestoreFromTrashIcon></RestoreFromTrashIcon>
          </button>
         
          <button className="edit-btn" onClick={EditVacationFunction}>
            <ModeEdit></ModeEdit>
          </button>
          </div>
        </>
      )}
            <div className="VacationCardDetails">
                
                <div>
                    <span className="headerCard"> Destination:</span>{" "}
                    {vacation?.destination}
                </div>
                <div>
        {/* {vacation.test} */}
        <img src={vacation?.src} />
      </div>
               
                <div>
                    <span className="headerCard"> Arrival date:</span>{" "}
                    {vacation?.arrivalDate}
                </div>
                <div>
                    {" "}
                    <span className="headerCard"> Departure date:</span>{" "}
                    {vacation?.departureDate}
                </div>
                <div>
                    <span className="headerCard"> Price:</span> ${vacation?.price}
                </div>
                <div>
                    <div className="headerCard">Description:</div>{" "}
                     {vacation?.description}
                </div>

            <div>
                <span className="headerCard"> Followers:</span>{" "}
                {vacation?.followersCount}
            </div>
            </div>
        {!authService.isAdmin() && (
          <>
            <div className="flower-wrapper">
              <div
                className={
                  vacation?.isFollowing ? "bg-salmon" : "default-follow"
                }
                onClick={addRemoveFollow}
              >
                follow
              </div>
            </div>
          </>
        )}
      </div>
     

 
    </div>
  );
}

export default VacationCard;
