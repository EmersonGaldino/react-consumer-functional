import React, { useState } from "react";
import "./styles.css";
import api from "../../service/api";

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

// import { Container } from './styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));
export default function Login({ history }) {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState([]);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  async function clickLogin(event) {
    event.preventDefault();

    if (login === "") {
      console.log("login vazio");
      return false;
    }
    const response = await api.post("/Authentication/SigIn", {
      login: login,
      password: password
    });
    const data = response.data;

    if (response.statu === 401) setMessage("Erro ao tentar logar.");
    setAuth(data.sucesso);
    if (data.sucesso) {
      history.push("/home");
      localStorage.setItem("token", data.objetoDeRetorno.token);
      localStorage.setItem("userName", data.objetoDeRetorno.nome);
    } else setMessage("Erro ao tentar logar.");
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={clickLogin}>
            <span className="login100-form-title p-b-26">API-Funcional</span>
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
            </span>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="email"
                value={login}
                onChange={event => setLogin(event.target.value)}
              />
              <span
                className="focus-input100"
                data-placeholder="Usuário"
              ></span>
              <LinearProgress color="secondary" />
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input
                className="input100"
                type="password"
                name="pass"
                onChange={event => setPassword(event.target.value)}
              />
              <span className="focus-input100" data-placeholder="Senha"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="text-center p-t-115">
                <span className="txt1">{message != "" ? message : ""}</span>
              </div>
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>

            <div className="text-center p-t-115">
              <span className="txt1">Não tem login? </span>
              <a className="txt2">Crie uma conta</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
