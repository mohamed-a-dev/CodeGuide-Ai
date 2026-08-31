export const getDefaultErrorResponse = (source: string) => ({
    success: false,
    message: `Something went wrong | ${source}`,
    data:null
});