import React from "react";
import {
  fetchData,
  createBudget,
  amountToNumber,
  createExpense,
  deleteItem,
} from "../helper";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import MomJoke from "../components/MomJoke";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import toothless from "../assets/toothless.gif";
import Table from "../components/Table";

// loader
export function dashBoardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashBoardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`What's gud ${values.userName}`);
    } catch (e) {
      throw new Error("Có lỗi khi đăng nhập bruh :'(");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: amountToNumber(values.newBudgetAmount),
      });
      return toast.success("Tạo ngân quỹ thành công");
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

      return toast.success(`Chi tiêu ${values.newExpense} thêm thành công`);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success(`Chi tiêu ${values.newExpense} xoá thành công`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Hello <span className="accent">{userName}</span>
          </h1>
          <img
            src={toothless}
            height={200}
            width={200}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <MomJoke />
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Danh Sách Ngân Quỹ</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Chi Tiêu Gần Đây</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to={"/expenses"} className="btn btn--dark">
                        Xem tất cả chi tiêu
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
