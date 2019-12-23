import React from "react";
import { Form } from "./style";
import Select from "./slcindustry";
import api from "../../service/api";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 980,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function ModalCreate() {
  let message = "";
  const [checked, setChecked] = React.useState(true);
  const [product, setProduct] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleChange = event => {
    setChecked(event.target.checked);
  };
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSaveProdutry() {
    const model = [
      {
        product: product,
        price: price,
        active: checked,
        industryId: localStorage.getItem("indutry"),
        amount: amount
      }
    ];

    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      "Content-Type": "text/json"
    };
    const response = await api.post("/Product/ProductCreate", model, config);
    const data = response.data;
    message = data.mensagem;

    if (data.sucesso) handleClose();
  }

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        style={{
          marginBottom: "20px",
          backgroundColor: "#009688",
          color: "#ffff"
        }}
      >
        Cadastrar novo produto
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
            Cadastro de novos produtos
          </h2>
          <p id="simple-modal-description" style={{ textAlign: "center" }}>
            Preenche os campos para cadastrar um produto novo
          </p>
          <Form>
            <TextField
              id="outlined-password-input"
              label="Produto"
              type="text"
              autoComplete="current-password"
              variant="outlined"
              style={{ width: "50%" }}
              onChange={event => setProduct(event.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Quantidade"
              type="number"
              autoComplete="current-password"
              variant="outlined"
              style={{ width: "20%" }}
              onChange={event => setAmount(event.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Preço"
              type="text"
              autoComplete="current-password"
              variant="outlined"
              style={{ width: "10%" }}
              onChange={event => setPrice(event.target.value)}
            />
            <Checkbox
              checked={checked}
              onChange={handleChange}
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Form>
          <Select />
          <Button
            type="button"
            onClick={() => handleSaveProdutry()}
            variant="contained"
            style={{
              marginTop: "20px",

              backgroundColor: "#009688",
              color: "#ffff"
            }}
          >
            Cadastrar novo produto
          </Button>
          <p id="simple-modal-description" style={{ textAlign: "center" }}>
            {message === "" ? "" : message}
          </p>
        </div>
      </Modal>
    </div>
  );
}
