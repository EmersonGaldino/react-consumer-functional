import React, { useState, useEffect } from "react";
import api from "../../service/api";
import Modal from "./modal";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Container, Access } from "./style";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default function Home({ history }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState([]);

  const classes = useStyles();

  async function handleProducts() {
    setUserName(localStorage.getItem("userName"));
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };
    const response = await api.get("/Product/AllProducts", config);
    const data = response.data.objetoDeRetorno;

    setMessage(response.data.mensagem);
    setProducts(data);
  }
  useEffect(() => {
    handleProducts();
  }, []);

  function handleLogOut() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <>
      <Container>
        <Access>
          <Button
            onClick={() => handleProducts()}
            variant="contained"
            style={{
              marginBottom: "20px",
              backgroundColor: "#a64bf4",
              color: "#ffff"
            }}
          >
            Buscar Produtos
          </Button>
          <p>{userName}</p>
          <Modal />
          <Button
            onClick={() => handleLogOut()}
            variant="contained"
            style={{
              marginBottom: "20px",
              backgroundColor: "red",
              color: "#ffff"
            }}
          >
            Sair
          </Button>
        </Access>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  {message}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Produto</TableCell>
                <TableCell align="left">Preço</TableCell>
                <TableCell align="left">Estoque</TableCell>
                <TableCell align="left">Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(row => (
                <TableRow key={row.product_id}>
                  <TableCell component="th" scope="row">
                    {row.product_id}
                  </TableCell>
                  <TableCell scope="row">{row.product}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">
                    {row.active ? "Disponivel" : "Indisponivel"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}
