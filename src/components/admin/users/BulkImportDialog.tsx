import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  X 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BulkImportDialog = ({ open, onOpenChange }: BulkImportDialogProps) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const downloadTemplate = () => {
    // In a real app, this would download an actual CSV template
    const csvContent = `First Name,Last Name,Email,Role,Campus,Department,Employee ID
John,Doe,john.doe@school.edu,TEACHER,main,Mathematics,EMP001
Jane,Smith,jane.smith@parent.com,PARENT,main,,
Mike,Johnson,mike.johnson@school.edu,ADMIN,north,Administration,EMP002`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-import-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Template Downloaded',
      description: 'CSV template has been downloaded to your device.',
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const processImport = async () => {
    if (!file) return;

    setStep('processing');
    
    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setStep('results');
  };

  const resetDialog = () => {
    setStep('upload');
    setFile(null);
    setProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetDialog();
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk User Import
          </DialogTitle>
          <DialogDescription>
            Import multiple users at once using a CSV file
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6">
            {/* Template Download */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Step 1: Download Template
                </CardTitle>
                <CardDescription>
                  Start by downloading our CSV template with the required format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadTemplate} variant="outline" className="w-full gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Download CSV Template
                </Button>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Step 2: Upload Completed File
                </CardTitle>
                <CardDescription>
                  Upload your completed CSV file with user data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <div className="p-4 bg-muted rounded-full">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        {file ? file.name : 'Click to upload CSV file'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or drag and drop your file here
                      </p>
                    </div>
                  </label>
                </div>

                {file && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    File selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Make sure your CSV file follows the exact template format. 
                Invalid data will be skipped during import and reported in the results.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={processImport} disabled={!file}>
                Import Users
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-6 text-center py-8">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Processing Import</h3>
              <p className="text-muted-foreground">
                Validating and importing user data...
              </p>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
            </div>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Import Complete</h3>
              <p className="text-muted-foreground">
                Your user import has been processed
              </p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-muted-foreground">Successfully Imported</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-muted-foreground">Skipped (Duplicates)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-muted-foreground">Failed (Invalid Data)</div>
                </CardContent>
              </Card>
            </div>

            {/* Error Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Import Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-green-600">✓</span> 18 users created and welcome emails sent
                </div>
                <div className="text-sm">
                  <span className="font-medium text-orange-600">⚠</span> 3 users skipped (email already exists)
                </div>
                <div className="text-sm">
                  <span className="font-medium text-red-600">✗</span> 2 rows failed validation (invalid email format)
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetDialog}>
                Import More Users
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};