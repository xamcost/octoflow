'use client'

import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import { Step } from '@/types/Step'
import { DragTypes } from '@/types/DragTypes'

type StepCardProps = {
  step: Step
  index: number
  moveStepAction: (dragIndex: number, hoverIndex: number) => void
}

export default function StepCard({
  step,
  index,
  moveStepAction,
}: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.STEP,
    item: { id: step.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.STEP,
    hover: (item: { id: string; index: number }, monitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      // Don't reorder items if the drag item is the same as the hover item
      if (dragIndex === hoverIndex) return

      const rect = ref.current.getBoundingClientRect()
      // Get the mouse position relative to the item being hovered
      // TODO: Handle better case where monitor.getClientOffset() returns null
      const clientOffset = monitor.getClientOffset() || { x: 0, y: 0 }
      const hoverClientY = clientOffset.y - rect.top
      // Only allow reordering if the mouse is in the middle of the item
      const hoverMiddleY = (rect.bottom - rect.top) / 2
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Perform the reorder
      moveStepAction(dragIndex, hoverIndex)
      // Update the index of the dragged item
      item.index = hoverIndex
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  // Combine drag and drop refs
  drag(drop(ref))

  return (
    <div
      ref={ref}
      id={`step-card-${step.id}`}
      className={`p-3 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {step.name && <h4 className='font-mono text-sm'>{step.name}</h4>}
      <p className='text-xs text-gray-500'>{step.uses}</p>
    </div>
  )
}
