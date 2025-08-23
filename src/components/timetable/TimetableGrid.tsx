import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  MapPin, 
  Edit3,
  Plus,
  Filter
} from "lucide-react";

const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00", 
  "10:00 - 11:00",
  "11:30 - 12:30", // Break after 11:00
  "12:30 - 13:30",
  "14:30 - 15:30", // Lunch break after 13:30
  "15:30 - 16:30"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetableData = {
  "Monday": {
    "08:00 - 09:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "201", class: "10A", color: "bg-accent-math" },
    "09:00 - 10:00": { subject: "Physics", teacher: "Prof. Johnson", room: "Lab 1", class: "10A", color: "bg-accent-science" },
    "10:00 - 11:00": { subject: "English", teacher: "Ms. Brown", room: "103", class: "10A", color: "bg-accent-arts" },
    "11:30 - 12:30": { subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 2", class: "10A", color: "bg-accent-science" },
    "12:30 - 13:30": { subject: "History", teacher: "Mr. Davis", room: "204", class: "10A", color: "bg-secondary" },
    "14:30 - 15:30": { subject: "Art", teacher: "Ms. Taylor", room: "Art Studio", class: "10A", color: "bg-accent-arts" },
    "15:30 - 16:30": { subject: "Sports", teacher: "Coach Lee", room: "Gymnasium", class: "10A", color: "bg-accent-sports" }
  },
  "Tuesday": {
    "08:00 - 09:00": { subject: "Biology", teacher: "Dr. Garcia", room: "Lab 3", class: "10A", color: "bg-accent-science" },
    "09:00 - 10:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "201", class: "10A", color: "bg-accent-math" },
    "10:00 - 11:00": { subject: "Geography", teacher: "Mr. Anderson", room: "205", class: "10A", color: "bg-secondary" },
    "11:30 - 12:30": { subject: "Computer Science", teacher: "Ms. Chen", room: "Computer Lab", class: "10A", color: "bg-primary" },
    "12:30 - 13:30": { subject: "Music", teacher: "Mr. Mozart", room: "Music Room", class: "10A", color: "bg-accent-arts" },
    "14:30 - 15:30": { subject: "Physics", teacher: "Prof. Johnson", room: "Lab 1", class: "10A", color: "bg-accent-science" },
    "15:30 - 16:30": { subject: "Free Period", teacher: "", room: "", class: "10A", color: "bg-muted" }
  },
  "Wednesday": {
    "08:00 - 09:00": { subject: "English", teacher: "Ms. Brown", room: "103", class: "10A", color: "bg-accent-arts" },
    "09:00 - 10:00": { subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 2", class: "10A", color: "bg-accent-science" },
    "10:00 - 11:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "201", class: "10A", color: "bg-accent-math" },
    "11:30 - 12:30": { subject: "PE", teacher: "Coach Lee", room: "Gymnasium", class: "10A", color: "bg-accent-sports" },
    "12:30 - 13:30": { subject: "French", teacher: "Mme. Dubois", room: "Language Lab", class: "10A", color: "bg-accent-arts" },
    "14:30 - 15:30": { subject: "History", teacher: "Mr. Davis", room: "204", class: "10A", color: "bg-secondary" },
    "15:30 - 16:30": { subject: "Study Hall", teacher: "Various", room: "Library", class: "10A", color: "bg-muted" }
  },
  "Thursday": {
    "08:00 - 09:00": { subject: "Physics", teacher: "Prof. Johnson", room: "Lab 1", class: "10A", color: "bg-accent-science" },
    "09:00 - 10:00": { subject: "Art", teacher: "Ms. Taylor", room: "Art Studio", class: "10A", color: "bg-accent-arts" },
    "10:00 - 11:00": { subject: "Biology", teacher: "Dr. Garcia", room: "Lab 3", class: "10A", color: "bg-accent-science" },
    "11:30 - 12:30": { subject: "Mathematics", teacher: "Dr. Smith", room: "201", class: "10A", color: "bg-accent-math" },
    "12:30 - 13:30": { subject: "Computer Science", teacher: "Ms. Chen", room: "Computer Lab", class: "10A", color: "bg-primary" },
    "14:30 - 15:30": { subject: "English", teacher: "Ms. Brown", room: "103", class: "10A", color: "bg-accent-arts" },
    "15:30 - 16:30": { subject: "Drama", teacher: "Mr. Shakespeare", room: "Theater", class: "10A", color: "bg-accent-arts" }
  },
  "Friday": {
    "08:00 - 09:00": { subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 2", class: "10A", color: "bg-accent-science" },
    "09:00 - 10:00": { subject: "Geography", teacher: "Mr. Anderson", room: "205", class: "10A", color: "bg-secondary" },
    "10:00 - 11:00": { subject: "Music", teacher: "Mr. Mozart", room: "Music Room", class: "10A", color: "bg-accent-arts" },
    "11:30 - 12:30": { subject: "Free Period", teacher: "", room: "", class: "10A", color: "bg-muted" },
    "12:30 - 13:30": { subject: "Sports", teacher: "Coach Lee", room: "Sports Field", class: "10A", color: "bg-accent-sports" },
    "14:30 - 15:30": { subject: "Assembly", teacher: "All Staff", room: "Main Hall", class: "All Classes", color: "bg-primary" },
    "15:30 - 16:30": { subject: "Club Activities", teacher: "Various", room: "Various", class: "Optional", color: "bg-accent-sports" }
  }
};

export function TimetableGrid() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground">Timetable</h1>
          <Badge variant="outline" className="status-active">
            Grade 10A
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Weekly Schedule - Grade 10A
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-6 border-b border-card-border">
                <div className="p-4 font-medium text-muted-foreground bg-surface">
                  Time
                </div>
                {days.map((day) => (
                  <div key={day} className="p-4 font-medium text-center bg-surface border-l border-card-border">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((timeSlot, slotIndex) => (
                <div key={timeSlot} className="grid grid-cols-6">
                  {/* Time Column */}
                  <div className="p-4 font-medium text-sm text-muted-foreground bg-surface/50 border-b border-card-border">
                    {timeSlot}
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day) => {
                    const classData = timetableData[day as keyof typeof timetableData]?.[timeSlot];
                    
                    return (
                      <div 
                        key={`${day}-${timeSlot}`}
                        className="border-l border-b border-card-border min-h-[80px] relative group"
                      >
                        {classData ? (
                          <div className={`h-full p-2 ${classData.color}/10 hover:${classData.color}/20 transition-colors relative`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${classData.color}`} />
                            <div className="pl-2">
                              <h4 className="font-medium text-sm text-foreground mb-1">
                                {classData.subject}
                              </h4>
                              {classData.teacher && (
                                <p className="text-xs text-muted-foreground mb-1">
                                  {classData.teacher}
                                </p>
                              )}
                              {classData.room && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  {classData.room}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="h-full p-2 hover:bg-surface transition-colors flex items-center justify-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg">Subject Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-math rounded" />
              <span className="text-sm">Mathematics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-science rounded" />
              <span className="text-sm">Sciences</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-arts rounded" />
              <span className="text-sm">Arts & Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-sports rounded" />
              <span className="text-sm">Sports & Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary rounded" />
              <span className="text-sm">Social Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              <span className="text-sm">Technology</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}