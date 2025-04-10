"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArrayControls from "./array-controls"
import HeapDisplay from "./heap-display"
import ArrayDisplay from "./array-display"
import AlgorithmControls from "./algorithm-controls"
import UserGuide from "./user-guide"
import EducationalContent from "./educational-content"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function HeapSortVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [heapSize, setHeapSize] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [algorithmPhase, setAlgorithmPhase] = useState<"idle" | "buildHeap" | "sort">("idle")
  const [isMaxHeap, setIsMaxHeap] = useState(true)
  const [steps, setSteps] = useState<
    Array<{
      array: number[]
      heapSize: number
      highlightedIndices: number[]
      swappingIndices: number[]
      sortedIndices: number[]
      description: string
      phase: "buildHeap" | "sort"
    }>
  >([])

  const animationRef = useRef<number | null>(null)

  // Generate random array
  const generateRandomArray = (size = 10) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    resetState(newArray)
  }

  // Reset state with new array
  const resetState = (newArray: number[]) => {
    setArray(newArray)
    setHeapSize(newArray.length)
    setCurrentStep(0)
    setSortedIndices([])
    setHighlightedIndices([])
    setSwappingIndices([])
    setAlgorithmPhase("idle")
    setIsPlaying(false)

    // Generate all steps for the animation
    const generatedSteps = generateHeapSortSteps(newArray, isMaxHeap)
    setSteps(generatedSteps)
    setTotalSteps(generatedSteps.length)
  }

  // Toggle between max heap and min heap
  const toggleHeapType = () => {
    setIsMaxHeap(!isMaxHeap)
    if (array.length > 0) {
      resetState([...array])
    }
  }

  // Generate all steps for heap sort
  const generateHeapSortSteps = (inputArray: number[], isMax: boolean) => {
    const steps: Array<{
      array: number[]
      heapSize: number
      highlightedIndices: number[]
      swappingIndices: number[]
      sortedIndices: number[]
      description: string
      phase: "buildHeap" | "sort"
    }> = []

    const arr = [...inputArray]
    const heapSize = arr.length
    const heapType = isMax ? "max" : "min"

    // Build heap phase
    steps.push({
      array: [...arr],
      heapSize,
      highlightedIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      description: `Starting to build ${heapType} heap`,
      phase: "buildHeap",
    })

    // Build heap
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapifyWithSteps(arr, heapSize, i, steps, "buildHeap", [], isMax)
    }

    steps.push({
      array: [...arr],
      heapSize,
      highlightedIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      description: `${heapType.charAt(0).toUpperCase() + heapType.slice(1)} heap built. Starting sort phase.`,
      phase: "sort",
    })

    // Heap sort phase
    const sortedIndices: number[] = []
    for (let i = arr.length - 1; i > 0; i--) {
      steps.push({
        array: [...arr],
        heapSize: i + 1,
        highlightedIndices: [0, i],
        swappingIndices: [0, i],
        sortedIndices: [...sortedIndices],
        description: `Swapping root (${arr[0]}) with last element (${arr[i]})`,
        phase: "sort",
      })

      // Swap root with last element
      ;[arr[0], arr[i]] = [arr[i], arr[0]]

      sortedIndices.push(i)

      steps.push({
        array: [...arr],
        heapSize: i,
        highlightedIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Element ${arr[i]} is now in its correct position`,
        phase: "sort",
      })

      // Heapify the reduced heap
      heapifyWithSteps(arr, i, 0, steps, "sort", [...sortedIndices], isMax)
    }

    sortedIndices.push(0)

    steps.push({
      array: [...arr],
      heapSize: 0,
      highlightedIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      description: "Heap sort complete!",
      phase: "sort",
    })

    return steps
  }

  // Heapify function that records steps
  const heapifyWithSteps = (
    arr: number[],
    heapSize: number,
    rootIndex: number,
    steps: any[],
    phase: "buildHeap" | "sort",
    sortedIndices: number[],
    isMax: boolean,
  ) => {
    let largest = rootIndex
    const left = 2 * rootIndex + 1
    const right = 2 * rootIndex + 2

    // Create arrays of valid indices to highlight
    const indicesToHighlight = [rootIndex]
    if (left < heapSize) indicesToHighlight.push(left)
    if (right < heapSize) indicesToHighlight.push(right)

    const heapType = isMax ? "max" : "min"
    steps.push({
      array: [...arr],
      heapSize,
      highlightedIndices: indicesToHighlight,
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Checking if node at index ${rootIndex} is ${isMax ? "smaller" : "larger"} than its children`,
      phase,
    })

    // Check if left child exists and compare based on heap type
    if (left < heapSize) {
      if ((isMax && arr[left] > arr[largest]) || (!isMax && arr[left] < arr[largest])) {
        largest = left
      }
    }

    // Check if right child exists and compare based on heap type
    if (right < heapSize) {
      if ((isMax && arr[right] > arr[largest]) || (!isMax && arr[right] < arr[largest])) {
        largest = right
      }
    }

    // If largest is not root
    if (largest !== rootIndex) {
      steps.push({
        array: [...arr],
        heapSize,
        highlightedIndices: [],
        swappingIndices: [rootIndex, largest],
        sortedIndices: [...sortedIndices],
        description: `Swapping ${arr[rootIndex]} with ${arr[largest]}`,
        phase,
      })

      // Ensure the array is valid and perform the swap
      if (Array.isArray(arr)) {
        ;[arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]]
      } else {
        throw new Error("Invalid array detected during heapify.")
      }

      steps.push({
        array: [...arr],
        heapSize,
        highlightedIndices: [largest],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Heapifying the affected subtree at index ${largest}`,
        phase,
      })

      // Recursively heapify the affected sub-tree
      heapifyWithSteps(arr, heapSize, largest, steps, phase, sortedIndices, isMax)
    }
  }

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Step forward
  const stepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Step backward
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Reset to beginning
  const resetToBeginning = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  // Skip to end
  const skipToEnd = () => {
    setCurrentStep(totalSteps - 1)
    setIsPlaying(false)
  }

  // Update speed
  const updateSpeed = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  // Animation loop
  useEffect(() => {
    if (isPlaying && currentStep < totalSteps - 1) {
      animationRef.current = window.setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 1000 / speed)
    } else if (currentStep >= totalSteps - 1) {
      setIsPlaying(false)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isPlaying, currentStep, totalSteps, speed])

  // Update visualization based on current step
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep]
      setArray([...step.array])
      setHeapSize(step.heapSize)
      setHighlightedIndices([...step.highlightedIndices])
      setSwappingIndices([...step.swappingIndices])
      setSortedIndices([...step.sortedIndices])
      setAlgorithmPhase(step.phase)
    }
  }, [currentStep, steps])

  // Initialize with a random array
  useEffect(() => {
    generateRandomArray(10)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8">
      <Tabs defaultValue="visualizer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black border-2 border-pink-400">
          <TabsTrigger value="visualizer" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Visualizer
          </TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            User Guide
          </TabsTrigger>
          <TabsTrigger value="learn" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
            Learn Heap Sort
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visualizer" className="mt-4">
          <div className="space-y-6 p-4 border-2 border-pink-400 rounded-md bg-black">
          <h2 className="text-2xl text-center text-pink-400 mb-4">Heap Sort Visualizer</h2>
          <div className="flex justify-end mb-4">
           <div className="flex items-center space-x-2">
             <Switch
               id="heap-type"
               checked={isMaxHeap}
               onCheckedChange={toggleHeapType}
               className="data-[state=checked]:bg-pink-400"
             />
             <Label htmlFor="heap-type" className="text-pink-400">
               {isMaxHeap ? "Max Heap" : "Min Heap"}
             </Label>
           </div>
         </div>
         
         <ArrayControls
           generateRandomArray={generateRandomArray}
           array={array}
           setArray={setArray}
           resetState={resetState}
         />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl mb-2 text-center">Heap Structure</h3>
                <div className="border-2 border-pink-400  h-80 rounded-md">
                  <HeapDisplay
                    array={array}
                    heapSize={heapSize}
                    highlightedIndices={highlightedIndices}
                    swappingIndices={swappingIndices}
                    sortedIndices={sortedIndices}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="text-xl mb-2 text-center">Array View</h3>
                <div className="border-2 border-pink-400 p-4 h-80 rounded-md">
                  <ArrayDisplay
                    array={array}
                    highlightedIndices={highlightedIndices}
                    swappingIndices={swappingIndices}
                    sortedIndices={sortedIndices}
                  />

                  {steps.length > 0 && currentStep < steps.length && (
                    <div className="mt-4 p-2 border border-pink-400 bg-black text-pink-400 rounded">
                      <p className="text-center">{steps[currentStep].description}</p>
                      <p className="text-center text-xs mt-1">
                        Phase: {steps[currentStep].phase === "buildHeap" ? "Build Heap" : "Sort"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <AlgorithmControls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              stepForward={stepForward}
              stepBackward={stepBackward}
              resetToBeginning={resetToBeginning}
              skipToEnd={skipToEnd}
              currentStep={currentStep}
              totalSteps={totalSteps}
              speed={speed}
              updateSpeed={updateSpeed}
            />
          </div>
        </TabsContent>

        <TabsContent value="guide" className="mt-4">
          <div className="p-4 border-2 border-pink-400 rounded-md bg-black">
            <UserGuide />
          </div>
        </TabsContent>

        <TabsContent value="learn" className="mt-4">
          <div className="p-4 border-2 border-pink-400 rounded-md bg-black">
            <EducationalContent />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
