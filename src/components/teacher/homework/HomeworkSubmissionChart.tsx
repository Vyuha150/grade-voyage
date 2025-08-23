import { ResponsiveContainer, FunnelChart, Funnel, Cell, Tooltip, LabelList } from 'recharts';

const data = [
  { name: 'Assigned', value: 150, fill: '#3B82F6' },
  { name: 'Started', value: 135, fill: '#6366F1' },
  { name: 'In Progress', value: 120, fill: '#8B5CF6' },
  { name: 'Submitted On Time', value: 98, fill: '#10B981' },
  { name: 'Late Submissions', value: 15, fill: '#F59E0B' },
];

export const HomeworkSubmissionChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip 
            formatter={(value, name) => [`${value} students`, name]}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
          >
            <LabelList position="center" fill="#fff" stroke="none" fontSize={12} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-green-600">65%</div>
          <div className="text-xs text-muted-foreground">On Time</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-orange-600">10%</div>
          <div className="text-xs text-muted-foreground">Late</div>
        </div>
      </div>
    </div>
  );
};