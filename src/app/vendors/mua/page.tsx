import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

const MakeUp = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Make Up Artist", value: "mua" },
    { title: "Pak Andam", value: "pakandam" },
  ];
  return (
    <>
      {/* <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg">
        <MaxWidthWrapper>
          <FeaturedReel title="Make Up Artist" category="mua" user={user?.id} />
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

export default MakeUp;
