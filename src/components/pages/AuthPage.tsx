import React, {useState} from "react";
import styled from "styled-components";
import {navbarHeight} from "../basic/Sizes.tsx";
import {blueColor} from "../basic/Colors.tsx";
import {Link} from "react-router-dom";
import {useMutation} from "react-query";

import {useDispatch, useSelector} from 'react-redux';
import { login } from '../../../redux/slices/authSlice.tsx';

interface AuthPageProps {
    type: "login" | "register";
}

type FormDataLogin = {
    email: string;
    password: string;
};

type FormDataRegister = {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
};

function AuthPage({type}: AuthPageProps) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userId = useSelector((state) => state.auth.userId);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [isPasswordRepeat, setIsPasswordRepeat] = useState<boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<boolean>(true);

    const [loginMessage, setLoginMessage] = useState<string>("");
    const [registerMessage, setRegisterMessage] = useState<string>("");


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

    const loginMutation = useMutation((formData: FormDataLogin) =>
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            res.json().then(data => {
                if (data.message == 'Authentication successful') {
                    const id = data.user_id;
                    dispatch(login({ userId: id }));
                }
                setLoginMessage(data.message)
            });
        }));


    const registrationMutation = useMutation((formData: FormDataRegister) =>
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json().then((data) => {
            setRegisterMessage(data.message);
        }))
    );

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            return;
        }
        if (isLoggedIn) {
            setLoginMessage("You are logged in!");
            return;
        }
        loginMutation.mutate({email, password});
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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
        try {
            await registrationMutation.mutateAsync({ username, email, password, passwordRepeat });
        } catch (error) {
            console.log(error);
        }
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
                {type === "register"
                    ?
                    <>
                        <Button type="submit" disabled={registrationMutation.isLoading}>
                            {registrationMutation.isLoading ? 'Register in...' : 'Register'}
                        </Button>
                        {registerMessage !== "User registered successfully"
                            ? <ErrorMessage>{registerMessage}</ErrorMessage>
                            : <SuccessMessage>{registerMessage}</SuccessMessage>
                        }
                    </>
                    :
                    <>
                        <Button type="submit" disabled={loginMutation.isLoading}>
                            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                        {loginMessage !== "Authentication successful"
                            ? <ErrorMessage>{loginMessage}</ErrorMessage>
                            : <SuccessMessage>{loginMessage}</SuccessMessage>
                        }
                    </>

                }
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

const SuccessMessage = styled.p`
    color: #029e02;
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