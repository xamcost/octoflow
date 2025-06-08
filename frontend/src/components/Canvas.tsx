'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import StepCard from './StepCard'
import { Step } from '@/types/Step'

type CanvasProps = {
  steps: Step[]
  setStepsAction: (steps: Step[]) => void
}

export default function Canvas({ steps, setStepsAction }: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: 'canvas' })

  const handleDeleteStepAction = (stepId: string) => {
    console.log(`Deleting step: ${stepId}`)
    const newSteps = steps.filter((step) => step.id !== stepId)
    setStepsAction(newSteps)
  }

  return (
    <SortableContext items={steps} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className='mt-4 space-y-3 min-h-[400px] p-4 border-2 border-dashed border-gray-300 rounded-lg'
      >
        {steps.map((step) => (
          <SortableStep
            key={step.id}
            step={step}
            handleDeleteStepAction={handleDeleteStepAction}
          />
        ))}
        {steps.length === 0 && (
          <p className='text-gray-500 text-center'>Drag steps here</p>
        )}
      </div>
    </SortableContext>
  )
}

type SortableStepProps = {
  step: { id: string; uses?: string; name?: string }
  handleDeleteStepAction: (stepId: string) => void
}

function SortableStep({ step, handleDeleteStepAction }: SortableStepProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: step.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StepCard step={step} handleDeleteStepAction={handleDeleteStepAction} />
    </div>
  )
}
