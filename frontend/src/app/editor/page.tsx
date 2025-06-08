'use client'

import {
  DndContext,
  DragEndEvent,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import Canvas from '@/components/Canvas'
import GlobalMenu from '@/components/GlobalMenu'
import MarketplaceSidebar from '@/components/MarketplaceSidebar'
import { Step } from '@/types/Step'

export default function EditorPage() {
  const [workflow, setWorkflow] = useState({
    name: 'My Workflow',
    on: { push: { branches: ['main'] } },
    jobs: {
      build: {
        'runs-on': 'ubuntu-latest',
        steps: [],
      },
    },
  })
  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    setWorkflow((prev: any) => ({
      ...prev,
      jobs: {
        build: {
          ...prev.jobs.build,
          steps,
        },
      },
    }))
  }, [steps])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // Case 1: Reorder existing steps (dragged within Canvas)
    if (
      over?.id &&
      active.id !== over.id &&
      steps.some((step: Step) => step.id === over.id)
    ) {
      const oldIndex = steps.findIndex((step: Step) => step.id === active.id)
      const newIndex = steps.findIndex((step: Step) => step.id === over.id)
      const newSteps = [...steps]
      const [movedStep] = newSteps.splice(oldIndex, 1)
      newSteps.splice(newIndex, 0, movedStep)

      setSteps(newSteps)
    }
    // Case 2: Add new step from Sidebar (dragged to Canvas)
    else if (over?.id === 'canvas' && active.data.current?.action) {
      const newStep = {
        id: `step-${Date.now()}`,
        ...active.data.current.action,
      }
      setSteps((prevSteps) => [...prevSteps, newStep])
    }
  }

  // Adding a mouse sensor is essential to enable firing click events that would otherwise
  // be intercepted by draggable elements.
  // See: https://github.com/clauderic/dnd-kit/issues/800
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const sensors = useSensors(mouseSensor)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className='flex h-screen bg-gray-50'>
        <MarketplaceSidebar />
        <div className='flex-1 p-6'>
          <button
            className='bg-gray-50 text-gray-600 border border-gray-300 rounded px-4 py-2 mb-4 hover:bg-gray-100'
            onClick={() => console.log(workflow)}
          >
            Test
          </button>
          <GlobalMenu
            workflow={workflow}
            onUpdateAction={(key, value) =>
              setWorkflow((prev) => ({ ...prev, [key]: value }))
            }
          />
          <Canvas steps={steps} setStepsAction={setSteps} />
        </div>
      </div>
    </DndContext>
  )
}
