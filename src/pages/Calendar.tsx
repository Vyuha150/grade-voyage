import { AppSidebar } from "@/components/layout/AppSidebar";
import { CalendarView } from "@/components/calendar/CalendarView";

const Calendar = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 p-6">
        <CalendarView />
      </main>
    </div>
  );
};

export default Calendar;