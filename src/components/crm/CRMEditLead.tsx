import { trpc } from "@/trpc/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { PencilRuler } from "lucide-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { priorities, statuses } from "@/app/data/data"
import { Button } from "../ui/button"
import { SheetClose } from "../ui/sheet"


interface CRMDataPullProps {
    lead : Data
}

interface Data {
    name: string;
    email: string;
    contact: string;
    message: string;
    source: string;
    status: string;
    priority: string;
    remarks: string;
    vendorId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

const CRMEditLead = ({lead}: CRMDataPullProps) => {
    const [name, setName] = useState(lead.name)
    const [email, setEmail] = useState(lead.email)
    const [contact, setContact] = useState(lead.contact)
    const [message, setMessage] = useState(lead.message)
    const [source, setSource] = useState(lead.source)
    const [status, setStatus] = useState(lead.status)
    const [priority, setPriority] = useState(lead.priority)
    const [remarks, setRemarks] = useState(lead.remarks)
    
    const handleNameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setEmail(event.target.value)
    }
    const handleContactChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setContact(event.target.value)
    }
    const handleMSGChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setMessage(event.target.value)
    }
    const handleSourceChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSource(event.target.value)
    }
    const handleRemarksChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setRemarks(event.target.value)
    }

    const updateLead = trpc.updateLead.useMutation()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell><Input value={name} onChange={handleNameChange} className="w-[150px]" type="name" placeholder="Name" /></TableCell>
                <TableCell><Input value={email} onChange={handleEmailChange} className="w-[150px]" type="email" placeholder="Email" /></TableCell>
                <TableCell><Input value={contact} onChange={handleContactChange} className="w-[150px]" type="contact" placeholder="Contact" /></TableCell>
                <TableCell><Textarea value={message} onChange={handleMSGChange} className="w-[150px]" placeholder="Type your message here." /></TableCell>
                <TableCell><Input value={source} onChange={handleSourceChange} className="w-[150px]" type="source" placeholder="Source" /></TableCell>
                <TableCell>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                        <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                        {statuses.map(({label, value, icon2}) => (
                            <SelectItem value={value} key={value}>
                            <div className="flex items-center gap-3">
                                <p>{icon2}</p>
                                <p>{label}</p>
                            </div>
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </TableCell>
                <TableCell>
                    <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                            <SelectValue placeholder="Priorities" />
                        </SelectTrigger>
                        <SelectContent>
                            {priorities.map(({label, value, icon2}) => (
                            <SelectItem value={value} key={value}>
                                <div className="flex items-center gap-3">
                                    <p>{icon2}</p>
                                    <p>{label}</p>
                                </div>
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
                <TableCell><Textarea value={remarks} onChange={handleRemarksChange} className="w-[150px]" placeholder="Type your remarks here." /></TableCell>
                <TableCell>
                    <SheetClose>
                        <Button variant="ghost" onClick={() => {
                            updateLead.mutate({
                                id: lead.id,
                                name: name,
                                contact: contact,
                                email: email,
                                message: message,
                                source: source,
                                status: status,
                                priority: priority,
                                remarks: remarks
                            })
                        }}>
                            <PencilRuler className="text-slate-400"/>
                        </Button>
                    </SheetClose>
                </TableCell>
            </TableBody>
        </Table>
    )
}

export default CRMEditLead