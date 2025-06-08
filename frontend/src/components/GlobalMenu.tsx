'use client'

type GlobalMenuProps = {
  workflow: { name: string; on: any }
  onUpdateAction: (key: string, value: any) => void
}

export default function GlobalMenu({
  workflow,
  onUpdateAction,
}: GlobalMenuProps) {
  return (
    <div className='mb-6 p-4 bg-white rounded shadow'>
      <label className='block mb-2'>
        Workflow Name:
        <input
          type='text'
          value={workflow.name}
          onChange={(e) => onUpdateAction('name', e.target.value)}
          className='mt-1 block w-full p-2 border rounded'
        />
      </label>
      <label className='block'>
        Trigger:
        <select
          value={Object.keys(workflow.on)[0]}
          onChange={(e) =>
            onUpdateAction('on', { [e.target.value]: { branches: ['main'] } })
          }
          className='mt-1 block w-full p-2 border rounded'
        >
          <option value='push'>Push</option>
          <option value='pull_request'>Pull Request</option>
        </select>
      </label>
    </div>
  )
}
