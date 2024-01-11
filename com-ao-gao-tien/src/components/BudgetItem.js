import React from "react";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} quỹ</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>Đã tiêu {formatCurrency(spent)}</small>
        <small>Còn lại {formatCurrency(amount - spent)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action={`/budgets/${id}/delete`}
            onSubmit={(event) => {
              if (!window.confirm(`Chắc là muốn xóa ngân quỹ ${name} không? Toàn bộ chi tiêu của quỹ này cũng sẽ bị xóa theo đấy :))`)) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Xóa ngân quỹ</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budgets/${id}`} className="btn">
            <span>Xem Chi Tiết</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
