import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', clicks: 45 },
  { day: 'Tue', clicks: 52 },
  { day: 'Wed', clicks: 38 },
  { day: 'Thu', clicks: 61 },
  { day: 'Fri', clicks: 48 },
  { day: 'Sat', clicks: 23 },
  { day: 'Sun', clicks: 18 },
];

export const ResourceClicksChart = () => {
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
            formatter={(value) => [`${value} clicks`, 'Resource Access']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 4, stroke: '#8B5CF6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-purple-600">285</div>
          <div className="text-xs text-muted-foreground">Total Clicks</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-600">41</div>
          <div className="text-xs text-muted-foreground">Daily Avg</div>
        </div>
      </div>
    </div>
  );
};