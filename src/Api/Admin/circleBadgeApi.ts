import { supabase } from "../supabase";
import type { ICircleBadge } from "../../Types/Home/ICircleBadge";

export const getAdminCircleBadge = async (): Promise<ICircleBadge[]> => {
  const { data, error } = await supabase
    .from("circle_badge")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Circle Badge Error:", error);
    throw new Error("خطا در دریافت Circle Badge");
  }

  return data as ICircleBadge[];
};

export const createCircleBadge = async (
  circleBadge: Omit<ICircleBadge, "id">,
): Promise<ICircleBadge> => {
  const { data: items, error: itemsError } = await supabase
    .from("circle_badge")
    .select("id");

  if (itemsError) {
    console.error("Get Circle Badge IDs Error:", itemsError);
    throw new Error("خطا در دریافت شناسه Circle Badge");
  }

  const ids = (items ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("circle_badge")
    .insert({
      id: newId,
      ...circleBadge,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Circle Badge Error:", error);
    throw new Error("خطا در ایجاد Circle Badge");
  }

  return data as ICircleBadge;
};

export const updateCircleBadge = async (
  id: ICircleBadge["id"],
  data: Partial<Omit<ICircleBadge, "id">>,
): Promise<ICircleBadge> => {
  const { data: updatedData, error } = await supabase
    .from("circle_badge")
    .update(data)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    console.error("Update Circle Badge Error:", error);
    throw new Error("خطا در ویرایش Circle Badge");
  }

  return updatedData as ICircleBadge;
};

export const deleteCircleBadge = async (
  id: ICircleBadge["id"],
): Promise<void> => {
  const { error } = await supabase
    .from("circle_badge")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Delete Circle Badge Error:", error);
    throw new Error("خطا در حذف Circle Badge");
  }
};
