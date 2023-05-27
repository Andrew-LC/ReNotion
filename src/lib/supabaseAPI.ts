import supabaseClient from "./supabaseClient"

async function updateHeading(token: unknown, page_id: string, newtitle: string) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("pages")
    .update({ title: newtitle })
    .eq('page_id', page_id)
    .select()
  console.log(data)
  console.log(error)
}


export { updateHeading }
