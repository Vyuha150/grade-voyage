import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { grade: 'Grade 6', mathematics: 78, english: 82, science: 75, history: 80 },
  { grade: 'Grade 7', mathematics: 82, english: 85, science: 80, history: 78 },
  { grade: 'Grade 8', mathematics: 75, english: 78, science: 85, history: 82 },
  { grade: 'Grade 9', mathematics: 88, english: 90, science: 82, history: 85 },
  { grade: 'Grade 10', mathematics: 85, english: 88, science: 90, history: 87 },
  { grade: 'Grade 11', mathematics: 82, english: 85, science: 88, history: 83 },
  { grade: 'Grade 12', mathematics: 90, english: 92, science: 85, history: 88 },
];

export const GradeAverageChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="grade" 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            domain={[60, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="mathematics" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Mathematics"
          />
          <Line 
            type="monotone" 
            dataKey="english" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="English"
          />
          <Line 
            type="monotone" 
            dataKey="science" 
            stroke="#F59E0B" 
            strokeWidth={2}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Science"
          />
          <Line 
            type="monotone" 
            dataKey="history" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="History"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};