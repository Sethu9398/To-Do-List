function Update({ inputs, setInputs, updateTask, close }) {
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div className="update p-5 d-flex justify-content-center align-items-start flex-column">
            <h3>Update Your Task</h3>

            <input
                type="text"
                name="title"
                className="todo-inputs my-4 w-100 p-3"
                value={inputs.title}
                onChange={change}
            />
            <textarea
                name="body"
                className="todo-inputs my-4 w-100 p-3"
                value={inputs.body}
                onChange={change}
            />

            <div>
                <button className="btn btn-dark my-4" onClick={updateTask}>Update</button>
                <button className="btn btn-dark my-4 mx-3" onClick={close}>Close</button>
            </div>
        </div>
    );
}

export default Update;


