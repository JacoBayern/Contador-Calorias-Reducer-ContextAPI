import { useMemo, Dispatch } from "react";
import { activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { activityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
  activities: activity[];
  dispatch: Dispatch<activityActions>
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
    const isEmpty = useMemo( () => activities.length  === 0 ,[activities])
  return (
    <>
      <h2 className=" text-4xl font-bold text-slate-600 text-center">
        Comidas y Actividades{" "}
      </h2>
      { isEmpty ? 
      
      <p className=" text-center my-4 "> No hay comidas y actividades... </p> : activities.map((activity) => (
        <div
          key={activity.id}
          className=" bg-white mt-5 px-10 py-10 flex justify-between"
        >
          <div className=" space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-3 font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {" "}
              {activity.calories}{" "}
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button onClick={ () => dispatch({type: "set-activeId", payload: {id: activity.id}})} >
              <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>

            <button onClick={ () => dispatch({type: "delete-activity", payload: {id: activity.id}})} >
              <XCircleIcon className="h-8 w-8 text-red-500" />
            </button>
          </div>
        </div>
      )
      )
      }
      
            
    </>
  );
}
