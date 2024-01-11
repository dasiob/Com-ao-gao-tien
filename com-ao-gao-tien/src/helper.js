// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const formatNumber = (elementName) => {
  console.log("maybe a");
  let numberInput = document.getElementById(elementName);
  console.log("maybe b");
  let value = numberInput.value.replace(/[^0-9]/g, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  numberInput.value = value;
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
    color: generateRandomColor(),
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const amountToNumber = (amount) => {
  return amount.replace(/[^0-9]/g, "");
};

const generateRandomColor = () => {
  const exisstingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${exisstingBudgetLength * 34} 65% 50%`;
};

export const momJokeGenerator = async () => {
  const apiUrl = "http://localhost:8080/api/dash-board/mom-joke";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Mom joke generator failed");
    }
    console.log(response);
    return (await response.text()).replace(/[\\|\r|\n]/g, "");
  } catch (e) {
    return null;
  }
};

export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount);
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return new Date(epoch).toLocaleString(undefined, options);
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const items = fetchData(category) ?? [];
  return items.filter((item) => item[key] === value);
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
