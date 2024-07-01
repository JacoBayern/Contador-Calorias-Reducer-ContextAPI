import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import { activity } from "../types";
import { ActivityState, activityActions } from "../reducers/activity-reducers";

type formProps = {
  dispatch: Dispatch<activityActions>
  state: ActivityState
};
export default function Form({ dispatch, state }: formProps) {
  const initialState: activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };

  const [activity, setActivity] = useState<activity>(initialState);

    useEffect(() => {
      if(state.activeId){
        const selectecActivity = state.activities.filter(stateActivity => (stateActivity.id === state.activeId))[0]
        setActivity(selectecActivity) //PREGUNTAR A BELTRÁN O AKERMAN 
      }
    }
    ,[state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["calories", "category"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActity: activity } });

    setActivity(initialState);
  };

  return (
    <form
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          onChange={handleChange}
          value={activity.category}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Ej. Comida, Pollo, Carne, Manzana, Ejercicio, Pesas, Correr"
          onChange={handleChange}
          value={activity.name}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          value={activity.calories}
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          onChange={handleChange}
          placeholder="Ej. 300 o 500"
        />
      </div>
      <input
        type="submit"
        className=" font-bold w-full text-white bg-gray-800 p-2 hover:bg-gray-900 uppercase cursor-pointer disabled:opacity-10"
        value={activity.category == 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
