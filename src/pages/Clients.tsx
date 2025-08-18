import { useState } from "react";
import { Plus, Building2, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Clients() {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const clientsData = [
    {
      id: 1,
      name: "ABC Corporation",
      contactPerson: "David Smith",
      email: "david.smith@abc-corp.com",
      phone: "+1 555 123 4567",
      assignedTo: "John Doe",
      status: "Active",
      lastInteraction: "2024-01-28",
      notes: "Interested in our premium package. Follow-up scheduled for next week."
    },
    {
      id: 2,
      name: "XYZ Industries",
      contactPerson: "Lisa Johnson",
      email: "lisa.j@xyz-ind.com",
      phone: "+1 555 234 5678",
      assignedTo: "Sarah Wilson",
      status: "New",
      lastInteraction: "2024-01-29",
      notes: "Initial contact made. Needs product demonstration."
    },
    {
      id: 3,
      name: "Tech Startup Inc",
      contactPerson: "Mark Williams",
      email: "mark@techstartup.com",
      phone: "+1 555 345 6789",
      assignedTo: "Mike Johnson",
      status: "In Progress",
      lastInteraction: "2024-01-27",
      notes: "Demo completed. Waiting for decision from board."
    },
    {
      id: 4,
      name: "Construction Co",
      contactPerson: "Anna Davis",
      email: "anna@construction.com",
      phone: "+1 555 456 7890",
      assignedTo: "Emma Davis",
      status: "Closed",
      lastInteraction: "2024-01-25",
      notes: "Deal closed successfully. Contract signed for 2-year partnership."
    },
    {
      id: 5,
      name: "Retail Chain Ltd",
      contactPerson: "Tom Brown",
      email: "tom.brown@retailchain.com",
      phone: "+1 555 567 8901",
      assignedTo: "Robert Brown",
      status: "Active",
      lastInteraction: "2024-01-26",
      notes: "Ongoing project. Regular monthly check-ins scheduled."
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "New":
        return "secondary";
      case "In Progress":
        return "outline";
      case "Closed":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-success";
      case "New":
        return "text-info";
      case "In Progress":
        return "text-warning";
      case "Closed":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships and track sales opportunities.</p>
        </div>
        
        <Dialog open={isAddClientModalOpen} onOpenChange={setIsAddClientModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Company/Client Name</Label>
                <Input id="client-name" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input id="contact-person" placeholder="Enter contact person name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input id="client-email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone</Label>
                <Input id="client-phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assign-to">Assign To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="sarah">Sarah Wilson</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                    <SelectItem value="robert">Robert Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-notes">Notes</Label>
                <Textarea id="client-notes" placeholder="Add any relevant notes..." className="min-h-20" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="flex-1 bg-primary hover:bg-primary-hover"
                >
                  Add Client
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Filter Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap items-center">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Client Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Assigned Employee" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="emma">Emma Davis</SelectItem>
                <SelectItem value="robert">Robert Brown</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search clients..." className="max-w-64" />
          </div>
        </CardContent>
      </Card>

      {/* Client Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold text-success">89</p>
              </div>
              <User className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold text-info">23</p>
              </div>
              <Phone className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold text-warning">67%</p>
              </div>
              <Mail className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Interaction</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.contactPerson}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{client.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(client.status)} className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(client.lastInteraction).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      <p className="text-sm text-muted-foreground truncate" title={client.notes}>
                        {client.notes}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}