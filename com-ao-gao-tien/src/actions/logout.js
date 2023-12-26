import { redirect } from "react-router-dom";
import { deleteUser } from "../helper";

export async function logoutAction() {
    deleteUser({
        key: "userName"
    })
    return redirect("/");
}