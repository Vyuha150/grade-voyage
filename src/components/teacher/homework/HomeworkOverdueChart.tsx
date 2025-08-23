import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Users } from 'lucide-react';

export const HomeworkOverdueChart = () => {
  const overdueStats = [
    { period: '1-2 days', count: 8, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { period: '3-7 days', count: 5, color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { period: '7+ days', count: 2, color: 'bg-red-100 text-red-800 border-red-300' },
  ];

  const totalOverdue = overdueStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="space-y-6">
      {/* Main Overdue Count */}
      <div className="text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full">
          <AlertTriangle className="h-10 w-10 text-orange-600" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{totalOverdue}</div>
        <div className="text-sm text-muted-foreground">Overdue Assignments</div>
      </div>

      {/* Breakdown by Period */}
      <div className="space-y-3">
        {overdueStats.map((stat) => (
          <div key={stat.period} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{stat.period}</span>
            </div>
            <Badge className={stat.color}>
              {stat.count}
            </Badge>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button variant="outline" size="sm" className="w-full gap-2">
        <Users className="h-4 w-4" />
        Send Reminders
      </Button>
    </div>
  );
};