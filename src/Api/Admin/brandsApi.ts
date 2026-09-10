import { supabase } from "../supabase";
import type { IBrand } from "../../Types/Home/IBrand";

export const getAdminBrands = async (): Promise<IBrand[]> => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Brands Error:", error);
    throw new Error("خطا در دریافت برندها");
  }

  return data as IBrand[];
};

export const createBrand = async (
  brand: Omit<IBrand, "id">,
): Promise<IBrand> => {
  const { data: brands, error: brandsError } = await supabase
    .from("brands")
    .select("id");

  if (brandsError) {
    console.error("Get Brand IDs Error:", brandsError);
    throw new Error("خطا در دریافت شناسه برندها");
  }

  const ids = (brands ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("brands")
    .insert({
      id: newId,
      ...brand,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Brand Error:", error);
    throw new Error("خطا در ایجاد برند");
  }

  return data as IBrand;
};

export const updateBrand = async (
  id: IBrand["id"],
  brand: Partial<Omit<IBrand, "id">>,
): Promise<IBrand> => {
  const { data, error } = await supabase
    .from("brands")
    .update(brand)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    console.error("Update Brand Error:", error);
    throw new Error("خطا در ویرایش برند");
  }

  return data as IBrand;
};

export const deleteBrand = async (id: IBrand["id"]): Promise<void> => {
  const { error } = await supabase.from("brands").delete().eq("id", Number(id));

  if (error) {
    console.error("Delete Brand Error:", error);
    throw new Error("خطا در حذف برند");
  }
};
