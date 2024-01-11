import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { formatNumber } from "../helper";

const AddBudgetForm = () => {
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
      <h2 className="h3">Ngân Quỹ</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Tên Quỹ</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            required
            placeholder="vd: Ăn uống, Nhu yếu phẩm,.."
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Tiền Quỹ</label>
          <input
            type="text"
            name="newBudgetAmount"
            id="newBudgetAmount"
            required
            placeholder="vd: 200,000"
            onInput={(e) => formatNumber("newBudgetAmount")}
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Đang tạo...</span>
          ) : (
            <>
              <span>Tạo ngân quỹ</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
