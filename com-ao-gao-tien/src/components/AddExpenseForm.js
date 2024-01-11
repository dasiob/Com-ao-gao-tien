import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { formatNumber } from "../helper";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();

  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Chi Tiêu
        <span className="accent">
          {budgets.length === 1 && ` ${budgets.map((budg) => budg.name)}`}
        </span>
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Tên Chi Tiêu</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              required
              placeholder="vd: Cà phê, Figure,..."
              ref={focusRef}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Đã Chi</label>
            <input
              type="text"
              name="newExpenseAmount"
              id="newExpenseAmount"
              required
              placeholder="vd 300,000"
              onInput={(e) => formatNumber("newExpenseAmount")}
            />
          </div>
        </div>
        <div className="grid-xs">
          <label htmlFor="newExpenseBudget">Ngân Quỹ</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Đang tạo...</span>
          ) : (
            <>
              <span>Lưu chi tiêu</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
