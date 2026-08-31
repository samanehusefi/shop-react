const API_URL = import.meta.env.VITE_API_URL;

export const getShopData = async () => {
  const isProduction = import.meta.env.PROD;

  if (isProduction) {
    const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

    if (!response.ok) {
      throw new Error("خطا در دریافت اطلاعات");
    }

    const data = await response.json();

    return {
      incredible: data.incredible,
      grouping: data.grouping,
      brands: data.brands,
      options: data.options,
    };
  }

  const [
    incredibleResponse,
    groupingResponse,
    brandsResponse,
    optionsResponse,
  ] = await Promise.all([
    fetch(`${API_URL}/incredible`),
    fetch(`${API_URL}/grouping`),
    fetch(`${API_URL}/brands`),
    fetch(`${API_URL}/options`),
  ]);

  if (
    !incredibleResponse.ok ||
    !groupingResponse.ok ||
    !brandsResponse.ok ||
    !optionsResponse.ok
  ) {
    throw new Error("خطا در دریافت اطلاعات");
  }

  const [incredible, grouping, brands, options] = await Promise.all([
    incredibleResponse.json(),
    groupingResponse.json(),
    brandsResponse.json(),
    optionsResponse.json(),
  ]);

  return {
    incredible,
    grouping,
    brands,
    options,
  };
};

export default API_URL;
