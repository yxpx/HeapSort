"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ArrayDisplayProps {
  array: number[]
  highlightedIndices: number[]
  swappingIndices: number[]
  sortedIndices: number[]
}

export default function ArrayDisplay({ array, highlightedIndices, swappingIndices, sortedIndices }: ArrayDisplayProps) {
  // Find the maximum value for scaling
  const maxValue = Math.max(...array, 1)
  
  // Constants for height calculation
  const MIN_HEIGHT_PERCENT = 15 // Minimum height for any bar (15% of available height)
  const MAX_HEIGHT_PERCENT = 80 // Maximum height (80% of available height)
  const DYNAMIC_RANGE = MAX_HEIGHT_PERCENT - MIN_HEIGHT_PERCENT // Range for dynamic sizing

  return (
    <div className="flex items-end justify-center h-48 gap-1">
      <AnimatePresence>
        {array.map((value, index) => {
          // Determine the bar's state
          const isHighlighted = highlightedIndices.includes(index)
          const isSwapping = swappingIndices.includes(index)
          const isSorted = sortedIndices.includes(index)

          // Calculate height with minimum guaranteed height
          // Small values will be at least MIN_HEIGHT_PERCENT tall
          const scaledHeight = (value / maxValue) * DYNAMIC_RANGE + MIN_HEIGHT_PERCENT
          const height = `${scaledHeight}%`

          // Determine bar color based on its state
          let barColor = "bg-pink-400"
          if (isHighlighted) barColor = "bg-yellow-400"
          if (isSwapping) barColor = "bg-red-400"
          if (isSorted) barColor = "bg-pink-600"

          return (
            <motion.div
              key={`${index}-${value}`}
              className={`w-8 ${barColor} border border-pink-600 flex items-end justify-center pb-1`}
              style={{ height }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isSwapping ? 1.1 : 1,
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs text-black font-bold">{value}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}