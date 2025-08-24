import { RadialBarChart, RadialBar, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { subject: 'Mathematics', coverage: 85, fill: '#3B82F6' },
  { subject: 'English', coverage: 78, fill: '#10B981' },
  { subject: 'Science', coverage: 92, fill: '#F59E0B' },
  { subject: 'History', coverage: 65, fill: '#EF4444' },
  { subject: 'Geography', coverage: 73, fill: '#8B5CF6' },
  { subject: 'Physics', coverage: 88, fill: '#06B6D4' },
];

export const AssessmentCoverageChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="20%" 
          outerRadius="80%" 
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar
            dataKey="coverage"
            cornerRadius={4}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </RadialBar>
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Coverage']}
            labelFormatter={(label) => `Subject: ${label}`}
          />
          <Legend 
            iconSize={10}
            wrapperStyle={{ fontSize: '12px' }}
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>
                {entry.payload.subject}: {entry.payload.coverage}%
              </span>
            )}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};