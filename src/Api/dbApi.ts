let dbPromise: Promise<any> | null = null;

export const getDbData = async () => {
  if (!dbPromise) {
    dbPromise = fetch(`${import.meta.env.BASE_URL}db.json`).then(
      async (response) => {
        if (!response.ok) {
          throw new Error("خطا در دریافت db.json");
        }

        return response.json();
      }
    );
  }

  return dbPromise;
};