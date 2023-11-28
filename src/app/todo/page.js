'use client';// src/pages/todos.js

import { useState } from "react";
//we must import the datepicker's css modules manually
//so it plays nice with Next.
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function Todos() {
  const user = {email: 'daspradyut516@gmail.com'} ;
  //create a state to store new  for todos
  const [todoList, setTodoList] = useState([]);
  //create a state for the text in the todo input form
  const [userInput, setUserInput] = useState("");
  //create a state for the due date chosen in the datepicker
  const [dueDate, setDueDate] = useState("");
  //set an error message if either input is missing
  const [errMessage, setErrMessage] = useState("");
  //...

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  //FOR THE SUBMIT BUTTON:
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if either part of the form isn't filled out
    //set an error message and exit
    if (userInput.length == 0 || dueDate == "") {
      setErrMessage("Todo text and due date must be filled out.");
    } else {
      //otherwise send the todo to our api
      // (we'll make this next!)
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          text: userInput,
          dueDate: dueDate,
          user: user.email,
        }),
      });
      // await fetchTodos(); //(we'll add this later)
      // Clear all inputs after the todo is sent to Sanity
      setUserInput("");
      setErrMessage("");
      setDueDate("");
    }
  };

  return (
    <form>
      {/*we flex the text input and datepicker
    so they display inline. */}
      <div className="flex justify-center items-center">
        <label for="todo" className="invisible">
          Your Todo
        </label>
        <input
          className="w-72 h-12 border p-4 border-blue-100"
          type="text"
          //our state
          value={userInput}
          placeholder="Make coffee."
          //our function
          onChange={handleChange}
        />
        <div className="my-8">
          <DatePicker
            className="p-4"
            //makes it so we cannot set due date in past
            minDate={new Date()}
            //our dueDate state
            onChange={setDueDate}
            value={dueDate}
          />
        </div>
      </div>{" "}
      <button
        className="focus:outline-none focus:ring focus:border-blue-800
        px-6 py-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
        font-semibold"
        //our function
        onClick={handleSubmit}
      >
        Submit
      </button>
      {/*error set in handleSubmit*/}
      <p>{errMessage}</p>
    </form>
  );
}
