"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface ArrayControlsProps {
  generateRandomArray: (size: number) => void
  array: number[]
  setArray: (array: number[]) => void
  resetState: (array: number[]) => void
}

export default function ArrayControls({ generateRandomArray, array, setArray, resetState }: ArrayControlsProps) {
  const [arraySize, setArraySize] = useState(10)
  const [customArrayInput, setCustomArrayInput] = useState("")
  const [error, setError] = useState("")

  const handleSizeChange = (value: number[]) => {
    setArraySize(value[0])
  }

  const handleGenerateArray = () => {
    generateRandomArray(arraySize)
    setError("")
  }

  const handleCustomArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomArrayInput(e.target.value)
  }

  const handleCustomArraySubmit = () => {
    try {
      // Parse the input string to an array of numbers
      const parsedArray = customArrayInput.split(",").map((item) => {
        const num = Number.parseInt(item.trim())
        if (isNaN(num)) throw new Error("Invalid input")
        return num
      })

      if (parsedArray.length < 2) {
        setError("Please enter at least 2 numbers")
        return
      }

      if (parsedArray.length > 20) {
        setError("Maximum array size is 20")
        return
      }

      resetState(parsedArray)
      setError("")
    } catch (err) {
      setError("Invalid input. Please enter comma-separated numbers.")
    }
  }

  // Function to calculate width based on number of digits
  const getBoxWidth = (value: number) => {
    const digitCount = value.toString().length;
    // Base is 2rem (32px), add 0.4rem per extra digit beyond 1
    return digitCount > 1 ? `${2 + (digitCount - 1) * 0.4}rem` : "2rem";
  }

  return (
    <div className="space-y-6">
      {/* Top section: inputs */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* First column: Random array */}
        <div className="flex-1">
          <label className="text-sm block mb-2 text-green-400">Generate Random Array</label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-pink-400 w-16">Size: {arraySize}</span>
              <div className="flex-1">
                <Slider
                  value={[arraySize]}
                  min={3}
                  max={20}
                  step={1}
                  onValueChange={handleSizeChange}
                  className="h-10 [&>span:first-child]:bg-pink-400/30 [&_[role=slider]]:bg-pink-400 [&>span:first-child_span]:bg-pink-400"
                />
              </div>
            </div>
            <Button
              onClick={handleGenerateArray}
              className="w-full bg-pink-400 text-black hover:bg-pink-500 border-2 border-pink-600 font-pixel"
            >
              Generate
            </Button>
          </div>
        </div>
  
        {/* Second column: Custom input */}
        <div className="flex-1">
          <label className="text-sm block mb-2 text-green-400">Custom Array (comma-separated)</label>
          <div className="space-y-3">
            <Input
              value={customArrayInput}
              onChange={handleCustomArrayChange}
              placeholder="e.g., 12, 5, 8, 3, 17"
              className="bg-black text-pink-400 border-pink-400"
            />
            <Button
              onClick={handleCustomArraySubmit}
              className="w-full bg-pink-400 text-black hover:bg-pink-500 border-2 border-pink-600 font-pixel"
            >
              Set
            </Button>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
        </div>
      </div>
  
      {/* Bottom section: Array display */}
      <div className="flex justify-center">
        <div className="flex gap-2 flex-wrap justify-center">
          {array.map((value, index) => (
            <div
              key={index}
              className="h-8 flex items-center justify-center border-2 border-pink-400 text-sm"
              style={{ width: getBoxWidth(value), minWidth: "2rem" }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  