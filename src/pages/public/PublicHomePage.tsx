import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Calendar } from 'lucide-react';

export const PublicHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Comprehensive educational platform connecting administrators, teachers, students, and parents
            in a unified digital ecosystem.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = '/login'}>
              Access Portal
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>
                Complete oversight and management of school operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• User & Role Management</li>
                <li>• Class & Subject Administration</li>
                <li>• Fee & Invoice Tracking</li>
                <li>• Analytics & Reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Teacher Portal</CardTitle>
              <CardDescription>
                Streamlined classroom and student management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Attendance Tracking</li>
                <li>• Assessment & Grading</li>
                <li>• Homework Management</li>
                <li>• Parent Communication</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>
                Personalized learning experience and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View Grades & Reports</li>
                <li>• Submit Assignments</li>
                <li>• Check Attendance</li>
                <li>• Pay Fees Online</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Access your portal with your credentials or try our demo mode.
          </p>
          <Button size="lg" onClick={() => window.location.href = '/login'}>
            Access Your Portal
          </Button>
        </div>
      </div>
    </div>
  );
};