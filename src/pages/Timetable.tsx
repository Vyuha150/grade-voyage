import { AppSidebar } from "@/components/layout/AppSidebar";
import { TimetableGrid } from "@/components/timetable/TimetableGrid";

const Timetable = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 p-6">
        <TimetableGrid />
      </main>
    </div>
  );
};

export default Timetable;