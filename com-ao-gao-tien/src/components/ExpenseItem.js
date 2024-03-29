import React from "react";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helper";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && budget && (
        <td>
          <Link
            to={"/budgets/" + budget.id}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form
          method="post"
          onSubmit={(event) => {
            if (
              !window.confirm(`Có chắc là muốn xóa chi tiêu ${expense.name} không? `)
            ) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="_action" value={"deleteExpense"} />
          <input type="hidden" name="expenseId" value={expense.id} />
          <input type="hidden" name="expenseName" value={expense.name} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon height={15} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
