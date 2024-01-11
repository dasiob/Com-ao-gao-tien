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

      return toast.success(`Expense deleted`);
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
        All <span className="accent">expenses</span>
      </h2>
      {expenses && expenses.length > 0 ? (
        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
      ) : (
        <p>Currently you have no expense yet.</p>
      )}
    </div>
  );
};

export default ExpensesPage;
