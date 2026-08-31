import { toast } from "react-toastify";

const displaySuccess = (msg: string) => {


    const formattedMsg = msg.trim().charAt(0).toUpperCase() + msg.slice(1);

    toast.success(formattedMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};


const displayError = (msg: string) => {

    msg = msg.trim()[0].toUpperCase() + msg.slice(1);


    toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
};


export { displaySuccess, displayError }