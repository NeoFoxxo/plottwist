"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Textarea } from "./ui/textarea";

interface UserProfileProps {
  profileData: {
    admin: boolean;
    bio: string | null;
    links?: string[] | null;
    created_at: string;
    email: string;
    id: number;
    image: string | null;
    name: string | null;
    user_id: string;
  };
  date: string;
  storyCount: number | null;
  userId: string | undefined;
}

export default function UserProfile({ profileData, date, storyCount, userId }: UserProfileProps) {
  const { name, image, email, bio, links } = profileData;

  const accountInfo = [storyCount, 20, 570];
  const texts = ["Stories", "Stars", "Bookmarks"];
  const defaultImage = `/icons/pfp${Math.floor(Math.random() * 5) + 1}.png`;
  const linkRegex = /^https?:\/\//;

  function makeLink(link: string) {
    // check if link starts with https:// or http://
    if (linkRegex.test(link)) {
      return link;
    } else {
      let cleanLink = `https://${link}`;
      return cleanLink;
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="container flex w-full items-start justify-center gap-4 max-lg:flex-col">
        <CardContainer className="inter-var py-0">
          <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-9 dark:border-white/[0.2] dark:bg-black/30 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] ">
            <div className="flex items-center justify-start gap-6">
              <CardItem translateZ="50">
                <Image
                  src={image ? image!! : defaultImage!!}
                  alt="default-user"
                  className="h-10 w-10 cursor-pointer rounded-full transition-all hover:shadow-[0em_0em_1em_rgba(255,255,255,0.8)] md:h-28 md:w-28"
                />
              </CardItem>
              <CardItem translateZ="60">
                <h4
                  style={{
                    textShadow: "0em 0em 0.4em white",
                  }}
                  className="text-3xl font-bold">
                  {name ? name : "Default Name"}
                </h4>
                <p className="text-sm text-gray-500 md:text-[1.15rem]">{email}</p>
              </CardItem>
            </div>
            <div className="flex gap-3 pt-3.5">
              {accountInfo.map((info: any, index) => (
                <CardItem translateZ="40" key={index}>
                  <div className="flex flex-col items-center gap-2 md:flex-row">
                    <span
                      style={{
                        textShadow: "0em 0em 0.4em white",
                      }}
                      className="text-[1.2rem] font-bold md:text-xl">
                      {info}
                    </span>
                    <span className="text-sm font-light text-neutral-300">{texts[index]}</span>
                  </div>
                </CardItem>
              ))}
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var py-0">
          <CardBody className="relative flex h-auto w-full flex-1 flex-col gap-4 rounded-xl border border-black/[0.1] bg-gray-50 p-7 dark:border-white/[0.2] dark:bg-black/30 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
            <CardItem translateZ={"60"} className="w-full">
              <h3 className="pb-1 text-[1.2rem] font-bold md:text-xl">Username:</h3>
              <Input className="bg-transparent" value={name!!} disabled />
            </CardItem>
            <CardItem translateZ={"60"} className="w-full">
              <h3 className="pb-1 text-[1.2rem] font-bold md:text-xl">Bio:</h3>
              <Textarea className="w-full resize-none bg-transparent text-start" value={bio!!} disabled />
            </CardItem>
            <CardItem translateZ={"60"}>
              <h3 className="pb-1 text-[1.2rem] font-bold md:text-xl">Links:</h3>
              <div className="mx-auto grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
                {links?.map((singleLink, index) => {
                  const cleanLink = makeLink(singleLink);
                  return (
                    <a
                      key={index}
                      href={cleanLink}
                      className="w-full rounded-md border border-input bg-transparent p-2 text-xs hover:text-green-400 md:text-sm">
                      {cleanLink}
                    </a>
                  );
                })}
              </div>
            </CardItem>
            <CardItem translateZ={"40"}>
              <EditProfileModal profileData={profileData} userId={userId} />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
