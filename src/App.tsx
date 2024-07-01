import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import { activityReducer, initialState } from "./reducers/activity-reducers";
import TotalCalories from "./components/TotalCalories";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities)),
      [state.activities];
  });

  const canRestart = useMemo( () => state.activities.length, [state.activities])

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-center font-bold text-lg text-white uppercase">
            Contador de Calorias
          </h1>

          <button className=" bg-gray-600 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10" disabled={!canRestart} onClick={() => dispatch({ type: "restart-app" })}>
            Reiniciar Listado
          </button>
        </div>
      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto ">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className=" bg-gray-600 py-10">
        <div className="max-w-4xl mx-auto">

          <TotalCalories activities={state.activities} />

        </div>
      </section>

      <section className="p-20 mx-auto max-w-4x bg-slate-100 shadow">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
