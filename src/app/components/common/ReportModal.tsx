import React, { useState } from 'react';
import { AlertTriangle, Bug, MessageSquare, Shield, Flag, X, Camera, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Report } from '../../App';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: Omit<Report, 'id' | 'reporterId' | 'reporterName' | 'timestamp' | 'status'>) => boolean;
  targetType?: 'truck' | 'user' | null;
  targetId?: string;
  targetName?: string;
}

const reportTypes = [
  { value: 'bug', label: 'Technical Issue/Bug', icon: Bug, description: 'App crashes, features not working, etc.' },
  { value: 'inappropriate-truck', label: 'Inappropriate Truck', icon: Flag, description: 'Offensive content, inappropriate behavior' },
  { value: 'inappropriate-user', label: 'Inappropriate User', icon: MessageSquare, description: 'Harassment, inappropriate messages' },
  { value: 'spam', label: 'Spam', icon: Shield, description: 'Fake listings, spam content' },
  { value: 'other', label: 'Other', icon: AlertTriangle, description: 'Something else not covered above' }
];

const priorities = [
  { value: 'low', label: 'Low', description: 'Minor issue, not urgent' },
  { value: 'medium', label: 'Medium', description: 'Affects functionality' },
  { value: 'high', label: 'High', description: 'Serious issue, needs immediate attention' }
];

export default function ReportModal({
  isOpen,
  onClose,
  onSubmit,
  targetType,
  targetId,
  targetName
}: ReportModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '' as Report['type'],
    category: 'other' as Report['category'],
    subject: '',
    description: '',
    priority: 'medium' as Report['priority'],
    targetId: targetId || '',
    targetName: targetName || ''
  });

  const resetForm = () => {
    setStep(1);
    setFormData({
      type: '' as Report['type'],
      category: 'other',
      subject: '',
      description: '',
      priority: 'medium',
      targetId: targetId || '',
      targetName: targetName || ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!formData.type || !formData.subject || !formData.description) {
      return;
    }

    // Auto-set category based on type
    let category: Report['category'] = 'other';
    switch (formData.type) {
      case 'bug':
        category = 'technical';
        break;
      case 'inappropriate-truck':
      case 'inappropriate-user':
        category = 'behavior';
        break;
      case 'spam':
        category = 'content';
        break;
    }

    const success = onSubmit({
      ...formData,
      category,
      targetId: formData.targetId || undefined,
      targetName: formData.targetName || undefined
    });

    if (success) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Report an Issue
            </DialogTitle>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What would you like to report?</h3>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Report['type'] })}
                className="space-y-3"
              >
                {reportTypes.map((type) => (
                  <div key={type.value} className="flex items-start space-x-3">
                    <RadioGroupItem
                      value={type.value}
                      id={type.value}
                      className="mt-1"
                    />
                    <label htmlFor={type.value} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <type.icon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">{type.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {targetType && targetName && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  Reporting: <span className="text-gray-900">{targetName}</span>
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.type}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="subject" className="text-base font-semibold">
                Subject *
              </Label>
              <Input
                id="subject"
                placeholder="Brief summary of the issue"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about the issue..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">
                Priority
              </Label>
              <RadioGroup
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as Report['priority'] })}
                className="space-y-2"
              >
                {priorities.map((priority) => (
                  <div key={priority.value} className="flex items-start space-x-3">
                    <RadioGroupItem
                      value={priority.value}
                      id={priority.value}
                      className="mt-1"
                    />
                    <label htmlFor={priority.value} className="flex-1 cursor-pointer">
                      <div className="font-medium capitalize">{priority.label}</div>
                      <p className="text-sm text-gray-600">{priority.description}</p>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.subject || !formData.description}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}