import React from "react";
import InputWithLabel from "shared/components/InputWithLabel";

type RegisterPageInputsProps = {
  email: string;
  setMail: (val: string) => void;
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
};

const RegisterPageInputs = ({
  email,
  setMail,
  username,
  setUsername,
  password,
  setPassword,
}: RegisterPageInputsProps) => {
  return (
    <>
      <InputWithLabel
        value={email}
        setValue={setMail}
        label="E-mail address"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter a username"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default RegisterPageInputs;
