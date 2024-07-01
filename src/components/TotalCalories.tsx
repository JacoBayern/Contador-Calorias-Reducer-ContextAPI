import CaloriesDisplay from './CaloriesDisplay'
import { useActivity } from '../hooks/useActivity'



export default function TotalCalories() {

  const { caloriesConsumed, totalCalories, caloriesBurned} = useActivity()

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
