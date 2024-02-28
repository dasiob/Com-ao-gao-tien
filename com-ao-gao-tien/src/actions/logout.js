import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction() {
  deleteItem({
    key: "userName",
    id: "",
  });
  deleteItem({
    key: "expenses",
    id: "",
  });
  deleteItem({
    key: "budgets",
    id: "",
  });
  //hiện thông báo đẹp
  toast.success("Xóa thành công");
  return redirect("/");
}
