import { FC, useEffect } from "react";
import { config } from "../config/configuration";
import { useNavigate, useSearchParams } from "react-router";
import { useUser } from "../contexts/User.context";

export const AuthCallback: FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (code: string) => {
    // Fetch the JWT
    const loginResponse = await fetch(
      `${config.backendURL}/casdoor/signin?code=${code}`,
      {
        method: "POST",
      },
    );

    // Pull out the token
    const token = (await loginResponse.json()).token;

    // Handle login
    login(token);

    // Redirect to home page
    navigate("/home");
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleLogin(code);
    }
  }, [searchParams]);

  return <p>One moment please</p>;
};
