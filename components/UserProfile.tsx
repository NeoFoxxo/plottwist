"use client";

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

    return (
        <div className="flex w-full p-5 flex-col gap-8">
            <div className="flex gap-4 justify-start items-center">
                <img
                    src={image ? image : defaultImage}
                    alt="default-user"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h4>{name ? name : "Default Name"}</h4>
                    <p className="text-[1.15rem] text-gray-300">{email}</p>
                </div>
            </div>
            <p className="text-sm">Created At: {date}</p>
        </div>
    );
}
