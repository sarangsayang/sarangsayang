import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

const Misc = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Berkat", value: "berkat" },
    { title: "Decor", value: "decor" },
    { title: "Dulang", value: "dulang" },
    { title: "Emcees and AV", value: "emcees" },
    { title: "Live Stations", value: "liveStation" },
    { title: "Performers", value: "performers" },
    { title: "Wedding Cake", value: "cake" },
    { title: "Pak Andam", value: "pakandam" },
    { title: "Kad Jemputan", value: "kadjemputan" },
  ];

  return (
    <>
      <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg">
        <MaxWidthWrapper>
          <FeaturedReel title="Misc" category="misc" user={user?.id} />
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        {subC.map((cat) => (
          <MiscPull
            key={cat.value}
            category={cat.value}
            title={cat.title}
            user={user?.id}
          />
        ))}
      </MaxWidthWrapper>
    </>
  );
};

export default Misc;
