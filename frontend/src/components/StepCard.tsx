'use client'

import { Step } from '@/types/Step'

type StepCardProps = {
  step: Step
  isDragging?: boolean
}

export default function StepCard({ step, isDragging }: StepCardProps) {
  return (
    <div
      className={`p-3 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <h4 className='font-mono text-sm'>{step.uses || 'Custom Script'}</h4>
      {step.name && <p className='text-gray-600'>{step.name}</p>}
    </div>
  )
}
