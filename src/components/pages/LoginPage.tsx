import {useState} from "react";
import {Form} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = () => {
        if (validateEmail(email)) {
            // Email is valid, proceed with login
            console.log("Email:", email);
            console.log("Password:", password);
        } else {
            // Email is invalid, show error message
            setValidEmail(false);
        }
    };

    return (
        <Form>
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </Form>
    );
}

export default LoginPage