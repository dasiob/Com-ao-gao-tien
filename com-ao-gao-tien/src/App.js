import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashBoardAction, dashBoardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { logoutAction } from "./actions/logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMain from "./pages/ErrorMain";
import ExpensesPage, {
  expensePageAction,
  expensePageLoader,
} from "./pages/ExpensesPage";
import BudgetsPage, {
  budgetPageAction,
  budgetPageLoader,
} from "./pages/BudgetsPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <ErrorMain />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashBoardAction,
        errorElement: <Error />,
      },
      {
        path: "/expenses",
        element: <ExpensesPage />,
        loader: expensePageLoader,
        action: expensePageAction,
        errorElement: <Error />,
      },
      {
        //:id will automaticly understand as params to parse to budgetPageLoader
        path: "/budgets/:id",
        element: <BudgetsPage />,
        loader: budgetPageLoader,
        action: budgetPageAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
