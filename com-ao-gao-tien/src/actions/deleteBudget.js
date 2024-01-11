import { redirect } from "react-router-dom";
import { deleteItem, getAllMatchingItems } from "../helper";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });
  } catch (e) {
    throw new Error(e.message);
  }

  return redirect("/");
}
