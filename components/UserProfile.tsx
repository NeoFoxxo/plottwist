"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card-hover-effect";
import { Form, FormField } from "./ui/form";

type PROFILE_DATA_TYPES = {
    profileData: {
        created_at: string;
        email: string;
        id: number;
        image: string | null;
        name: string | null;
        user_id: string;
    };
    date: string;
};

export default function UserProfile({ profileData, date }: PROFILE_DATA_TYPES) {
    const { name, image, email, created_at } = profileData;
    const defaultImage =
        "https://ik.imagekit.io/fabric01/linkx/default.png?updatedAt=1708353019749";

    const bio = "";
    const accountInfo = [70, 20, 570];
    const texts = ["Followers", "Following", "Likes"];

    return (
        <div className="flex justify-around w-full pt-5">
            <Card className="flex flex-col w-1/3 p-1.5">
                <div className="flex items-center justify-start gap-6">
                    <img
                        src={image ? image : defaultImage}
                        alt="default-user"
                        className="rounded-full w-28 h-28"
                    />
                    <div>
                        <h4 className="text-3xl font-bold">{name ? name : "Default Name"}</h4>
                        <p className="text-[1.15rem] text-gray-300">{email}</p>
                    </div>
                </div>
                <div className="flex gap-3 pt-3.5">
                    {accountInfo.map((info: any, index) => (
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">{info}</span>
                            <span className="text-lg font-light text-neutral-300">{texts[index]}</span>
                        </div>
                    ))}
                </div>
            </Card>
            <Card className="flex flex-col w-7/12">
                <Textarea className="w-full h-40 text-left resize-none" placeholder="Bio">{bio.length > 0 ? bio : "No bio yet."}</Textarea>

                <div className="grid grid-cols-2 gap-6 pt-6">
                    <Input className="w-full p-2 bg-transparent" placeholder="some holder" />
                    <Input className="w-full p-2 bg-transparent" placeholder="some holder" />
                    <Input className="w-full p-2 bg-transparent" placeholder="some holder" />
                    <Input className="w-full p-2 bg-transparent" placeholder="some holder" />
                </div>
            </Card>
        </div>
    );
}