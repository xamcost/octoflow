'use client'

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { useState } from 'react'
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // Case 1: Reorder existing steps (dragged within Canvas)
    if (
      over?.id &&
      active.id !== over.id &&
      workflow.jobs.build.steps.some((step: Step) => step.id === over.id)
    ) {
      const oldIndex = workflow.jobs.build.steps.findIndex(
        (step: Step) => step.id === active.id,
      )
      const newIndex = workflow.jobs.build.steps.findIndex(
        (step: Step) => step.id === over.id,
      )
      const newSteps = [...workflow.jobs.build.steps]
      const [movedStep] = newSteps.splice(oldIndex, 1)
      newSteps.splice(newIndex, 0, movedStep)

      setWorkflow((prev) => ({
        ...prev,
        jobs: {
          build: {
            ...prev.jobs.build,
            steps: newSteps,
          },
        },
      }))
    }
    // Case 2: Add new step from Sidebar (dragged to Canvas)
    else if (over?.id === 'canvas' && active.data.current?.action) {
      const newStep = {
        id: `step-${Date.now()}`,
        ...active.data.current.action,
      }
      setWorkflow((prev: any) => ({
        ...prev,
        jobs: {
          build: {
            ...prev.jobs.build,
            steps: [...prev.jobs.build.steps, newStep],
          },
        },
      }))
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className='flex h-screen bg-gray-50'>
        <MarketplaceSidebar />
        <div className='flex-1 p-6'>
          <GlobalMenu
            workflow={workflow}
            onUpdateAction={(key, value) =>
              setWorkflow((prev) => ({ ...prev, [key]: value }))
            }
          />
          <Canvas steps={workflow.jobs.build.steps} />
        </div>
      </div>
    </DndContext>
  )
}
