import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

const Misc = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Decor", value: "decor" },
    { title: "Berkat", value: "berkat" },
    { title: "Dulang & Gubahan", value: "dulang" },
    { title: "Wedding Cake", value: "cake" },
    { title: "Live Stations", value: "liveStation" },
    { title: "Catering", value: "catering" },
  ];

  return (
    <>
      {/* <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg">
        <MaxWidthWrapper>
          <FeaturedReel title="Misc" category="misc" user={user?.id} />
        </MaxWidthWrapper>
      </div> */}
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
