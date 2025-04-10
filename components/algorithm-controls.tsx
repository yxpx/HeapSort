"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, Gauge } from "lucide-react"

interface AlgorithmControlsProps {
  isPlaying: boolean
  togglePlay: () => void
  stepForward: () => void
  stepBackward: () => void
  resetToBeginning: () => void
  skipToEnd: () => void
  currentStep: number
  totalSteps: number
  speed: number
  updateSpeed: (speed: number) => void
}

export default function AlgorithmControls({
  isPlaying,
  togglePlay,
  stepForward,
  stepBackward,
  resetToBeginning,
  skipToEnd,
  currentStep,
  totalSteps,
  speed,
  updateSpeed,
}: AlgorithmControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={resetToBeginning}
          variant="outline"
          size="icon"
          className="border-pink-400 text-pink-400 hover:bg-pink-400/20"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          onClick={stepBackward}
          variant="outline"
          size="icon"
          className="border-pink-400 text-pink-400 hover:bg-pink-400/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={togglePlay}
          variant="outline"
          className="border-pink-400 bg-pink-400 text-black hover:bg-pink-500 hover:text-black px-6"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Play
            </>
          )}
        </Button>

        <Button
          onClick={stepForward}
          variant="outline"
          size="icon"
          className="border-pink-400 text-pink-400 hover:bg-pink-400/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          onClick={skipToEnd}
          variant="outline"
          size="icon"
          className="border-pink-400 text-pink-400 hover:bg-pink-400/20"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">
              Step: {currentStep + 1} / {totalSteps}
            </span>
            <span className="text-sm flex items-center">
              <Gauge className="h-3 w-3 mr-1" /> Speed: {speed}x
            </span>
          </div>
          <div className="h-2 w-full bg-pink-400/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-400 transition-all duration-300"
              style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="w-32 flex items-center gap-2">
          <span className="text-xs">1x</span>
          <Slider
            value={[speed]}
            min={0.5}
            max={3}
            step={0.5}
            onValueChange={(value) => updateSpeed(value[0])}
            className="[&>span:first-child]:bg-pink-400/30 [&_[role=slider]]:bg-pink-400 [&>span:first-child_span]:bg-pink-400"
          />
          <span className="text-xs">3x</span>
        </div>
      </div>
    </div>
  )
}
