import React, {useState} from "react";
import styled from "styled-components";
import {navbarHeight} from "../basic/Sizes.tsx";
import {blueColor} from "../basic/Colors.tsx";
import {Link} from "react-router-dom";


interface AuthPageProps {
    type: "login" | "register";
}

function AuthPage({type}: AuthPageProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [isPasswordRepeat, setIsPasswordRepeat] = useState<boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<boolean>(true);

    const validateUsername = (username: string): boolean => {
        return username.length >= 5;
    }

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateRepeatPassword = (): boolean => {
        return password === passwordRepeat;
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            return;
        }
        //Login Logic
        console.log("handleLogin");
    }

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateUsername(username)) {
            setIsValidUsername(false);
            return;
        }
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            return;
        }
        if (!validateRepeatPassword()) {
            setIsPasswordRepeat(false);
            return;
        }
        //Register Logic
        console.log("handleRegister");
    }

    return (
        <LoginFormContainer>
            <LoginText>{type === "login" ? "Login" : "Register"}</LoginText>
            <LoginForm onSubmit={type === "login" ? handleLogin : handleRegister}>
                {type === "register" && (
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIsValidUsername(true);
                            }}
                        />
                        {!isValidUsername && (
                            <ErrorMessage>Username is too short</ErrorMessage>
                        )}
                    </FormGroup>
                )}
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsValidEmail(true); // Reset validation when user types
                        }}
                    />
                    {!isValidEmail && (
                        <ErrorMessage>Invalid email format</ErrorMessage>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                {type === "register" && (
                    <FormGroup>
                        <Label>Password repeat:</Label>
                        <Input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => {
                                setPasswordRepeat(e.target.value);
                                setIsPasswordRepeat(true);
                            }}
                        />
                        {!isPasswordRepeat && (
                            <ErrorMessage>Passwords are now equal</ErrorMessage>
                        )}
                    </FormGroup>
                )}
                <RegisterLink to={type === "login" ? "/register" : "/login"}>
                    {type === "login"
                        ? "Don't have an account? Register now"
                        : "Already have an account? Login now"}
                </RegisterLink>
                <Button type="submit">{type === "login" ? "Login" : "Register"}</Button>
            </LoginForm>
        </LoginFormContainer>
    );
}

const LoginFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: calc(100vh - ${navbarHeight}px);
`;

const LoginText = styled.h1`
    margin-bottom: 20px;
`;

const LoginForm = styled.form`
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 5px;
`;

const RegisterLink = styled(Link)`
    font-size: 15px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${blueColor};
    margin-top: 5px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 3px;

    &:hover {
        background-color: #006dec;
        transition: 0.2s;
    }
`;

export default AuthPage