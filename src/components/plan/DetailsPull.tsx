"use client";

import { trpc } from "@/trpc/client";
import { Check, CheckCheck, CheckSquare2, Square } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Package, Vendor } from "@/payload-types";
import { categories } from "@/app/data/data";
import { Checkbox } from "../ui/checkbox";
import { VENDOR_CATEGORIES } from "@/config";

interface DetailsPullProps {
  plan: Plan;
  likesData: Data[];
}

interface Data {
  vendor: Vendor;
}

interface Plan {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  rsvpDate: string;
  inviDate: string;
  venue: string;
  agent: string;
  bridal: string;
  photovideo: string;
  catering: string;
  decor: string;
  henna: string;
  mua: string;
  emcee: string;
  honeymoon: string;
  misc: string;
}

const DetailsPull = ({ plan, likesData }: DetailsPullProps) => {
  const updatePlan = trpc.updatePlan.useMutation();

  const [brideName, setBrideName] = useState(plan.brideName);
  const [groomName, setGroomName] = useState(plan.groomName);
  const [brideButton, setBrideButton] = useState("bg-emerald-200");
  const [groomButton, setGroomButton] = useState("bg-emerald-200");
  const [venue, setVenue] = useState(false);
  const [bridals, setBridals] = useState(false);
  const [photovideo, setPhotovideo] = useState(false);
  const [catering, setCatering] = useState(false);
  const [decor, setDecor] = useState(false);
  const [henna, setHenna] = useState(false);
  const [mua, setMua] = useState(false);
  const [emcees, setEmcees] = useState(false);
  const [honeymoon, setHoneymoon] = useState(false);
  const [misc, setMisc] = useState(false);

  const setChecklist = (services: string[]) => {
    for (let i = 0; i < services.length; i++) {
      if (services[i] === "venues") {
        setVenue(true);
      } else if (services[i] === "bridals") {
        setBridals(true);
      } else if (services[i] === "photovideo") {
        setPhotovideo(true);
      } else if (services[i] === "catering") {
        setCatering(true);
      } else if (services[i] === "decor") {
        setDecor(true);
      } else if (services[i] === "henna") {
        setHenna(true);
      } else if (services[i] === "mua") {
        setMua(true);
      } else if (services[i] === "emcees") {
        setEmcees(true);
      } else if (services[i] === "honeymoon") {
        setHoneymoon(true);
      } else if (services[i] === "misc") {
        setMisc(true);
      }
    }
  };

  const [weddingDate, setWeddingDate] = useState<Date>(
    new Date(plan.weddingDate)
  );

  const duration = moment.duration(moment(weddingDate).diff(moment()));

  function handleBrideNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setBrideName(event.target.value);
    setBrideButton("bg-amber-200 ease-in-out duration-300");
  }

  function handleGroomNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setGroomName(event.target.value);
    setGroomButton("bg-amber-200 ease-in-out duration-300");
  }

  const handleWeddingDateChange = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setWeddingDate(new Date(formattedDate));

    updatePlan.mutate({
      id: plan.id,
      weddingDate: formattedDate,
    });
  };

  const getShortlist = (category: string) => {
    if (category === "venues" && plan.venue) {
      //@ts-ignore
      return plan.venue as Vendor;
    } else if (category === "agents" && plan.agent) {
      //@ts-ignore
      return plan.agent as Vendor;
    } else if (category === "bridals" && plan.bridal) {
      //@ts-ignore
      return plan.bridal as Vendor;
    } else if (category === "photovideo" && plan.photovideo) {
      //@ts-ignore
      return plan.photovideo as Vendor;
    } else if (category === "catering" && plan.catering) {
      //@ts-ignore
      return plan.catering as Vendor;
    } else if (category === "decor" && plan.decor) {
      //@ts-ignore
      return plan.decor as Vendor;
    } else if (category === "henna" && plan.henna) {
      //@ts-ignore
      return plan.henna as Vendor;
    } else if (category === "mua" && plan.mua) {
      //@ts-ignore
      return plan.mua as Vendor;
    } else if (category === "emcees" && plan.emcee) {
      //@ts-ignore
      return plan.emcee as Vendor;
    } else if (category === "honeymoon" && plan.honeymoon) {
      //@ts-ignore
      return plan.honeymoon as Vendor;
    } else if (category === "misc" && plan.misc) {
      //@ts-ignore
      return plan.misc as Vendor;
    }
  };

  const handleShortlistChange = (event: string, category: string) => {
    const selectedValue = event;

    if (category === "venues") {
      updatePlan.mutate({
        id: plan.id,
        venue: selectedValue,
      });
    } else if (category === "agents") {
      updatePlan.mutate({
        id: plan.id,
        agent: selectedValue,
      });
    } else if (category === "bridals") {
      updatePlan.mutate({
        id: plan.id,
        bridal: selectedValue,
      });
    } else if (category === "photovideo") {
      updatePlan.mutate({
        id: plan.id,
        photovideo: selectedValue,
      });
    } else if (category === "catering") {
      updatePlan.mutate({
        id: plan.id,
        catering: selectedValue,
      });
    } else if (category === "decor") {
      updatePlan.mutate({
        id: plan.id,
        decor: selectedValue,
      });
    } else if (category === "henna") {
      updatePlan.mutate({
        id: plan.id,
        henna: selectedValue,
      });
    } else if (category === "mua") {
      updatePlan.mutate({
        id: plan.id,
        mua: selectedValue,
      });
    } else if (category === "emcees") {
      updatePlan.mutate({
        id: plan.id,
        emcee: selectedValue,
      });
    } else if (category === "honeymoon") {
      updatePlan.mutate({
        id: plan.id,
        honeymoon: selectedValue,
      });
    } else if (category === "misc") {
      updatePlan.mutate({
        id: plan.id,
        misc: selectedValue,
      });
    }
  };

  const vendCatLabel = (string: string) => {
    const category = VENDOR_CATEGORIES.find((cat) => cat.value === string);

    if (!category) {
      return null;
    }

    return category.label;
  };

  return (
    <MaxWidthWrapper>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-lg p-7 bg-gradient-to-r from-pink-100 to-cyan-100">
        <div className="p-6 flex flex-col justify-around">
          <Label htmlFor="brideName">Bride&apos;s Name</Label>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input
              id="brideName"
              value={brideName}
              className="text-center"
              onChange={handleBrideNameChange}
            />
            <Button
              variant="outline"
              size="icon"
              className={brideButton}
              onClick={() => {
                updatePlan.mutate({
                  id: plan.id,
                  brideName: brideName,
                });
                setBrideButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-4" />
            </Button>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-around">
          <Label htmlFor="groomName">Groom&apos;s Name</Label>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input
              id="groomName"
              value={groomName}
              className="text-center"
              onChange={handleGroomNameChange}
            />
            <Button
              variant="outline"
              size="icon"
              className={groomButton}
              onClick={() => {
                updatePlan.mutate({
                  id: plan.id,
                  groomName: groomName,
                });
                setGroomButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full rounded-lg p-6 bg-gradient-to-r from-pink-100 to-cyan-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
          <div className="flex flex-col items-center justify-center py-6">
            <h2 className="font-semibold">Wedding Date</h2>
            <div className="p-6 flex flex-col gap-1 items-center justify-center">
              <p>{JSON.stringify({ weddingDate })}</p>
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
            <Image
              src="https://i.giphy.com/media/gaJPlAdO21ns6Z2M3e/giphy-downsized.gif"
              alt="WeddingExcited"
              width={250}
              height={250}
              className="mt-3"
            />
          </div>
          <div className="flex flex-col items-center justify-center py-6">
            <Calendar
              mode="single"
              required
              selected={weddingDate}
              // @ts-ignore
              onSelect={handleWeddingDateChange}
              className="rounded-md border my-3 bg-slate-50"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full rounded-lg py-10 px-20 flex flex-col items-center bg-gradient-to-r from-pink-100 to-cyan-100">
        <h2 className="font-semibold w-full">Wedding Checklist</h2>
        <div className="grid grid-cols-3">
          <div className="bg-white/40 sticky top-20 h-[600px] grid grid-cols-1 gap-4 p-5 rounded-lg shadow-sm mt-6">
            <div className="flex gap-3 items-center p-2">
              {venue ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Venue</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {bridals ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Bridal</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {photovideo ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Photo & Video</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {catering ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Catering</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {decor ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Decor</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {henna ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Henna</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {mua ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Make Up Artist</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {emcees ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Emcee</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {honeymoon ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Honeymoon</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {misc ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Misc</p>
            </div>
          </div>
          <div className="flex flex-col items-end z-10 col-span-2">
            {categories.map((category) => (
              <div key={category.value} className="py-6 w-[90%]">
                <Label className="flex gap-2 items-center">
                  <span>{category.icon}</span> {category.label}
                </Label>
                <Select
                  value={getShortlist(category.value)?.id}
                  onValueChange={(event) =>
                    handleShortlistChange(event, category.value)
                  }
                >
                  <SelectTrigger className="h-32 mt-3 px-10 bg-sky-50 shadow-lg">
                    <SelectValue placeholder="Shortlist a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {likesData.map((vendor) =>
                      vendor.vendor.category === category.value ? (
                        <SelectItem
                          value={vendor.vendor.id}
                          key={vendor.vendor.id}
                        >
                          <div className="flex flex-row gap-4 items-center px-6">
                            <Image
                              //@ts-ignore
                              src={vendor.vendor.images[0].image.url}
                              width={100}
                              height={100}
                              alt={`${vendor.vendor.name}-image`}
                              className="aspect-square"
                              style={{ objectFit: "cover" }}
                            />
                            <p className="font-semibold">
                              {vendor.vendor.name}
                            </p>
                          </div>
                        </SelectItem>
                      ) : null
                    )}
                  </SelectContent>
                </Select>
                {/* @ts-ignore */}
                {getShortlist(category.value)?.packages?.length > 0 ? (
                  <div className="bg-white/60 pt-6 mx-4 px-4 py-3 shadow-sm">
                    <p className="text-center text-slate-400 italic">
                      Shortlist a package below
                    </p>
                    <div className="py-3 w-full">
                      {getShortlist(category.value)?.packages?.map(
                        (listedPackage) => (
                          <div
                            className="p-3 grid grid-cols-2 lg:grid-cols-3"
                            // @ts-ignore
                            key={listedPackage.name}
                          >
                            <div className="flex items-center col-span-2">
                              {/* @ts-ignore */}
                              {listedPackage.services ? (
                                <Checkbox
                                  onClick={() =>
                                    //@ts-ignore
                                    setChecklist(listedPackage.services)
                                  }
                                  className="mx-5"
                                />
                              ) : null}
                              <p className="font-medium w-[90%]">
                                {/* @ts-ignore */}
                                {listedPackage.name}
                              </p>
                            </div>
                            <div className="grid grid-cols-1  gap-2">
                              {/* @ts-ignore */}
                              {listedPackage.services?.map((service) => (
                                <p
                                  className="flex gap-1 items-center"
                                  key={service}
                                >
                                  <span>
                                    <CheckCheck className="w-4 h-4 text-lime-600" />
                                  </span>
                                  {vendCatLabel(service)}
                                </p>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DetailsPull;
