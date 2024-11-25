'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

const TimeProgress = () => {
  const [progress, setProgress] = useState({
    day: 0,
    week: 0,
    month: 0,
    year: 0
  })

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      
      // Calculate day progress
      const dayProgress = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 864
      
      // Calculate week progress (assuming week starts on Sunday)
      const startOfWeek = new Date(now)
      startOfWeek.setHours(0,0,0,0)
      startOfWeek.setDate(now.getDate() - now.getDay())
      const weekProgress = ((now.getTime() - startOfWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)) * 100
      
      // Calculate month progress
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      const monthProgress = (now.getDate() / daysInMonth) * 100
      
      // Calculate year progress
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const yearProgress = ((now.getTime() - startOfYear.getTime()) / (365 * 24 * 60 * 60 * 1000)) * 100

      setProgress({
        day: Math.round(dayProgress * 10) / 10,
        week: Math.round(weekProgress * 10) / 10,
        month: Math.round(monthProgress * 10) / 10,
        year: Math.round(yearProgress * 10) / 10
      })
    }

    calculateProgress()
    const interval = setInterval(calculateProgress, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-sm p-4 space-y-4 bg-gray-50 rounded-lg shadow-sm">
      {Object.entries(progress).map(([period, value]) => (
        <div key={period} className="flex items-center gap-4">
          <Progress 
            value={value} 
            className="flex-1 bg-gray-100" 
            indicatorClassName="bg-blue-200"
          />
          <div className="w-24 text-sm text-gray-500">
            {period.charAt(0).toUpperCase() + period.slice(1)}: {value}%
          </div>
        </div>
      ))}
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<TimeProgress />, root);