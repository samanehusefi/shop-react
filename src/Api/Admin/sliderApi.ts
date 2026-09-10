import { supabase } from "../supabase";
import type { ISlider } from "../../Types/Home/ISlider";

export const getAdminSliders = async (): Promise<ISlider[]> => {
  const { data, error } = await supabase
    .from("slider")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Get Sliders Error:", error);
    throw new Error("خطا در دریافت اسلایدرها");
  }

  return data as ISlider[];
};

export const createSlider = async (
  slider: Omit<ISlider, "id">,
): Promise<ISlider> => {
  const { data: sliders, error: slidersError } = await supabase
    .from("slider")
    .select("id");

  if (slidersError) {
    console.error("Get Slider IDs Error:", slidersError);
    throw new Error("خطا در دریافت شناسه اسلایدرها");
  }

  const ids = (sliders ?? [])
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const { data, error } = await supabase
    .from("slider")
    .insert({
      id: newId,
      ...slider,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Slider Error:", error);
    throw new Error("خطا در ایجاد اسلایدر");
  }

  return data as ISlider;
};

export const updateSlider = async (
  id: ISlider["id"],
  slider: Partial<Omit<ISlider, "id">>,
): Promise<ISlider> => {
  const { data, error } = await supabase
    .from("slider")
    .update(slider)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    console.error("Update Slider Error:", error);
    throw new Error("خطا در ویرایش اسلایدر");
  }

  return data as ISlider;
};

export const deleteSlider = async (id: ISlider["id"]): Promise<void> => {
  const { error } = await supabase.from("slider").delete().eq("id", Number(id));

  if (error) {
    console.error("Delete Slider Error:", error);
    throw new Error("خطا در حذف اسلایدر");
  }
};
