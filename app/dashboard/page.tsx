import {
  PlusIcon,
} from '@heroicons/react/24/outline';
import LinkButton from "@/components/shared/LinkButton";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <header className="flex justify-between">
        <h1 className="text-4xl">Dashboard.</h1>
    
        <LinkButton href="/dashboard/create">
          <PlusIcon className="w-6" /><span>Create an event</span>
        </LinkButton>
      </header>
      
    </main>
  )
}