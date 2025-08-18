import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react"; // Import Edit icon
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Leads() {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [view, setView] = useState('pipeline'); // 'pipeline' or 'table'
  const [leadsData, setLeadsData] = useState([
    {
      id: "1",
      name: "Potential Client A",
      status: "New Leads",
      source: "Website Contact Form",
      value: "$1,500",
      notes: "Expressed interest in a demo."
    },
    {
      id: "2",
      name: "Business X",
      status: "Contacted",
      source: "Networking Event",
      value: "$5,000",
      notes: "Had a good initial call. Sent follow-up email."
    },
    {
      id: "3",
      name: "Startup Y",
      status: "Qualified",
      source: "Referral",
      value: "$10,000",
      notes: "Requirements match our services. Scheduled a meeting."
    },
    {
      id: "4",
      name: "Company Z",
      status: "Converted",
      source: "Online Ad",
      value: "$20,000",
      notes: "Signed the contract. Onboarding in progress."
    },
     {
      id: "5",
      name: "Potential Client B",
      status: "New Leads",
      source: "Cold Call",
      value: "$800",
      notes: "Left a voicemail. Will try again next week."
    },
    {
      id: "6",
      name: "Service Pro",
      status: "Contacted",
      source: "Website Chat",
      value: "$3,000",
      notes: "Responded to chat, interested in pricing."
    },
     {
      id: "7",
      name: "Global Corp",
      status: "Qualified",
      source: "Webinar Attendee",
      value: "$15,000",
      notes: "Attended advanced feature webinar, asked detailed questions."
    },
     {
      id: "8",
      name: "Local Business",
      status: "Meeting Scheduled",
      source: "Partner Network",
      value: "$2,500",
      notes: "Meeting scheduled for tomorrow to discuss proposal."
    },
      {
      id: "9",
      name: "Innovative Solutions",
      status: "Quote Sent",
      source: "Outbound Prospecting",
      value: "$7,000",
      notes: "Sent quote and followed up. Awaiting response."
    },
      {
      id: "10",
      name: "Industry Leaders",
      status: "Closing",
      source: "Conference Lead",
      value: "$25,000",
      notes: "In final negotiation stages."
    }
  ]);
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editedLeadName, setEditedLeadName] = useState("");

  const pipelineStages = [
    { id: "New Leads", name: "New Leads" },
    { id: "Contacted", name: "Contacted" },
    { id: "Qualified", name: "Qualified" },
    { id: "Meeting Scheduled", name: "Meeting Scheduled"},
    { id: "Quote Sent", name: "Quote Sent"},
    { id: "Closing", name: "Closing"},
    { id: "Converted", name: "Converted" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "New Leads":
        return "default";
      case "Contacted":
        return "secondary";
      case "Qualified":
        return "outline";
      case "Meeting Scheduled":
         return "outline";
      case "Quote Sent":
         return "outline";
      case "Closing":
         return "outline";
      case "Converted":
        return "default";
      default:return "outline";
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedLeadId = result.draggableId;
    const targetStatus = destination.droppableId;

    setLeadsData(prevLeadsData =>
      prevLeadsData.map(lead =>
        lead.id === draggedLeadId ? { ...lead, status: targetStatus } : lead
      )
    );
  };

  const handleEditClick = (lead: any) => {
    setEditingLeadId(lead.id);
    setEditedLeadName(lead.name);
  };

  const handleSaveLeadName = (id: string) => {
    setLeadsData(prevLeadsData =>
      prevLeadsData.map(lead =>
        lead.id === id ? { ...lead, name: editedLeadName } : lead
      )
    );
    setEditingLeadId(null);
    setEditedLeadName("");
  };

  const handleCancelEdit = () => {
    setEditingLeadId(null);
    setEditedLeadName("");
  };

  const handleAddToPipeline = (leadId: string) => {
    setLeadsData(prevLeadsData =>
      prevLeadsData.map(lead =>
        lead.id === leadId ? { ...lead, status: 'New Leads' } : lead
      )
    );
  };

  return (
    <div className="space-y-6 overflow-x-hidden"> {/* Added overflow-x-hidden here */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Manage your sales pipeline and track potential clients.</p>
        </div>

        <div className="flex items-center gap-4">
           {/* View Toggle */}
          <Button
            variant="outline"
            onClick={() => setView(view === 'pipeline' ? 'table' : 'pipeline')}
          >
            Switch to {view === 'pipeline' ? 'Table View' : 'Pipeline View'}
          </Button>

           {/* Add Lead Button and Dialog */}
          <Dialog open={isAddLeadModalOpen} onOpenChange={setIsAddLeadModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-popover">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-name">Lead Name</Label>
                  <Input id="lead-name" placeholder="Enter lead name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-source">Source</Label>
                  <Input id="lead-source" placeholder="e.g., Website, Referral, etc." />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="lead-value">Value</Label>
                  <Input id="lead-value" placeholder="Enter estimated value (e.g., $5000)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-notes">Notes</Label>
                  <Textarea id="lead-notes" placeholder="Add any relevant notes..." className="min-h-20" />
                </div>
              </div>
               <DialogFooter>
                  <Button
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="flex-1 bg-primary hover:bg-primary-hover"
                  >
                    Add Lead
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === 'pipeline' ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Card className="bg-card shadow-md w-full overflow-hidden">
            <CardContent className="p-4">
              {/* Use flex-wrap so columns wrap to next line */}
              <div className="flex flex-wrap gap-6">
                {pipelineStages.map(stage => (
                  <Droppable key={stage.id} droppableId={stage.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="w-72 space-y-4"
                      >
                        <h3 className="text-lg font-semibold text-foreground">
                          {stage.name} ({leadsData.filter(l => l.status === stage.id).length})
                        </h3>
                        {leadsData
                          .filter(l => l.status === stage.id)
                          .map((lead, idx) => (
                            <Draggable key={lead.id} draggableId={lead.id} index={idx}>
                              {(prov) => (
                                <div
                                  ref={prov.innerRef}
                                  {...prov.draggableProps}
                                  {...prov.dragHandleProps}
                                  className="p-3 border rounded-md bg-muted/20 cursor-grab"
                                >
                                  <div className="flex justify-between items-center">
                                    {editingLeadId === lead.id ? (
                                      <Input
                                        value={editedLeadName}
                                        onChange={e => setEditedLeadName(e.target.value)}
                                        onBlur={() => handleSaveLeadName(lead.id)}
                                        onKeyPress={e => e.key === 'Enter' && handleSaveLeadName(lead.id)}
                                        autoFocus
                                      />
                                    ) : (
                                      <h4 className="font-medium text-foreground">{lead.name}</h4>
                                    )}
                                    <Edit
                                      size={16}
                                      className="text-muted-foreground cursor-pointer"
                                      onClick={() => handleEditClick(lead)}
                                    />
                                  </div>
                                  <p className="text-sm text-muted-foreground">Source: {lead.source}</p>
                                  <p className="text-sm text-muted-foreground">Value: {lead.value}</p>
                                  <Badge variant={getStatusVariant(lead.status)} className="mt-2">
                                    {lead.status}
                                  </Badge>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </CardContent>
          </Card>
        </DragDropContext>
      ) : (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsData.map(lead => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleAddToPipeline(lead.id)}>
                      Add to Pipeline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}