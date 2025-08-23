import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

export const HomeworkKPICards = () => {
  const kpis = [
    {
      title: 'Active Assignments',
      value: '24',
      change: '+3',
      trend: 'up' as const,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Pending Submissions',
      value: '127',
      change: '-8',
      trend: 'down' as const,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'Completed Today',
      value: '89',
      change: '+12',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Avg Completion Rate',
      value: '87%',
      change: '+5%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={kpi.title} className={`${kpi.borderColor} border-2 hover:shadow-lg transition-shadow`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendIcon className={`mr-1 h-3 w-3 ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {kpi.change}
                </span>
                <span className="ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};