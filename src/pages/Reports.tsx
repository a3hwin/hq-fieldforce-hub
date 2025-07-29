import { Download, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Reports() {
  const performanceData = [
    { name: "John Doe", completedTasks: 23, attendanceRate: "95%", rating: 4.8 },
    { name: "Sarah Wilson", completedTasks: 19, attendanceRate: "92%", rating: 4.6 },
    { name: "Mike Johnson", completedTasks: 21, attendanceRate: "88%", rating: 4.5 },
    { name: "Emma Davis", completedTasks: 18, attendanceRate: "97%", rating: 4.7 },
    { name: "Robert Brown", completedTasks: 16, attendanceRate: "85%", rating: 4.3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into performance and productivity.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex gap-2 items-center">
              <Label htmlFor="date-from">From:</Label>
              <Input id="date-from" type="date" className="w-40" />
            </div>
            <div className="flex gap-2 items-center">
              <Label htmlFor="date-to">To:</Label>
              <Input id="date-to" type="date" className="w-40" />
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
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary-hover">Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold text-success">92.5%</p>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Task Completion</p>
                <p className="text-2xl font-bold text-info">87.2%</p>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Performance</p>
                <p className="text-2xl font-bold text-primary">4.6/5</p>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productivity Ratio</p>
                <p className="text-2xl font-bold text-warning">78.4%</p>
                <p className="text-xs text-muted-foreground">-1.2% from last month</p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Top Performers (This Month)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-warning text-warning-foreground' :
                    index === 1 ? 'bg-muted text-muted-foreground' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-muted/50 text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{employee.name}</h4>
                    <p className="text-sm text-muted-foreground">Rating: {employee.rating}/5</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{employee.completedTasks} tasks</p>
                  <p className="text-sm text-success">{employee.attendanceRate} attendance</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Line Chart</h3>
                <p className="text-sm text-muted-foreground">Monthly attendance trends would be displayed here</p>
                <p className="text-xs text-muted-foreground mt-2">Interactive chart with data points and trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle>Task Performance by Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Bar Chart</h3>
                <p className="text-sm text-muted-foreground">Task completion rates per employee</p>
                <p className="text-xs text-muted-foreground mt-2">Comparative performance visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle>Task Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Pie Chart</h3>
                <p className="text-sm text-muted-foreground">Distribution of different task types</p>
                <p className="text-xs text-muted-foreground mt-2">Visit, Demo, Follow-up, Maintenance breakdown</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md">
          <CardHeader>
            <CardTitle>Travel vs Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Scatter Plot</h3>
                <p className="text-sm text-muted-foreground">Correlation between travel distance and productivity</p>
                <p className="text-xs text-muted-foreground mt-2">Efficiency analysis and optimization insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}