import './todo.css'
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

function TodoCards({ title, body, id, delid, update }) {
    return (
        <div className="container p-3 todo-card align-items-center">
            <div className='align-items-center'>
                <h5>{title}</h5>
                <p className='todo-card-p'>{body.substring(0, 77)}</p>
            </div>

            <div className='d-flex justify-content-around'>
                <div
                    className='d-flex justify-content-center align-items-center card-icons-head px-2 py-1'
                    onClick={update}
                >
                    <GrDocumentUpdate className='card-icons' /> Update
                </div>

                <div
                    className='d-flex justify-content-center align-items-center card-icons-head px-2 py-1'
                    onClick={() => delid(id)}
                >
                    <MdDelete className='card-icons del' /> Delete
                </div>
            </div>
        </div>
    );
}

export default TodoCards;
