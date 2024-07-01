import { useMemo } from 'react'
import { activity } from '../types'
import CaloriesDisplay from './CaloriesDisplay'

type TotalCaloriesProps = {
    activities: activity[]
}

export default function TotalCalories( { activities} : TotalCaloriesProps) {


  const caloriesConsumed = useMemo( () => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0 ), [activities])

  const caloriesBurned = useMemo( () => activities.reduce( (total, activity) => activity.category === 2 ? total + activity.calories : total,  0 ), [activities])

  const totalCalories = useMemo( () => caloriesConsumed - caloriesBurned, [activities] )

  return (
    <>
      <h2 className='text-white text-center text-4xl font-bold '> Total de Calorías</h2>

      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>

        <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />

        <CaloriesDisplay calories={totalCalories} text="Diferencia" />

        <CaloriesDisplay calories={caloriesBurned} text="Quemadas" />
      </div>
    </>
    

  )
}
