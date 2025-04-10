import { UserAuth } from "../../core/models/auth/UserModel";

export interface IAction {
    type: string;
    payload: any;
}

export interface IStateSelector {
    authentication: UserAuth;
}