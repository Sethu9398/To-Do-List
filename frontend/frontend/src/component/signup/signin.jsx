import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect after login
import HeadingComp from './headingcomp';
import './signup.css';
import axios from "axios";

function Signin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signin", form);

            alert(response.data.message); // Sign-in successfully
            console.log("Logged in user:", response.data.user);

            // Redirect to Todo page with userId and email
            navigate("/todo", { 
                state: { 
                    userId: response.data.user._id, 
                    userEmail: response.data.user.email 
                } 
            });

        } catch (error) {
            alert(error.response?.data?.message || "Signin Failed");
        }
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center">
                        <HeadingComp first={"Sign"} second={"in"} />
                    </div>

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
                                Sign In
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signin;
