export const getOptions = async () => {
  const isProduction = import.meta.env.PROD;

  const response = await fetch(
    isProduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/options`
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Options");
  }

  const data = await response.json();

  return isProduction ? data.options : data;
};