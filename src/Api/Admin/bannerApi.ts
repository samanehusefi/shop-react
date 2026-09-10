import { supabase } from "../supabase";
import type { IBanner } from "../../Types/Home/IBanner";

export const getAdminBanners = async (): Promise<IBanner[]> => {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Banners Error:", error);
    throw new Error("خطا در دریافت بنرها");
  }

  return data as IBanner[];
};

export const createBanner = async (
  banner: Omit<IBanner, "id">,
): Promise<IBanner> => {
  const { data: banners, error: bannersError } = await supabase
    .from("banners")
    .select("id");

  if (bannersError) {
    console.error("Get Banner IDs Error:", bannersError);
    throw new Error("خطا در دریافت شناسه بنرها");
  }

  const ids = (banners ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("banners")
    .insert({
      id: newId,
      ...banner,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Banner Error:", error);
    throw new Error("خطا در ایجاد بنر");
  }

  return data as IBanner;
};

export const updateBanner = async (
  id: IBanner["id"],
  banner: Partial<Omit<IBanner, "id">>,
): Promise<IBanner> => {
  const { data, error } = await supabase
    .from("banners")
    .update(banner)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    console.error("Update Banner Error:", error);
    throw new Error("خطا در ویرایش بنر");
  }

  return data as IBanner;
};

export const deleteBanner = async (
  id: IBanner["id"],
): Promise<void> => {
  const { error } = await supabase
    .from("banners")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Delete Banner Error:", error);
    throw new Error("خطا در حذف بنر");
  }
};