import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (fullName) => {
  if (!fullName) return "";
  const words = fullName.split(" ");
  let initials = words.join(" ")[0];
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return null;
  const chartData =
    Array.isArray(data) &&
    data.map((item, index) => ({
      category: item?.category,
      amount: parseFloat(item?.amount) || 0,
      month: item.category || `Item${index + 1}`,
    }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData =
    Array.isArray(sortedData) &&
    sortedData.map((item) => ({
      amount: item?.amount,
      source: item?.source,
      month: moment(item?.date).format("Do MMM"),
    }));

  return chartData;
};
export const prepareExpenseLineChart = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
