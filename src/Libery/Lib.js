import { toast, Flip } from "react-toastify";

const _ = {};
_.signupData = () => {
  const signUpItem = [
    {
      id: 1,
      name: "email",
      requierd: true,
    },
    {
      id: 2,
      name: "fullName",
      requierd: false,
    },
    {
      id: 3,
      name: "password",
      requierd: true,
    },
  ];
  return signUpItem;
};
_.InfoToast = (msg = "info message missing") => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};
_.SuccesToast = (msg = "success info missing") => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};
_.ErrorToast = (msg = "Error info missing") => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};
export default _;
