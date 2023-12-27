import { redirect } from "react-router-dom";
import { deleteUser } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction() {
    deleteUser({
        key: "userName"
    })
    //hiện thông báo đẹp
    toast.success("Xóa thành công");
    return redirect("/");
}