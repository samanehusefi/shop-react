import { supabase } from "../supabase";
import type { ICreateProduct, IProduct } from "../../Types/Home/IProduct";

export const getAdminProducts = async (): Promise<IProduct[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Products Error:", error);
    throw error;
  }

  return (data ?? []) as IProduct[];
};

export const createProduct = async (
  product: ICreateProduct,
): Promise<IProduct> => {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id");

  if (productsError) {
    console.error("Get Product IDs Error:", productsError);
    throw productsError;
  }

  const ids = (products ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      id: newId,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Product Error:", error);
    throw error;
  }

  return data as IProduct;
};
export const updateProduct = async (
  id: IProduct["id"],
  product: Partial<ICreateProduct>,
): Promise<IProduct> => {
  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", Number(id));

  if (error) {
    console.error("Update Product Error:", error);
    throw error;
  }

  const { data, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (fetchError) {
    console.error("Get Updated Product Error:", fetchError);
    throw fetchError;
  }

  if (!data) {
    throw new Error("محصول پس از ویرایش پیدا نشد");
  }

  return data as IProduct;
};

export const deleteProduct = async (id: IProduct["id"]): Promise<void> => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
};
