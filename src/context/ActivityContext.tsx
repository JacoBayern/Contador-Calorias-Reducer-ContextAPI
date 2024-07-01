import { ReactNode, createContext, useReducer, Dispatch, useMemo } from "react";
import { ActivityState, activityActions, activityReducer, initialState } from "../reducers/activity-reducers";
import { categories } from "../data/categories";
import { activity } from "../types";


type ActivityProviderProps = {
    children: ReactNode
   
}

type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<activityActions>,
    caloriesConsumed: number,
    caloriesBurned: number,
    totalCalories: number,
    categoryName: (category: activity["category"]) => string[],
    isEmpty: boolean
}




export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    //totalCalories
    const [state, dispatch] = useReducer(activityReducer, initialState)

    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    //activityList

    const categoryName = useMemo(
        () => (category: activity["category"]) =>
          categories.map((cat) => (cat.id === category ? cat.name : "")),
        [state.activities]
      );
    
    const isEmpty = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={
            {
                state,
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                totalCalories,
                categoryName,
                isEmpty
            }
        }>
            {children}
        </ActivityContext.Provider>
    )
}