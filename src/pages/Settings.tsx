import { Shield, Clock, Settings as SettingsIcon, Users, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const rolesData = [
    {
      role: "Full Admin",
      userManagement: true,
      taskManagement: true,
      reportsAccess: true,
      gpsTracking: true,
      systemSettings: true
    },
    {
      role: "HR Manager",
      userManagement: true,
      taskManagement: false,
      reportsAccess: true,
      gpsTracking: false,
      systemSettings: false
    },
    {
      role: "Team Manager",
      userManagement: false,
      taskManagement: true,
      reportsAccess: true,
      gpsTracking: true,
      systemSettings: false
    },
    {
      role: "Field Supervisor",
      userManagement: false,
      taskManagement: true,
      reportsAccess: false,
      gpsTracking: true,
      systemSettings: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure system settings and manage permissions.</p>
        </div>
        
        <Button className="bg-primary hover:bg-primary-hover">
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="checkin">Check-in Policy</TabsTrigger>
          <TabsTrigger value="modules">Module Toggles</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>User Management</TableHead>
                    <TableHead>Task Management</TableHead>
                    <TableHead>Reports Access</TableHead>
                    <TableHead>GPS Tracking</TableHead>
                    <TableHead>System Settings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rolesData.map((role, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{role.role}</TableCell>
                      <TableCell>
                        <Switch checked={role.userManagement} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={role.taskManagement} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={role.reportsAccess} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={role.gpsTracking} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={role.systemSettings} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkin" className="space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Check-in Policy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance-radius">Distance Radius (meters)</Label>
                    <Input 
                      id="distance-radius" 
                      type="number" 
                      defaultValue="100" 
                      placeholder="Enter radius in meters"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum distance from designated location for check-in
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grace-period">Grace Period (minutes)</Label>
                    <Input 
                      id="grace-period" 
                      type="number" 
                      defaultValue="15" 
                      placeholder="Enter grace period"
                    />
                    <p className="text-xs text-muted-foreground">
                      Time allowance before marking as late
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-hours-start">Work Hours Start</Label>
                    <Input 
                      id="work-hours-start" 
                      type="time" 
                      defaultValue="09:00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-hours-end">Work Hours End</Label>
                    <Input 
                      id="work-hours-end" 
                      type="time" 
                      defaultValue="18:00"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Selfie Required</h4>
                      <p className="text-sm text-muted-foreground">Require photo for check-in verification</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Location Verification</h4>
                      <p className="text-sm text-muted-foreground">Verify GPS location during check-in</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Auto Check-out</h4>
                      <p className="text-sm text-muted-foreground">Automatically check out after work hours</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Offline Mode</h4>
                      <p className="text-sm text-muted-foreground">Allow check-in when offline (sync later)</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                Module Toggles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">CRM Module</h4>
                      <p className="text-sm text-muted-foreground">Client relationship management features</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Expense Module</h4>
                      <p className="text-sm text-muted-foreground">Expense tracking and reimbursements</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">GPS Tracking</h4>
                      <p className="text-sm text-muted-foreground">Real-time location tracking</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Payroll Integration</h4>
                      <p className="text-sm text-muted-foreground">Attendance-based payroll calculation</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Time Tracking</h4>
                      <p className="text-sm text-muted-foreground">Detailed time tracking and productivity</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Advanced Security</h4>
                      <p className="text-sm text-muted-foreground">Enhanced security features and logging</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">System Version</p>
                  <p className="font-medium">HQ Admin Panel v2.1.0</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">January 29, 2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground">License Type</p>
                  <p className="font-medium">Enterprise</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}