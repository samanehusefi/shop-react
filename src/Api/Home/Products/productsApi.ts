export const getProducts = async () => {
  const isProduction = import.meta.env.PROD;

  const response = await fetch(
    isProduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/products`,
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات products");
  }

  const data = await response.json();

  return isProduction ? data.products : data;
};
