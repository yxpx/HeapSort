"use client"

import { useRef, useEffect } from "react"

interface HeapDisplayProps {
  array: number[]
  heapSize: number
  highlightedIndices: number[]
  swappingIndices: number[]
  sortedIndices: number[]
}

export default function HeapDisplay({
  array,
  heapSize,
  highlightedIndices,
  swappingIndices,
  sortedIndices,
}: HeapDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw heap as a binary tree
    drawHeap(ctx, array, heapSize, highlightedIndices, swappingIndices, sortedIndices)
  }, [array, heapSize, highlightedIndices, swappingIndices, sortedIndices])

  const drawHeap = (
    ctx: CanvasRenderingContext2D,
    array: number[],
    heapSize: number,
    highlightedIndices: number[],
    swappingIndices: number[],
    sortedIndices: number[],
  ) => {
    const canvas = ctx.canvas
    const width = canvas.width
    const height = canvas.height

    // Calculate the maximum depth of the heap
    const maxDepth = Math.floor(Math.log2(heapSize)) + 1

    // Node size and spacing
    const nodeRadius = 20
    const levelHeight = height / (maxDepth + 1)
    
    // Horizontal spacing factor (0.6 means 60% of original width)
    const horizontalFactor = 0.45

    // Draw the nodes and connections
    const drawNode = (index: number, x: number, y: number, depth: number) => {
      if (index >= heapSize) return

      // Determine node color based on its state
      let fillColor = "#1F2937" // Default
      const textColor = "#EC4899" // Pink text color
      let strokeColor = "#EC4899" // Default border (pink)

      if (sortedIndices.includes(index)) {
        fillColor = "#831843" // Dark pink for sorted
        strokeColor = "#DB2777" // Medium pink for sorted border
      }

      if (highlightedIndices.includes(index)) {
        fillColor = "#374151" // Highlighted background
        strokeColor = "#F59E0B" // Amber for highlight
      }

      if (swappingIndices.includes(index)) {
        fillColor = "#4B5563" // Swapping background
        strokeColor = "#EF4444" // Red for swapping
      }

      // Draw node
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)
      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = strokeColor
      ctx.stroke()

      // Draw value
      ctx.fillStyle = textColor
      ctx.font = '14px "IBM Plex Serif", serif'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(array[index].toString(), x, y)

      // Calculate child positions
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2

      // Width of this level (for spacing nodes) - apply the horizontal factor
      const levelWidth = (width * horizontalFactor) / Math.pow(2, depth)

      if (leftChildIndex < heapSize) {
        const childX = x - levelWidth / 2
        const childY = y + levelHeight

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(x, y + nodeRadius)
        ctx.lineTo(childX, childY - nodeRadius)
        ctx.strokeStyle = "#EC4899"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw left child
        drawNode(leftChildIndex, childX, childY, depth + 1)
      }

      if (rightChildIndex < heapSize) {
        const childX = x + levelWidth / 2
        const childY = y + levelHeight

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(x, y + nodeRadius)
        ctx.lineTo(childX, childY - nodeRadius)
        ctx.strokeStyle = "#EC4899"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw right child
        drawNode(rightChildIndex, childX, childY, depth + 1)
      }
    }

    // Start drawing from the root
    if (heapSize > 0) {
      drawNode(0, width / 2, levelHeight, 0)
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} width={500} height={300} className="max-w-full max-h-full" />
    </div>
  )
}