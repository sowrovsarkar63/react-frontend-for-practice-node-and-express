import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [users, setuser] = useState([]);
    const userNameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        fetch("http://localhost:5000/users/")
            .then((res) => res.json())
            .then((data) => setuser(data));
    }, []);
    const handleSubmit = (e) => {
        const name = userNameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name: name, email: email };
        fetch("http://localhost:5000/users/", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((data) => {
                const addedUser = data;
                const newUser = [...users, addedUser];
                setuser(newUser);
            });
        userNameRef.current.value = "";
        emailRef.current.value = "";

        e.preventDefault();
    };
    return (
        <div className="App">
            <h1>HELLO FROM FRONT END </h1>

            <h3>Found {users.length} users</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={userNameRef} placeholder="Enter user" />
                <br />
                <input type="email" ref={emailRef} placeholder="Enter user" />
                <br />
                <input type="submit" value="Submit" />
            </form>

            <ul style={{ listStyle: "none" }}>
                {users.map((user) => (
                    <li key={user.id}> {user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
