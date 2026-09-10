import { supabase } from "../supabase";
import type { ICategory } from "../../Types/Home/ICategory";

export const getAdminCategories = async (): Promise<ICategory[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Categories Error:", error);
    throw error;
  }

  return (data ?? []) as ICategory[];
};

export const createCategory = async (
  category: Omit<ICategory, "id" | "showHomepage">,
): Promise<ICategory> => {
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id");

  if (categoriesError) {
    console.error("Get Category IDs Error:", categoriesError);
    throw categoriesError;
  }

  const ids = (categories ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("categories")
    .insert({
      id: newId,
      ...category,
      showHomepage: true,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Category Error:", error);
    throw error;
  }

  return data as ICategory;
};

export const updateCategory = async (
  id: ICategory["id"],
  category: Partial<Omit<ICategory, "id">>,
): Promise<ICategory> => {
  const { error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", Number(id));

  if (error) {
    console.error("Update Category Error:", error);
    throw error;
  }

  const { data, error: fetchError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (fetchError) {
    console.error("Get Updated Category Error:", fetchError);
    throw fetchError;
  }

  if (!data) {
    throw new Error("دسته‌بندی پس از ویرایش پیدا نشد");
  }

  return data as ICategory;
};
export const deleteCategory = async (id: ICategory["id"]): Promise<void> => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Delete Category Error:", error);
    throw error;
  }
};
