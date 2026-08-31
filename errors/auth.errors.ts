import { AuthErrorCode } from "@/types/auth.types";

export const AuthErrorHandler = (code: AuthErrorCode) => {
    if (code === 403)
        return { success: false, message: 'You are not allowed to do this action', data: null };

    // in case of different error code
    return { success: false, message: 'Something went wrong | auth.errors.ts', data: null };
}


