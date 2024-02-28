import React from "react";
import {
  amountToNumber,
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../helper";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function budgetPageLoader({ params }) {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("Ngân quỹ không tồn tại!");
  }
  return { budget, expenses };
}

export async function budgetPageAction({ request }) {
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

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: amountToNumber(values.newExpenseAmount),
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`Chi tiêu ${values.newExpense} đã được tạo`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

const BudgetsPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h2>
        Tổng Quan
        <span className="accent"> {budget.name}</span>
      </h2>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            Danh Sách Chi Tiêu
            <span className="accent"> {budget.name} </span>
          </h2>
          <Table
            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
            showBudget={false}
          />
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;
