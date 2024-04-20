import { createClient } from "@/utils/supabase/server";
import { generateRandomUsername } from "../api/generateUsername";

export async function createProfile() {
  const supabase = createClient();

  // Create profile if user authenticated
  const { data } = await supabase.auth.getUser();
  if (data.user?.aud !== "authenticated") throw new Error("User auth failed!");

  const user_id = data.user?.id;
  const email = data.user?.email;
  const username = await generateRandomUsername();
  const normalised_name = username.toLowerCase();

  if (!email) throw Error("Email not found!");

  // User exist check
  const { error } = await supabase.rpc("create_profile_rpc", {
    my_user_id: user_id,
    my_email: email,
    my_name: username,
    my_normalised_name: normalised_name,
    my_bio: `We don't have a description for ${username} yet.\nBut we're pretty sure that they're really cool!`,
  });

  if (error) throw Error("create_profile_rpc failed!");
}
