import { trpc } from "@/trpc/client";
import { TableCell, TableRow } from "../ui/table";
import { Delete, Loader } from "lucide-react";
import { priorities, statuses } from "@/app/data/data";
import { Sheet, SheetContent } from "../ui/sheet";
import { useState } from "react";
import CRMEditLead from "./CRMEditLead";
import { Skeleton } from "../ui/skeleton";
import { Lead } from "@/payload-types";
import { format } from "date-fns";

interface CRMDataPullProps {
  vendorId: string;
  role: string;
}

function getLead(string: string) {
  const getLead = trpc.getLead.useQuery({
    id: string,
  });

  if (getLead.status === "loading") {
    return <Loader className="animate-spin" />;
  } else if (getLead.status === "success" && getLead.data) {
    return <CRMEditLead lead={getLead.data.docs[0]} />;
  }
}

const CRMDataPull = ({ vendorId, role }: CRMDataPullProps) => {
  const getLeads = trpc.getLeads.useQuery({
    vendorId: vendorId,
  });

  const leads = getLeads.data?.docs;

  const removeLead = trpc.removeLead.useMutation();

  const statusAndIcon = (string: string) => {
    const status = statuses.find((status) => status.value === string);

    if (!status) {
      return null;
    }

    return (
      <div className="flex w-[100px] items-center gap-3">
        {status.icon2}
        <span>{status.label}</span>
      </div>
    );
  };

  const priorityAndIcon = (string: string) => {
    const priority = priorities.find((priority) => priority.value === string);

    if (!priority) {
      return null;
    }

    return (
      <div className="flex w-[100px] items-center gap-3">
        {priority.icon2}
        <span>{priority.label}</span>
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState("");

  function changeDateFormat(string: string) {
    const dateString = string;
    const dateObject = dateString.substring(0, 10);
    return dateObject;
  }

  const isSuperVendor = role === "supervendor";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      {leads?.map((lead: Lead) =>
        lead.source === "Sarang Sayang" ? (
          isSuperVendor ? (
            <TableRow
              key={lead.createdAt}
              className="cursor-pointer"
              onClick={() => [
                setOpen(true),
                setRowSelection(""),
                setRowSelection(lead.id),
              ]}
            >
              <TableCell>{format(lead.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-3">
                  <p>{lead.name}</p>
                  <p>{lead.email}</p>
                  <p>{lead.contact}</p>
                </div>
              </TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>{statusAndIcon(lead.status)}</TableCell>
              <TableCell>{priorityAndIcon(lead.priority)}</TableCell>
              <TableCell>{lead.remarks}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : (
            <TableRow key={lead.createdAt}>
              <TableCell>{format(lead.createdAt, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-full h-[30px] rounded-full" />
                  <Skeleton className="w-full h-[30px] rounded-full" />
                  <Skeleton className="w-full h-[30px] rounded-full" />
                </div>
              </TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px] rounded-full" />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )
        ) : (
          <TableRow
            key={lead.createdAt}
            className="cursor-pointer"
            onClick={() => [
              setOpen(true),
              setRowSelection(""),
              setRowSelection(lead.id),
            ]}
          >
            <TableCell>{format(lead.createdAt, "dd/MM/yyyy")}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-3">
                <p>{lead.name}</p>
                <p>{lead.email}</p>
                <p>{lead.contact}</p>
              </div>
            </TableCell>
            <TableCell>{lead.source}</TableCell>
            <TableCell>{statusAndIcon(lead.status)}</TableCell>
            <TableCell>{priorityAndIcon(lead.priority)}</TableCell>
            <TableCell>{lead.remarks}</TableCell>
            <TableCell>
              <Delete
                className="text-rose-400 hover:text-rose-300 cursor-pointer"
                onClick={() => {
                  removeLead.mutate({
                    leadId: lead.id,
                  });
                }}
              />
            </TableCell>
          </TableRow>
        )
      )}
      <SheetContent side={"bottom"}>{getLead(rowSelection)}</SheetContent>
    </Sheet>
  );
};

export default CRMDataPull;
