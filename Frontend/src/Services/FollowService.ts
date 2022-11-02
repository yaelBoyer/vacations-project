import axios from "axios";
import VacationModel from "../Models/VacationModel";
import {
  vacationsAction,
  vacationsActionType,
  vacationsStore,
} from "../Redux/VacationState";
import config from "../Utils/Config";

class FollowService {
  public async addOrRemoveFollow(payload: {
    vacationId: number;
    addFollower: boolean;
    vacation: VacationModel;
  }): Promise<any> {
    // Send vacation to backend:
    const response = await axios.post(config.addOrRemoveFollowUrl, payload);

    if (response.data["success"]) {
      let countFollower = payload.vacation.followersCount;
      if (payload.addFollower) {
        countFollower = countFollower++;
      } else {
        countFollower = countFollower - 1;
      }
      const updatedVacation = {
        ...payload.vacation,
        followersCount: countFollower,
        isFollowing: payload.addFollower,
        id: payload.vacationId,
      };
      const action: vacationsAction = {
        type: vacationsActionType.UpdateVacation,
        payload: updatedVacation,
      };
      vacationsStore.dispatch(action);
      return response;
    }
    return response;
  }
}
const followService = new FollowService();

export default followService;
