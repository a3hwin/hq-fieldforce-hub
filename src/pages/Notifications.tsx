import { Bell, Clock, AlertTriangle, MapPin, Calendar, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "late-checkin",
      icon: Clock,
      title: "Late Check-in Alert",
      message: "Sarah Wilson is 30 minutes late for check-in",
      timestamp: "2 minutes ago",
      priority: "high",
      actionRequired: true,
      actionText: "Send Reminder"
    },
    {
      id: 2,
      type: "task-overdue",
      icon: AlertTriangle,
      title: "Overdue Task",
      message: "Client presentation task assigned to Mike Johnson is overdue",
      timestamp: "15 minutes ago",
      priority: "high",
      actionRequired: true,
      actionText: "Reassign Task"
    },
    {
      id: 3,
      type: "leave-request",
      icon: Calendar,
      title: "Leave Request",
      message: "Emma Davis requested sick leave for Jan 30-31",
      timestamp: "1 hour ago",
      priority: "medium",
      actionRequired: true,
      actionText: "Review Request"
    },
    {
      id: 4,
      type: "geofence-breach",
      icon: MapPin,
      title: "Geofence Alert",
      message: "John Doe exited designated work area at Downtown Office",
      timestamp: "2 hours ago",
      priority: "medium",
      actionRequired: false,
      actionText: "View Location"
    },
    {
      id: 5,
      type: "task-completed",
      icon: CheckCircle,
      title: "Task Completed",
      message: "Site visit at Construction Co completed by Robert Brown",
      timestamp: "3 hours ago",
      priority: "low",
      actionRequired: false,
      actionText: "View Report"
    },
    {
      id: 6,
      type: "late-checkin",
      icon: Clock,
      title: "Late Check-in Alert",
      message: "Mike Johnson is 15 minutes late for check-in",
      timestamp: "4 hours ago",
      priority: "medium",
      actionRequired: true,
      actionText: "Contact Employee"
    },
    {
      id: 7,
      type: "geofence-entry",
      icon: MapPin,
      title: "Geofence Entry",
      message: "Emma Davis entered client site geofence area",
      timestamp: "5 hours ago",
      priority: "low",
      actionRequired: false,
      actionText: "View Details"
    },
    {
      id: 8,
      type: "leave-approved",
      icon: Calendar,
      title: "Leave Approved",
      message: "Annual leave request for Lisa Chen has been approved",
      timestamp: "6 hours ago",
      priority: "low",
      actionRequired: false,
      actionText: "View Calendar"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-info bg-info/5";
      default:
        return "border-l-muted bg-muted/5";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (type === "task-completed" || type === "leave-approved") {
      return "text-success";
    }
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-info";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with real-time alerts and system notifications.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Action Required</p>
                <p className="text-2xl font-bold text-warning">8</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Alerts</p>
                <p className="text-2xl font-bold text-info">12</p>
              </div>
              <Calendar className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 rounded-lg ${getPriorityColor(notification.priority)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${getIconColor(notification.type, notification.priority)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{notification.title}</h4>
                          <Badge variant={getPriorityBadge(notification.priority)} className="text-xs">
                            {notification.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                          {notification.actionRequired && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs h-7 px-3"
                            >
                              {notification.actionText}
                            </Button>
                          )}
                          {!notification.actionRequired && notification.actionText && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-xs h-7 px-3 text-info hover:text-info"
                            >
                              {notification.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}