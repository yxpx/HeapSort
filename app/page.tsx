import HeapSortVisualizer from "@/components/heap-sort-visualizer"
import RetroHeader from "@/components/retro-header"
import RetroFooter from "@/components/retro-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col">
      <RetroHeader />
      <main className="flex-1 container mx-auto px-2 py-1">
        <HeapSortVisualizer />
      </main>
      <RetroFooter />
    </div>
  )
}
