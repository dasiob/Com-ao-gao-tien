import React from "react";
import { fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

export function expensePageLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h2>
        All <span className="accent">expenses</span>
      </h2>
      {expenses && expenses.length > 0 ? (
        <Table expenses={expenses} />
      ) : (
        <p>Currently you have no expense yet.</p>
      )}
    </div>
  );
};

export default ExpensesPage;
