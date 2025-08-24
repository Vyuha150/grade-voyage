import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Trophy,
  Target,
  BookOpen,
  Download,
  Medal,
  BarChart3
} from 'lucide-react';

const StudentMarksPage = () => {
  const overallStats = {
    cgpa: 8.7,
    percentage: 87.2,
    rank: 12,
    totalStudents: 120
  };

  const subjects = [
    {
      name: 'Mathematics',
      code: 'MATH101',
      marks: 92,
      total: 100,
      grade: 'A+',
      credits: 4,
      teacher: 'Mrs. Johnson',
      color: 'bg-blue-500'
    },
    {
      name: 'English Literature',
      code: 'ENG101',
      marks: 85,
      total: 100,
      grade: 'A',
      credits: 3,
      teacher: 'Mr. Thompson',
      color: 'bg-green-500'
    },
    {
      name: 'Physics',
      code: 'PHY101',
      marks: 88,
      total: 100,
      grade: 'A',
      credits: 4,
      teacher: 'Dr. Wilson',
      color: 'bg-purple-500'
    },
    {
      name: 'Chemistry',
      code: 'CHEM101',
      marks: 79,
      total: 100,
      grade: 'B+',
      credits: 4,
      teacher: 'Mrs. Davis',
      color: 'bg-orange-500'
    },
    {
      name: 'History',
      code: 'HIST101',
      marks: 91,
      total: 100,
      grade: 'A+',
      credits: 3,
      teacher: 'Mr. Anderson',
      color: 'bg-red-500'
    },
    {
      name: 'Computer Science',
      code: 'CS101',
      marks: 95,
      total: 100,
      grade: 'A+',
      credits: 4,
      teacher: 'Ms. Garcia',
      color: 'bg-indigo-500'
    }
  ];

  const recentTests = [
    {
      subject: 'Mathematics',
      test: 'Unit Test 3',
      date: '2024-01-10',
      marks: 45,
      total: 50,
      percentage: 90
    },
    {
      subject: 'Physics',
      test: 'Lab Test 2',
      date: '2024-01-08',
      marks: 38,
      total: 40,
      percentage: 95
    },
    {
      subject: 'English',
      test: 'Essay Writing',
      date: '2024-01-05',
      marks: 42,
      total: 50,
      percentage: 84
    },
    {
      subject: 'Chemistry',
      test: 'Practical Exam',
      date: '2024-01-03',
      marks: 35,
      total: 40,
      percentage: 87.5
    }
  ];

  const getGradeBadge = (grade: string) => {
    const gradeColors = {
      'A+': 'bg-green-500 hover:bg-green-600',
      'A': 'bg-blue-500 hover:bg-blue-600',
      'B+': 'bg-yellow-500 hover:bg-yellow-600',
      'B': 'bg-orange-500 hover:bg-orange-600',
      'C': 'bg-red-500 hover:bg-red-600'
    };
    
    return (
      <Badge className={gradeColors[grade as keyof typeof gradeColors] || 'bg-gray-500'}>
        {grade}
      </Badge>
    );
  };

  return (
    <div className="space-y-6" data-testid="page-ready">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Marks & Results</h1>
          <p className="text-muted-foreground mt-1">
            Track your academic performance and grades
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Report Card
        </Button>
      </div>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{overallStats.cgpa}</div>
            <p className="text-xs text-muted-foreground">Out of 10.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Percentage</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{overallStats.percentage}%</div>
            <Progress value={overallStats.percentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Medal className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{overallStats.rank}</div>
            <p className="text-xs text-muted-foreground">Out of {overallStats.totalStudents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Total subjects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subjects">Subject-wise Marks</TabsTrigger>
          <TabsTrigger value="recent">Recent Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          {/* Subject Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>{subject.code} • {subject.teacher}</CardDescription>
                    </div>
                    {getGradeBadge(subject.grade)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {subject.marks}/{subject.total}
                      </span>
                      <span className="text-lg font-medium text-muted-foreground">
                        {((subject.marks / subject.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(subject.marks / subject.total) * 100} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Credits: {subject.credits}</span>
                      <span>Grade: {subject.grade}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {/* Recent Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Test Results
              </CardTitle>
              <CardDescription>
                Your performance in the latest tests and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-medium">{test.test}</h4>
                      <p className="text-sm text-muted-foreground">{test.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(test.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold">
                        {test.marks}/{test.total}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {test.percentage}%
                      </div>
                      <div>
                        {test.percentage >= 90 && getGradeBadge('A+')}
                        {test.percentage >= 80 && test.percentage < 90 && getGradeBadge('A')}
                        {test.percentage >= 70 && test.percentage < 80 && getGradeBadge('B+')}
                        {test.percentage >= 60 && test.percentage < 70 && getGradeBadge('B')}
                        {test.percentage < 60 && getGradeBadge('C')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentMarksPage;