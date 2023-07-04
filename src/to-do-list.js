import { useEffect, useState, useReducer } from "react";
import { getCurrentUser } from "./auth";
import { Data, reduceHandler } from "./reducer";
import axios from "axios";

export default function ToDoList() {
  const [users, dispatch] = useReducer(reduceHandler, Data);

  useEffect(() => {
    document.getElementById("to-do-div").classList.replace("col-4", "col-12");
    dispatch({ type: "LOADING" });
    getCurrentUser()
      .then(async (data) => {
        try {
          const d = await axios.get(
            `https://pvl85b5g56.execute-api.ap-south-1.amazonaws.com/dev/${data.sub}`
          );
          if (d) {
            console.log(d);
            dispatch({ type: "SET-USER-DETAIL", setData: d.data.Item });
            dispatch({
              type: "SET_TODO_ARR",
              setArr: d.data.Item.todo,
            });
          }
        } catch (error) {
          dispatch({ type: "ERROR", err: err });
        }
      })
      .catch((err) => dispatch({ type: "ERROR", err: err }));
  }, []);
  const handle = async (e) => {
    e.preventDefault();
    dispatch({
      type: "GIVE_INPUT_VAL",
      giveInput: "",
    });
    dispatch({ type: "SPINNER_ON" });
    
    try {
      const g = await axios.put(
        `https://m3q94o37uf.execute-api.ap-south-1.amazonaws.com/dev/put-todo-data?id=${users.userDetail.id}&len=${users.todoArr.length}&name=${users.INPUT_VAL}`
      );
      if (g) {
        dispatch({
          type: "SET_TODO_ARR",
          setArr: g.data.Attributes.todo,
        });
        dispatch({ type: "SPINNER_OFF" });
        console.log(g);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {users.loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="row row-cols-1">
            <div className="col">
              <h2 style={{ color: "#d71174" }}>{users.userDetail?.email}</h2>
            </div>
            <div className="col mt-5">
              <form onSubmit={handle}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="To-Do"
                    className="form-control p-3"
                    value={users.INPUT_VAL.toUpperCase()}
                    onChange={(e) =>
                      dispatch({
                        type: "GIVE_INPUT_VAL",
                        giveInput: e.target.value,
                      })
                    }
                    id="to-do-input"
                  />
                  {users.spinner ? (
                    <div
                      className="spinner-border ms-auto"
                      style={{ position: "absolute", top: "34%", left: "90%" }}
                      role="status"
                      aria-hidden="true"
                    ></div>
                  ) : null}
                </div>
              </form>
            </div>
            <div className="col p-4">
              <div className="row row-cols-1">
                {users?.todoArr?.map((val, index) => (
                  <div key={index} className="col p-3 mt-3 list-of-todo">
                    <h4>{val.toUpperCase()}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {users.setError}
    </div>
  );
}
