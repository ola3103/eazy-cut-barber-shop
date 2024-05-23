import { toast } from "react-toastify";

const notification = ({ message, status }) => {
  if (status === "success") return toast.success(message);
  if (status === "error") return toast.error(message);
};

export default notification;
