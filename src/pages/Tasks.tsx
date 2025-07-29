import { useState } from "react";
import { Plus, FileText, Calendar, MapPin, Users, Upload } from "lucide-react";
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

export default function Tasks() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const tasksData = [
    {
      id: 1,
      title: "Client Presentation - ABC Corp",
      assignedTo: "John Doe",
      taskType: "Demo",
      clientLocation: "123 Business St, Downtown",
      status: "In Progress",
      deadline: "2024-01-30",
      priority: "High"
    },
    {
      id: 2,
      title: "Follow-up Call - XYZ Industries",
      assignedTo: "Sarah Wilson",
      taskType: "Follow-up",
      clientLocation: "Remote Call",
      status: "Assigned",
      deadline: "2024-01-29",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Site Visit - Construction Co",
      assignedTo: "Mike Johnson",
      taskType: "Visit",
      clientLocation: "456 Industrial Ave",
      status: "Done",
      deadline: "2024-01-28",
      priority: "High"
    },
    {
      id: 4,
      title: "Product Demo - Tech Startup",
      assignedTo: "Emma Davis",
      taskType: "Demo",
      clientLocation: "789 Innovation Blvd",
      status: "Assigned",
      deadline: "2024-02-01",
      priority: "Low"
    },
    {
      id: 5,
      title: "Maintenance Check - Factory",
      assignedTo: "Robert Brown",
      taskType: "Visit",
      clientLocation: "321 Manufacturing Rd",
      status: "In Progress",
      deadline: "2024-01-31",
      priority: "High"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Done":
        return "default";
      case "In Progress":
        return "secondary";
      case "Assigned":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Management</h1>
          <p className="text-muted-foreground">Assign and track tasks across your field team.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Bulk Import (CSV)
          </Button>
          
          <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-popover">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input id="task-title" placeholder="Enter task title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea id="task-description" placeholder="Describe the task..." className="min-h-20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-deadline">Deadline</Label>
                  <Input id="task-deadline" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-type">Task Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="visit">Visit</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
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
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-location">Client Location</Label>
                  <Input id="client-location" placeholder="Enter address or location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-proof">Upload Proof (Optional)</Label>
                  <Input id="task-proof" type="file" multiple className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground">Upload photos, notes, or signature placeholders</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => setIsNewTaskModalOpen(false)}
                    className="flex-1 bg-primary hover:bg-primary-hover"
                  >
                    Create Task
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsNewTaskModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex gap-2 items-center">
              <Label htmlFor="filter-date">Date:</Label>
              <Input id="filter-date" type="date" className="w-40" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="emma">Emma Davis</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Task Type" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="visit">Visit</SelectItem>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-info">12</p>
              </div>
              <Calendar className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-success">8</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <Calendar className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Table */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasksData.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                  </TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.taskType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-32">{task.clientLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(task.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Reassign
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