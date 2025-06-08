'use client'

import { Step } from '@/types/Step'

type StepCardProps = {
  step: Step
  handleDeleteStepAction: (stepId: string) => void
}

export default function StepCard({
  step,
  handleDeleteStepAction,
}: StepCardProps) {
  return (
    <div className='group p-3 bg-white rounded shadow hover:bg-gray-50 flex justify-between items-center'>
      <div className='cursor-pointer flex-1'>
        <h4 className='font-mono text-sm'>{step.uses || 'Custom Script'}</h4>
        {step.name && <p className='text-gray-600'>{step.name}</p>}
      </div>
      <button
        onClick={() => {
          console.log(`Deleting step: ${step.id}`)
          handleDeleteStepAction(step.id)
        }}
        className='w-7 h-7 p-1 rounded-2xl hover:bg-gray-200 text-gray-600'
      >
        <svg
          data-slot='icon'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
            fillRule='evenodd'
          ></path>
        </svg>
      </button>
    </div>
  )
}
