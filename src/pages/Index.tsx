import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AssignmentCard } from "@/components/assignments/AssignmentCard";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text">
              Welcome to EduPlan
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive school management made simple and efficient
            </p>
          </div>
          
          {/* Dashboard Content */}
          <DashboardStats />
          
          {/* Recent Assignments */}
          <AssignmentCard />
        </div>
      </main>
    </div>
  );
};

export default Index;
