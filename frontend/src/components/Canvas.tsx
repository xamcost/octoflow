'use client'

import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import StepCard from './StepCard'
import { Step } from '@/types/Step'

type CanvasProps = {
  workflowSteps: Array<Step>
}

export default function Canvas({ workflowSteps }: CanvasProps) {
  const [steps, setSteps] = useState<Step[]>(workflowSteps)
  const moveStep = (dragIndex: number, hoverIndex: number) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      const [movedStep] = newSteps.splice(dragIndex, 1)
      newSteps.splice(hoverIndex, 0, movedStep)
      return newSteps
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='mt-4 space-y-3 min-h-[400px] p-4 border-2 border-dashed border-gray-300 rounded-lg'>
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            moveStepAction={moveStep}
          />
        ))}
        {steps.length === 0 && (
          <p className='text-gray-500 text-center'>Drag steps here</p>
        )}
      </div>
    </DndProvider>
  )
}
