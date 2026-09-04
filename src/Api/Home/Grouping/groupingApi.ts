export const getGrouping = async () => {
  const isProduction = import.meta.env.PROD;

  const response = await fetch(
    isProduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/grouping`
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Grouping");
  }

  const data = await response.json();

  return isProduction ? data.grouping : data;
};