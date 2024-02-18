"use client";

import { trpc } from "@/trpc/client";
import CRMDataPull from "./CRMDataPull";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CRMAddLead from "./CRMAddLead";

interface CRMContProps {
  userId: string;
  role: string;
}

const CRMCont = ({ userId, role }: CRMContProps) => {
  const getVendorId = trpc.getVendorId.useQuery({
    userId: userId,
  });

  const vendorId = getVendorId.data?.docs[0].id;

  return (
    <div className="px-24">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Date Created</TableHead>
            <TableHead className="w-[300px]">Contact Details</TableHead>
            <TableHead className="w-[180px]">Source</TableHead>
            <TableHead className="w-[180px]">Status</TableHead>
            <TableHead className="w-[180px]">Priority</TableHead>
            <TableHead className="w-[200px]">Remarks</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendorId ? <CRMAddLead vendorId={vendorId} /> : null}
          {vendorId ? <CRMDataPull vendorId={vendorId} role={role} /> : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default CRMCont;
