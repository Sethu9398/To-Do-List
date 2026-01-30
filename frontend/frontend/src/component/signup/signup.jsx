import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import
import HeadingComp from "./headingcomp";
import "./signup.css";
import axios from "axios";

function Signup() {

    const navigate = useNavigate(); // <-- hook for navigation

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/register", form);

            alert("Signup Successful!");

            // Reset inputs
            setForm({ email: "", username: "", password: "" });

            // Redirect to signin page
            navigate("/signin"); // <-- go to signin page

        } catch (error) {
            alert(error.response?.data?.message || "Signup Failed");
        }
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="row">

                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 px-5">

                            <input
                                className="p-2 my-3"
                                type="email"
                                name="email"
                                placeholder="enter your email"
                                value={form.email}
                                onChange={change}
                            />

                            <input
                                className="p-2 my-3"
                                type="text"
                                name="username"
                                placeholder="enter your username"
                                value={form.username}
                                onChange={change}
                            />

                            <input
                                className="p-2 my-3"
                                type="password"
                                name="password"
                                placeholder="enter your password"
                                value={form.password}
                                onChange={change}
                            />

                            <button
                                className="btn-signup p-2 text-white"
                                onClick={submit}
                            >
                                Sign Up
                            </button>

                        </div>
                    </div>

                    <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center">
                        <HeadingComp first={"Sign"} second={"up"} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;
