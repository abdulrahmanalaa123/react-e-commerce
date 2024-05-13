import { supabase } from "../../lib/supabaseClient";

async function searchProducts({ searchKey, pageNo = 1, pagesCount = 16 }) {
  const { data, error } = await supabase
    .from("products")
    .select("name,featured_image,price")
    .textSearch("name", searchKey, {
      config: "english",
    })
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);

  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
}
