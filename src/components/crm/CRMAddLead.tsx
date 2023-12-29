import { trpc } from '@/trpc/client'
import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { priorities, statuses } from '@/app/data/data'
import { Button } from '../ui/button'
import { PlusSquare } from 'lucide-react'

interface CRMAddLeadProps {
    vendorId: string
}

const CRMAddLead = ({vendorId}: CRMAddLeadProps) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [source, setSource] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [priority, setPriority] = React.useState('')
  const [remarks, setRemarks] = React.useState('')

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

  const handleSubmit = () => {
    addLead.mutate({
        vendorId: vendorId,
        name: name,
        email: email,
        contact: contact,
        message: message,
        source: source,
        status: status,
        priority: priority,
        remarks: remarks
        });
    setName('')
    setEmail('')
    setContact('')
    setMessage('')
    setSource('')
    setStatus('')
    setPriority('')
    setRemarks('')
  }

  const addLead = trpc.addLead.useMutation()
  
  return (
    <TableRow>
        {/* Form */}
        <TableCell><div className="w-[150px]">Today</div></TableCell>
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
        <Button variant="ghost" onClick={() => {handleSubmit()}}>
            <PlusSquare className="text-slate-500"/>
        </Button>
        </TableCell>
    </TableRow>
  )
}

export default CRMAddLead