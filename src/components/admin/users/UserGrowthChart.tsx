import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: '1', users: 12 },
  { day: '5', users: 8 },
  { day: '10', users: 15 },
  { day: '15', users: 22 },
  { day: '20', users: 18 },
  { day: '25', users: 35 },
  { day: '30', users: 28 },
];

export const UserGrowthChart = () => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <YAxis hide />
          <Tooltip 
            formatter={(value) => [`${value} new users`, 'Registrations']}
            labelFormatter={(label) => `Day ${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 4, stroke: '#3B82F6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-green-600">+138</div>
          <div className="text-xs text-muted-foreground">New Users</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-600">18.5</div>
          <div className="text-xs text-muted-foreground">Daily Avg</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-orange-600">+25%</div>
          <div className="text-xs text-muted-foreground">vs Last Month</div>
        </div>
      </div>
    </div>
  );
};