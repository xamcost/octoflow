'use client'

import { useDraggable } from '@dnd-kit/core'
import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'

type MarketplaceAction = {
  uses: string
  name: string
}

export default function MarketplaceSidebar() {
  const [actions, setActions] = useState<MarketplaceAction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchActions = async () => {
      setIsLoading(true)
      try {
        const octokit = new Octokit()
        const response = await octokit.request('GET /search/repositories', {
          q: 'topic:github-actions',
          sort: 'stars',
          per_page: 20,
        })
        setActions(
          response.data.items.map((repo) => ({
            uses: `${repo.full_name}@${repo.default_branch || 'v1'}`,
            name: repo.description || repo.name,
          })),
        )
      } catch (error) {
        console.error('Failed to fetch actions:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchActions()
  }, [])

  return (
    <div className='w-64 p-4 bg-white border-r border-gray-200'>
      <h3 className='font-bold mb-4'>Marketplace Actions</h3>
      {isLoading ? (
        <p className='text-gray-500'>Loading...</p>
      ) : (
        <div className='space-y-2'>
          {actions.map((action) => (
            <DraggableAction key={`template-${action.uses}`} action={action} />
          ))}
        </div>
      )}
    </div>
  )
}

function DraggableAction({ action }: { action: MarketplaceAction }) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: `template-${action.uses}`,
      data: { action },
    })
  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition: isDragging ? 'none' : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 hover:bg-gray-100 rounded cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={style}
    >
      <code className='text-sm'>{action.uses}</code>
      {action.name && <p className='text-gray-600 text-xs'>{action.name}</p>}
    </div>
  )
}
