import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface FlowDiagramProps {
  steps: Array<{
    title: string;
    description: string;
    screens: string[];
  }>;
}

export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>
              <div className="flex flex-wrap gap-2">
                {step.screens.map((screen, screenIndex) => (
                  <div
                    key={screenIndex}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {screen}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-12 w-0.5 h-8 bg-orange-200"></div>
          )}
        </div>
      ))}
    </div>
  );
}
