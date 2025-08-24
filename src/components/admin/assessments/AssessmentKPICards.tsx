import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const AssessmentKPICards = () => {
  const kpis = [
    {
      title: 'Total Assessments',
      value: '284',
      change: '+12',
      trend: 'up',
      icon: FileText,
      description: 'This month'
    },
    {
      title: 'Pending Moderation',
      value: '18',
      change: '-5',
      trend: 'down',
      icon: Clock,
      description: 'Awaiting review',
      urgent: true
    },
    {
      title: 'Published This Week',
      value: '42',
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      description: 'Results released'
    },
    {
      title: 'Missing Marks',
      value: '7',
      change: '-3',
      trend: 'down',
      icon: AlertTriangle,
      description: 'Teacher action needed',
      warning: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <Icon className={`w-4 h-4 ${
                kpi.urgent ? 'text-amber-500' : 
                kpi.warning ? 'text-red-500' : 
                'text-muted-foreground'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {kpi.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`w-4 h-4 ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {kpi.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};