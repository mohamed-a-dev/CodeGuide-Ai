export type AuthState = {
    message: string,
    success: boolean;
};



export type RegisterForm = {
    name: string;
    email: string;
    password: string;
};

export type LoginForm = {
    email: string;
    password: string;
}


export type CustomError = {
    code: number;
    message: string;
}


export type AuthErrorCode = 403;
