import { useState } from "react";
import { Calendar, Clock, Users, Settings, Search } from "lucide-react"; // Added Search icon
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Attendance() {
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState(""); // State for employee search input

  const attendanceData = [
    {
      id: 1,
      date: "2024-01-29",
      employee: "John Doe",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      department: "Sales"
    },
    {
      id: 2,
      date: "2024-01-29",
      employee: "Sarah Wilson",
      checkIn: "09:15 AM",
      checkOut: "06:15 PM",
      status: "Late",
      department: "Marketing"
    },
    {
      id: 3,
      date: "2024-01-29",
      employee: "Mike Johnson",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      department: "Operations"
    },
    {
      id: 4,
      date: "2024-01-29",
      employee: "Emma Davis",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      status: "Present",
      department: "HR"
    },
    {
      id: 5,
      date: "2024-01-29",
      employee: "Robert Brown",
      checkIn: "-",
      checkOut: "-",
      status: "On Leave",
      department: "Finance"
    }
  ];

  // Filter attendance data based on employee search input
  const filteredAttendanceData = attendanceData.filter(record =>
    record.employee.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const leaveRequests = [
    {
      id: 1,
      employee: "Mike Johnson",
      type: "Sick Leave",
      dates: "Jan 29 - Jan 31",
      reason: "Flu symptoms",
      status: "Pending"
    },
    {
      id: 2,
      employee: "Lisa Chen",
      type: "Annual Leave",
      dates: "Feb 5 - Feb 9",
      reason: "Family vacation",
      status: "Pending"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Present":
        return "default";
      case "Late":
        return "secondary";
      case "Absent":
        return "destructive";
      case "On Leave":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "text-success";
      case "Late":
        return "text-warning";
      case "Absent":
        return "text-destructive";
      case "On Leave":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track employee attendance and manage leave requests.</p>
        </div>

        <Dialog open={isHolidayModalOpen} onOpenChange={setIsHolidayModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover">
              <Settings className="w-4 h-4" />
              Define Holidays / Work Shifts
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover">
            <DialogHeader>
              <DialogTitle>Holiday & Shift Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="holiday-date">Holiday Date</Label>
                <Input id="holiday-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="holiday-name">Holiday Name</Label>
                <Input id="holiday-name" placeholder="e.g., New Year's Day" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift-start">Shift Start Time</Label>
                <Input id="shift-start" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift-end">Shift End Time</Label>
                <Input id="shift-end" type="time" defaultValue="18:00" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="flex-1 bg-primary hover:bg-primary-hover"
                >
                  Save Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsHolidayModalOpen(false)}
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
          <CardTitle className="text-lg">Filter & Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap items-center">
            {/* Replaced Select with Input for search */}
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Employee"
                className="w-48 pl-8"
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
              />
            </div>

            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 items-center">
              <Label htmlFor="date-from">From:</Label>
              <Input id="date-from" type="date" className="w-40" />
            </div>
            <div className="flex gap-2 items-center">
              <Label htmlFor="date-to">To:</Label>
              <Input id="date-to" type="date" className="w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggles */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Daily View */}
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Daily Attendance - {new Date().toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Used filteredAttendanceData */}1
                  {filteredAttendanceData.map((record) => (
                    <TableRow key={record.id} className={record.status === "Late" || record.status === "Absent" ? "bg-destructive/5" : ""}>
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell className={getStatusColor(record.status)}>{record.checkIn}</TableCell>
                      <TableCell className={getStatusColor(record.status)}>{record.checkOut}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {record.checkIn !== "-" && record.checkOut !== "-" ? "9h" : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Weekly attendance view will be displayed here</p>
                <p className="text-sm">Shows aggregated data for the selected week</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Monthly attendance summary will be displayed here</p>
                <p className="text-sm">Shows detailed monthly statistics and trends</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Leave Requests */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employee}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.dates}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
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