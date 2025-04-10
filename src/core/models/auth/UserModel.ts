export interface UserAuth {
    auth: boolean;
    user: UserDetails | null;
}

export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
}