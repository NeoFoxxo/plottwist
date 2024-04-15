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
};

export default function UserProfile({ profileData }: PROFILE_DATA_TYPES) {
    return <div className="w-full p-5"></div>;
}
