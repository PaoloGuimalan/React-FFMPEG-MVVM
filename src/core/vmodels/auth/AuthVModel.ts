import { Dispatch } from '@reduxjs/toolkit';
import { UserAuth } from '../../models/auth/UserModel.ts';
import { IAction } from '../../../redux/types/interface.ts';
import { SET_AUTHENTICATION } from '../../../redux/types/index.ts';
import { defaultUserAuth } from '../../states/auth/UserStates.ts';

class AuthVModel {
    constructor() {
        this.user;
    }

    private user: UserAuth = defaultUserAuth

    public getUser: () => UserAuth = () => {
        return this.user;
    }

    public setUser: (pendingUser: UserAuth, dispatch: Dispatch<IAction>) => void = 
    (pendingUser: UserAuth, dispatch: Dispatch<IAction>) => {
        this.user = pendingUser;
        localStorage.setItem('authentication', JSON.stringify({...pendingUser.user}));
        dispatch({
            type: SET_AUTHENTICATION,
            payload: pendingUser
        });
    }

    public clearUser: (dispatch: Dispatch<IAction>) => void = (dispatch: Dispatch<IAction>) => {
        this.user = defaultUserAuth;
        localStorage.removeItem('authentication');
        dispatch({
            type: SET_AUTHENTICATION,
            payload: defaultUserAuth,
        })
    }
    
    public validateUser = (dispatch: Dispatch<IAction>) => {
        const checkUserAuthCache = localStorage.getItem('authentication');

        if(checkUserAuthCache){
            dispatch({
                type: SET_AUTHENTICATION,
                payload: {
                    auth: true,
                    user: JSON.parse(checkUserAuthCache)
                }
            });

            return;
        }

        dispatch({
            type: SET_AUTHENTICATION,
            payload: defaultUserAuth,
        })
    }

    protected userValidationMiddleware = () => {
        const checkUserAuthCache = localStorage.getItem('authentication');

        if(checkUserAuthCache){
            return true;
        }

        return false;
    }

}

const AuthVModelInstance = new AuthVModel()

export {
    AuthVModel,
    AuthVModelInstance
};