import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(features)/_layout/')({
  component: Page,
})

interface Integration {
  id: string
  icon: React.ReactNode
}

interface Hero32Props {
  heading?: string
  description?: string
  button?: {
    text: string
    url: string
  }
  integrations?: Integration[][]
}

function Page({
  heading = 'This is my first React application',
  description = 'Fully decomposable components, all the images and background patterns are individual images or svgs that can be replaced.',
  button = {
    text: 'Getting started',
    url: 'https://www.shadcnblocks.com',
  },
  integrations = [
    [
      {
        id: 'integration-1',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-1.svg"
          />
        ),
      },
      {
        id: 'integration-2',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-2.svg"
          />
        ),
      },
      {
        id: 'integration-3',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-3.svg"
          />
        ),
      },
      {
        id: 'integration-4',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-4.svg"
          />
        ),
      },
      {
        id: 'integration-5',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-5.svg"
          />
        ),
      },
    ],
    [
      {
        id: 'integration-6',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-6.svg"
          />
        ),
      },
      {
        id: 'integration-7',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-1.svg"
          />
        ),
      },
      {
        id: 'integration-8',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-2.svg"
          />
        ),
      },
      {
        id: 'integration-9',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-3.svg"
          />
        ),
      },
      {
        id: 'integration-10',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-4.svg"
          />
        ),
      },
    ],
    [
      {
        id: 'integration-11',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-5.svg"
          />
        ),
      },
      {
        id: 'integration-12',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-6.svg"
          />
        ),
      },
      {
        id: 'integration-13',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-1.svg"
          />
        ),
      },
      {
        id: 'integration-14',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-2.svg"
          />
        ),
      },
      {
        id: 'integration-15',
        icon: (
          <img
            alt="Integration"
            src="https://www.shadcnblocks.com/images/block/block-3.svg"
          />
        ),
      },
    ],
  ],
}: Hero32Props) {
  return (
    <section className="relative overflow-hidden ml-5">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://shadcnblocks.com/images/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative">
        <div className="relative container flex flex-col items-start md:flex-row md:items-center md:-space-x-26">
          <div className="bg-background z-20 -mx-4 w-full shrink-0 px-4 pt-32 md:w-1/2 md:bg-transparent md:pb-32">
            <div className="flex flex-col items-start text-left">
              <div className="max-w-sm">
                <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                  {heading}
                </h1>
                <p className="text-muted-foreground">{description}</p>
                <Button asChild size="lg" className="mt-10">
                  <a href={button.url}>{button.text}</a>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-16 pt-12 pb-8 md:py-32">
              {integrations.map((line, i) => (
                <div key={i} className="flex gap-x-22 odd:-translate-x-22">
                  {line.map((integration) => (
                    <div
                      key={integration.id}
                      className="border-background bg-background size-22 rounded-xl border shadow-xl"
                    >
                      <div className="bg-muted/20 h-full w-full p-4">
                        {integration.icon}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
