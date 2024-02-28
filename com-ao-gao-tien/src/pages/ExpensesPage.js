import React from "react";
import { deleteItem, fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function expensePageLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expensePageAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success(`Chi tiêu ${values.expenseName} xoá thành công`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h2>
        Danh Sách <span className="accent">Chi Tiêu</span>
      </h2>
      {expenses && expenses.length > 0 ? (
        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
      ) : (
        <p>Chi đi thì mới có mà show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
