'use client'

import Canvas from '@/components/Canvas'
import { Step } from '@/types/Step'

export default function EditorPage() {
  // const [workflow, setWorkflow] = useState({
  //   name: 'My Workflow',
  //   on: { push: { branches: ['main'] } },
  //   jobs: {
  //     build: {
  //       'runs-on': 'ubuntu-latest',
  //       steps: [
  //         {
  //           id: '1',
  //           uses: 'actions/checkout@v4',
  //           name: 'Checkout Code',
  //           with: { fetchDepth: 0 },
  //         } as Step,
  //         {
  //           id: '2',
  //           uses: 'docker/setup-buildx-action@v3',
  //           name: 'Docker Setup',
  //         } as Step,
  //         {
  //           id: '3',
  //           uses: 'docker/build-push-action@v4',
  //           name: 'Build and Push Docker Image',
  //           with: {
  //             context: '.',
  //             file: 'Dockerfile',
  //             push: true,
  //             tags: 'my-image:latest',
  //           },
  //         } as Step,
  //       ],
  //     },
  //   },
  // })
  const steps = [
    {
      id: '1',
      uses: 'actions/checkout@v4',
      name: 'Checkout Code',
      with: { fetchDepth: 0 },
    } as Step,
    {
      id: '2',
      uses: 'docker/setup-buildx-action@v3',
      name: 'Docker Setup',
    } as Step,
    {
      id: '3',
      uses: 'docker/build-push-action@v4',
      name: 'Build and Push Docker Image',
      with: {
        context: '.',
        file: 'Dockerfile',
        push: true,
        tags: 'my-image:latest',
      },
    } as Step,
  ]

  return (
    <div className='flex h-screen bg-gray-50'>
      <div className='flex-1 p-6'>
        <Canvas workflowSteps={steps} />
      </div>
    </div>
  )
}
