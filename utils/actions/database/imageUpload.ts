import { createClient } from "@/utils/supabase/client";

export default async function imageUpload(file: File) {
  const supabase = createClient();

  const fileNamePrefix: string = Date.now().toString();
  const fileName: string = fileNamePrefix + file.name;

  const pathPrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  if (!pathPrefix) throw Error(".env for Storage URL not found!");

  const { data, error } = await supabase.storage.from("avatars").upload(fileName, file);

  if (error) return false;
  return pathPrefix + "/" + data.path;
}
