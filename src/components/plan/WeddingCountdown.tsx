import moment from "moment";

interface WeddingCountdownProps {
  date: Date;
}

const WeddingCountdown = ({ date }: WeddingCountdownProps) => {
  const duration = moment.duration(moment(date).diff(moment()));

  return (
    <div className="p-6 flex flex-col gap-1 items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
          <h1 className="font-semibold text-3xl">
            {Math.floor(duration.asYears())}
          </h1>
          <p className="font-light text-sm">Years Left</p>
        </div>
        <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
          <h1 className="font-semibold text-3xl">
            {Math.floor(duration.asMonths()) % 12}
          </h1>
          <p className="font-light text-sm">Months Left</p>
        </div>
        <div className="w-24 h-24 border-neutral-300 shadow-md border-2 rounded-xl flex flex-col gap-1 items-center justify-center bg-slate-50">
          <h1 className="font-semibold text-3xl">
            {Math.floor(duration.asDays()) % 30}
          </h1>
          <p className="font-light text-sm">Days Left</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingCountdown;
