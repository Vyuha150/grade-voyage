import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Clock
} from 'lucide-react';

const StudentFeesPage = () => {
  const feesSummary = {
    totalAnnualFee: 12000,
    paidAmount: 8000,
    pendingAmount: 4000,
    nextDueDate: '2024-02-15',
    nextDueAmount: 2000
  };

  const pendingFees = [
    {
      id: 1,
      title: 'Quarterly Fees - Q3',
      amount: 2000,
      dueDate: '2024-02-15',
      description: 'Tuition fees for January-March 2024',
      status: 'due',
      lateFee: 0
    },
    {
      id: 2,
      title: 'Lab Equipment Fee',
      amount: 150,
      dueDate: '2024-02-20',
      description: 'Science lab equipment and materials',
      status: 'upcoming',
      lateFee: 0
    },
    {
      id: 3,
      title: 'Library Fee',
      amount: 50,
      dueDate: '2024-03-01',
      description: 'Annual library membership and book maintenance',
      status: 'upcoming',
      lateFee: 0
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      title: 'Quarterly Fees - Q2',
      amount: 2000,
      paidDate: '2023-11-15',
      method: 'Online Payment',
      transactionId: 'TXN123456789',
      status: 'paid'
    },
    {
      id: 2,
      title: 'Annual Sports Fee',
      amount: 200,
      paidDate: '2023-10-20',
      method: 'Bank Transfer',
      transactionId: 'TXN987654321',
      status: 'paid'
    },
    {
      id: 3,
      title: 'Quarterly Fees - Q1',
      amount: 2000,
      paidDate: '2023-08-10',
      method: 'Online Payment',
      transactionId: 'TXN456789123',
      status: 'paid'
    }
  ];

  const receipts = [
    {
      id: 1,
      receiptNumber: 'RCP-2024-001',
      date: '2023-11-15',
      amount: 2000,
      description: 'Quarterly Fees - Q2'
    },
    {
      id: 2,
      receiptNumber: 'RCP-2023-156',
      date: '2023-10-20',
      amount: 200,
      description: 'Annual Sports Fee'
    },
    {
      id: 3,
      receiptNumber: 'RCP-2023-098',
      date: '2023-08-10',
      amount: 2000,
      description: 'Quarterly Fees - Q1'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'due':
        return <Badge variant="destructive">Due Now</Badge>;
      case 'upcoming':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Upcoming</Badge>;
      case 'paid':
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-600 hover:bg-red-700">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6" data-testid="page-ready">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Fees & Payments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your school fees and view payment history
          </p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Annual Fee</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feesSummary.totalAnnualFee}</div>
            <p className="text-xs text-muted-foreground">Academic year 2023-24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${feesSummary.paidAmount}</div>
            <p className="text-xs text-muted-foreground">
              {((feesSummary.paidAmount / feesSummary.totalAnnualFee) * 100).toFixed(1)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${feesSummary.pendingAmount}</div>
            <p className="text-xs text-muted-foreground">Remaining balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${feesSummary.nextDueAmount}</div>
            <p className="text-xs text-muted-foreground">
              Due {new Date(feesSummary.nextDueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {pendingFees.map((fee) => {
              const daysUntilDue = getDaysUntilDue(fee.dueDate);
              return (
                <Card key={fee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          {fee.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {fee.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${fee.amount}</div>
                        {getStatusBadge(fee.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
                        </div>
                        {fee.lateFee > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            Late fee: ${fee.lateFee}
                          </div>
                        )}
                      </div>
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your complete payment transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{payment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Paid on {new Date(payment.paidDate).toLocaleDateString()} via {payment.method}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Transaction ID: {payment.transactionId}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${payment.amount}</div>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Receipts</CardTitle>
              <CardDescription>Download your payment receipts and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receipts.map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{receipt.receiptNumber}</h4>
                        <p className="text-sm text-muted-foreground">{receipt.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(receipt.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">${receipt.amount}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
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

export default StudentFeesPage;