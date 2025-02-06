export interface User {
    uid: string;
}

export interface SignUpResponse {
    success: boolean;
    error?: string;
}

export interface SignInResponse {
    success: boolean;
    error?: string;
}

export interface GoogleSignInResponse {
    success: boolean;
    error?: string;
}
