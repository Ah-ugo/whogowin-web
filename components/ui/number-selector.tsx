"use client"
import { Button } from "@/components/ui/button"
import { Shuffle, X } from "lucide-react"

interface NumberSelectorProps {
  selectedNumbers: number[]
  onNumbersChange: (numbers: number[]) => void
  maxNumbers?: number
  disabled?: boolean
}

export function NumberSelector({
  selectedNumbers,
  onNumbersChange,
  maxNumbers = 5,
  disabled = false,
}: NumberSelectorProps) {
  const toggleNumber = (number: number) => {
    if (disabled) return

    if (selectedNumbers.includes(number)) {
      onNumbersChange(selectedNumbers.filter((n) => n !== number))
    } else if (selectedNumbers.length < maxNumbers) {
      onNumbersChange([...selectedNumbers, number])
    }
  }

  const quickPick = () => {
    if (disabled) return

    const numbers: number[] = []
    while (numbers.length < maxNumbers) {
      const randomNumber = Math.floor(Math.random() * 30) + 1
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber)
      }
    }
    onNumbersChange(numbers.sort((a, b) => a - b))
  }

  const clearAll = () => {
    if (disabled) return
    onNumbersChange([])
  }

  return (
    <div className="space-responsive">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-heading-3">Select {maxNumbers} Numbers (1-30)</h3>
        <div className="flex space-x-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={quickPick}
            disabled={disabled}
            className="btn-secondary flex items-center space-x-2 bg-transparent flex-1 sm:flex-none"
          >
            <Shuffle className="w-4 h-4" />
            <span>Quick Pick</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            disabled={disabled || selectedNumbers.length === 0}
            className="btn-secondary bg-transparent flex items-center space-x-2 flex-1 sm:flex-none"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        </div>
      </div>

      <div className="grid-responsive-numbers gap-3 sm:gap-4">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => toggleNumber(number)}
            disabled={disabled}
            className={`
              number-ball focus-ring
              ${selectedNumbers.includes(number) ? "number-ball-selected" : "number-ball-unselected"}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-4 text-body-small">
          <span className={selectedNumbers.length === maxNumbers ? "text-green-600 font-medium" : "text-gray-500"}>
            Selected: {selectedNumbers.length}/{maxNumbers}
          </span>
          {selectedNumbers.length === maxNumbers && (
            <span className="text-green-600 font-medium">✓ Ready to play!</span>
          )}
        </div>

        {selectedNumbers.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-body-small text-gray-600 mb-3">Your selected numbers:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedNumbers
                .sort((a, b) => a - b)
                .map((number) => (
                  <span
                    key={number}
                    className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium min-w-[2rem] text-center"
                  >
                    {number}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
