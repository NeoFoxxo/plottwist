import { createClient } from "@/utils/supabase/client";
import imageCompression from "browser-image-compression";

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
    throw Error("Compression failed!");
  }
}

export default async function imageUpload(file: File) {
  const supabase = createClient();

  const fileNamePrefix: string = Date.now().toString();
  const fileName: string = fileNamePrefix + file.name;

  const pathPrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  if (!pathPrefix) throw Error(".env for Storage URL not found!");

  const compressedFile = await compressImage(file);
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, compressedFile);

  if (error) return false;
  return pathPrefix + "/" + data.path;
}
