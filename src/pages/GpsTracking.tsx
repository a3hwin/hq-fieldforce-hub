import { useState } from "react";
import { MapPin, Navigation, Clock, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function GpsTracking() {
  const [isGeofenceModalOpen, setIsGeofenceModalOpen] = useState(false);

  const trackingData = [
    {
      id: 1,
      employee: "John Doe",
      lastPing: "2 min ago",
      location: "Downtown Office",
      coordinates: "40.7128, -74.0060",
      status: "Active",
      distance: "12.5 km",
      idleTime: "5 min"
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      lastPing: "1 min ago",
      location: "Client Site - ABC Corp",
      coordinates: "40.7589, -73.9851",
      status: "Moving",
      distance: "8.2 km",
      idleTime: "0 min"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      lastPing: "15 min ago",
      location: "Warehouse District",
      coordinates: "40.6892, -74.0445",
      status: "Idle",
      distance: "15.8 km",
      idleTime: "15 min"
    },
    {
      id: 4,
      employee: "Emma Davis",
      lastPing: "5 min ago",
      location: "Marketing Hub",
      coordinates: "40.7831, -73.9712",
      status: "Active",
      distance: "6.7 km",
      idleTime: "2 min"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Moving":
        return "outline";
      case "Idle":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-success";
      case "Moving":
        return "text-info";
      case "Idle":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GPS Tracking</h1>
          <p className="text-muted-foreground">Real-time location tracking and movement analysis.</p>
        </div>
        
        <Dialog open={isGeofenceModalOpen} onOpenChange={setIsGeofenceModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary hover:bg-primary-hover">
              <Circle className="w-4 h-4" />
              Set Geofence
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-popover">
            <DialogHeader>
              <DialogTitle>Create Geofence</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="fence-name">Geofence Name</Label>
                <Input id="fence-name" placeholder="e.g., Main Office Area" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="center-lat">Center Latitude</Label>
                <Input id="center-lat" placeholder="40.7128" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="center-lng">Center Longitude</Label>
                <Input id="center-lng" placeholder="-74.0060" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="radius">Radius (meters)</Label>
                <Input id="radius" type="number" placeholder="500" />
              </div>
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="enter">Alert on Enter</SelectItem>
                    <SelectItem value="exit">Alert on Exit</SelectItem>
                    <SelectItem value="both">Alert on Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => setIsGeofenceModalOpen(false)}
                  className="flex-1 bg-primary hover:bg-primary-hover"
                >
                  Create Geofence
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsGeofenceModalOpen(false)}
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
            <div className="flex gap-2 items-center">
              <Label htmlFor="track-date">Date:</Label>
              <Input id="track-date" type="date" className="w-40" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              View All Routes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Live Location Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map View</h3>
              <p className="text-muted-foreground mb-4">Google Maps integration would be displayed here</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Active Employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-info"></div>
                  <span>Moving</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Idle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Geofence Areas</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold text-success">23</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Circle className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Distance</p>
                <p className="text-2xl font-bold text-info">342.8 km</p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Navigation className="w-5 h-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Idle Time</p>
                <p className="text-2xl font-bold text-warning">12 min</p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Geofence Alerts</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Circle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Tracking Table */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle>Employee Location Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingData.map((employee) => (
              <div key={employee.id} className="p-4 border rounded-lg bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(employee.status).replace('text-', 'bg-')}`}></div>
                      <div>
                        <h4 className="font-semibold text-foreground">{employee.employee}</h4>
                        <p className="text-sm text-muted-foreground">{employee.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Ping</p>
                      <p className="text-sm font-medium">{employee.lastPing}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant={getStatusVariant(employee.status)} className="text-xs">
                        {employee.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Distance Today</p>
                      <p className="text-sm font-medium text-info">{employee.distance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Idle Time</p>
                      <p className="text-sm font-medium text-warning">{employee.idleTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Movement Trail (Today)</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-info w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Coordinates: {employee.coordinates}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}