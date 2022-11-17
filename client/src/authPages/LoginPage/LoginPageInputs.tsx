import React from "react";
import InputWithLabel from "shared/components/InputWithLabel";

type LoginPageInputsProps = {
  email: string;
  setMail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
};
const LoginPageInputs = ({
  email,
  setMail,
  password,
  setPassword,
}: LoginPageInputsProps) => {
  return (
    <>
      <InputWithLabel
        value={email}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
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

export default LoginPageInputs;
