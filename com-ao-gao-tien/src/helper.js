// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteUser = ({ key }) => {
  return localStorage.removeItem(key);
};

export const formatNumber = () => {
  let numberInput = document.getElementById("newBudgetAmount");
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

export const amountToNumber = (amount) => {
  return amount.replace(/[^0-9]/g, "");
};

const generateRandomColor = () => {
  const exisstingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${exisstingBudgetLength * 34} 65% 50%`;
};

export const momJokeGenerator = async () => {
  const apiUrl =
    "http://localhost:8080/api/dash-board/mom-joke";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Mom joke generator failed");
    }
    console.log(response);
    return await response.text();
  } catch (e) {
    return null;
  }
};
