import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
    const [Todo, setTodo] = useState("");
    const [TodoList, setTodoList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which item is being edited

    const handleAdd = () => {
        if (Todo.trim() !== "") {
            setTodoList([...TodoList, { Todo, isCompleted: false }]);
            setTodo("");
        }
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleEdit = (index) => {
        setEditIndex(index); // Set the index of the todo being edited
    };

    const handleUpdate = (e, index) => {
        let updatedTodos = [...TodoList];
        updatedTodos[index].Todo = e.target.value;
        setTodoList(updatedTodos);
    };

    const handleSave = () => {
        setEditIndex(null); // Exit edit mode
    };

    const handleDelete = (index) => {
        setTodoList(TodoList.filter((_, i) => i !== index));
    };

    const handleTick = (index) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo, i) =>
                i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };


    return (
        <>
            <Navbar />
            <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
                <div className="addTodo">
                    <h2 className="text-lg font-bold">Add a Todo</h2>
                    <input type="text" onChange={handleChange} value={Todo} className="border p-1 rounded" />
                    <button onClick={handleAdd} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">Add</button>
                </div>

                <h2 className="text-lg font-bold mt-5">Your Todos</h2>
                {TodoList.map((i, index) => {
                    return (
                        <div key={index} className="todos space-y-3 my-1.5">
                            <div className="todo flex justify-between items-center bg-white p-3 rounded shadow">

                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleTick(index)}  // Pass index correctly
                                        className="w-6 h-6 cursor-pointer accent-purple-900"
                                    />

                                </div>

                                {/* Toggle between text and input field */}
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={i.Todo}
                                        onChange={(e) => handleUpdate(e, index)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    <div className={`text ${i.isCompleted ? "line-through text-gray-500" : ""}`}>
                                        {i.Todo}
                                    </div>
                                )}


                                <div className="buttons space-x-2">
                                    {editIndex === index ? (
                                        <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(index)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(index)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
