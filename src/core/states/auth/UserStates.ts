import { UserAuth, UserDetails } from "../../models/auth/UserModel";

export const defaultUserDetails: UserDetails = {
    firstName: "",
    lastName: "",
    email: "",
}

export const defaultUserAuth: UserAuth = {
    auth: false,
    user: defaultUserDetails
}