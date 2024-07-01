import { activity } from "../types";

export type activityActions = 
{ type: "save-activity", payload: { newActity : activity } } | 
{ type: "set-activeId", payload: { id : activity["id"] } } | 
{ type: "delete-activity", payload: { id : activity["id"] } } |
{ type: "restart-app" } 


export type ActivityState = {
  activities: activity[]
  activeId: activity["id"]
};

const localActivities = () : activity[] => {
  const activities = localStorage.getItem("activities")
  return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
  activities: localActivities(),
  activeId: ''
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: activityActions
) => {
  if (action.type === "save-activity") {
    let newActivity : activity[] = []

    if(state.activeId){
      newActivity = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActity : activity)

    }else{
      newActivity = [...state.activities, action.payload.newActity]
    }

    return {
      ...state,
      activities: newActivity,
      activeId: ''
    };
  }
  if (action.type === "set-activeId"){
    return{
      ...state,
      activeId: action.payload.id
    }
  }

  if(action.type === "delete-activity"){
    return{
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id )
    }
  }

  if(action.type === "restart-app"){
    return{
      activities: [],
      activeId: ""
    }
  }

  return state;
};

