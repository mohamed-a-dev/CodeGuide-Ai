export const aiErrorHandler = (error: Error) => {
    return {
        success: false,
        message: error.message,
        data: null
    }
}