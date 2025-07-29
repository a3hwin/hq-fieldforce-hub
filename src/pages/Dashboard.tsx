import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, FileText, TrendingUp, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      change: "+2.5%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Present Today",
      value: "108",
      change: "87%",
      icon: Calendar,
      color: "text-success"
    },
    {
      title: "Active Tasks",
      value: "47",
      change: "-5 from yesterday",
      icon: FileText,
      color: "text-warning"
    },
    {
      title: "Field Staff",
      value: "23",
      change: "Currently tracking",
      icon: MapPin,
      color: "text-info"
    }
  ];

  const recentActivities = [
    { type: "attendance", message: "John Doe checked in", time: "2 min ago", status: "success" },
    { type: "task", message: "Task 'Client Visit - ABC Corp' completed", time: "15 min ago", status: "success" },
    { type: "alert", message: "Sarah Wilson is late for check-in", time: "30 min ago", status: "warning" },
    { type: "gps", message: "Mike Johnson entered geofence area", time: "1 hour ago", status: "info" },
    { type: "task", message: "New task assigned to Emma Davis", time: "2 hours ago", status: "info" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your company.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' :
                      'bg-info'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Alerts & Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">3 Late Check-ins</h4>
                    <p className="text-sm text-muted-foreground">Employees haven't checked in yet</p>
                  </div>
                  <Badge variant="destructive">Action Required</Badge>
                </div>
              </div>

              <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-warning">5 Pending Approvals</h4>
                    <p className="text-sm text-muted-foreground">Leave requests awaiting approval</p>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning">Pending</Badge>
                </div>
              </div>

              <div className="p-4 border border-info/20 rounded-lg bg-info/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-info">12 Tasks Due Today</h4>
                    <p className="text-sm text-muted-foreground">Tasks scheduled for completion</p>
                  </div>
                  <Badge variant="outline" className="border-info text-info">Monitor</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}