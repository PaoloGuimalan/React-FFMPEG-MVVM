import { UserAuth } from "../../core/models/auth/UserModel";
import { defaultUserAuth } from "../../core/states/auth/UserStates";
import { SET_AUTHENTICATION } from "../types";
import { IAction } from "../types/interface";

export const setAuthentication = (state: UserAuth = defaultUserAuth, action: IAction) => {
    switch(action.type){
        case SET_AUTHENTICATION:
            return action.payload;
        default:
            return state;
    }
}