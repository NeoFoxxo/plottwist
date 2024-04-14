import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? <div className="">{user.email}</div> : <div>Guest</div>;
}
