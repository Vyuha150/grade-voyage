import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  Users
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Mathematics Class",
    time: "09:00 - 10:00",
    type: "class",
    location: "Room 201",
    students: "Grade 10A",
    color: "bg-accent-math"
  },
  {
    id: 2,
    title: "Science Lab",
    time: "10:30 - 11:30",
    type: "lab",
    location: "Lab 1",
    students: "Grade 9B",
    color: "bg-accent-science"
  },
  {
    id: 3,
    title: "Parent Meeting",
    time: "14:00 - 15:00",
    type: "meeting",
    location: "Conference Room",
    students: "Individual",
    color: "bg-primary"
  },
  {
    id: 4,
    title: "Art Exhibition",
    time: "16:00 - 18:00",
    type: "event",
    location: "Art Gallery",
    students: "All Grades",
    color: "bg-accent-arts"
  }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Generate calendar days
const getDaysInMonth = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
  
  const days = [];
  
  // Previous month's trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate.getDate(),
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false
    });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate.getDate() && 
                   month === currentDate.getMonth() && 
                   year === currentDate.getFullYear();
    days.push({
      date: day,
      isCurrentMonth: true,
      isToday,
      hasEvents: day === currentDate.getDate() || day === currentDate.getDate() + 1 || day === currentDate.getDate() + 3
    });
  }
  
  // Next month's leading days
  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let day = 1; day <= remainingCells; day++) {
    days.push({
      date: day,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false
    });
  }
  
  return days;
};

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const calendarDays = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <Badge variant="outline" className="status-active">
            {events.length} events today
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold min-w-[140px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button className="ml-4 bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Monthly View
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
                    className={`
                      relative p-3 text-sm rounded-lg transition-all duration-200 hover:bg-surface
                      ${day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                      ${day.isToday ? 'bg-primary text-primary-foreground hover:bg-primary-hover' : ''}
                      ${selectedDate === day.date && day.isCurrentMonth && !day.isToday ? 'bg-surface ring-2 ring-primary/20' : ''}
                    `}
                  >
                    <span className="relative z-10">{day.date}</span>
                    {day.hasEvents && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-math rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <div className="space-y-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-card-border hover:bg-surface transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {event.students}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Book Meeting Room
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View Timetable
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}