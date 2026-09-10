import { supabase } from "../supabase";
import type { IAmazing } from "../../Types/Home/IAmazing";

export const getAdminAmazing = async (): Promise<IAmazing[]> => {
  const { data, error } = await supabase
    .from("amazing")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Amazing Error:", error);
    throw new Error("خطا در دریافت Amazing");
  }

  return data as IAmazing[];
};

export const createAmazing = async (
  amazing: Omit<IAmazing, "id">,
): Promise<IAmazing> => {
  const { data: items, error: itemsError } = await supabase
    .from("amazing")
    .select("id");

  if (itemsError) {
    console.error("Get Amazing IDs Error:", itemsError);
    throw new Error("خطا در دریافت شناسه Amazing");
  }

  const ids = (items ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("amazing")
    .insert({
      id: newId,
      ...amazing,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Amazing Error:", error);
    throw new Error("خطا در ایجاد Amazing");
  }

  return data as IAmazing;
};

export const updateAmazing = async (
  id: IAmazing["id"],
  amazing: Partial<Omit<IAmazing, "id">>,
): Promise<IAmazing> => {
  const { data, error } = await supabase
    .from("amazing")
    .update(amazing)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    console.error("Update Amazing Error:", error);
    throw new Error("خطا در ویرایش Amazing");
  }

  return data as IAmazing;
};

export const deleteAmazing = async (id: IAmazing["id"]): Promise<void> => {
  const { error } = await supabase
    .from("amazing")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Delete Amazing Error:", error);
    throw new Error("خطا در حذف Amazing");
  }
};
