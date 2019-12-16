import React from "react";
import api from "../../service/api";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 200
  }
}));

export default function RadioButtonsGroup() {
  const [industry, setIndustry] = React.useState([]);
  async function HandleProducts() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };
    const response = await api.get("/Industry/AllIndustry", config);
    const data = response.data.objetoDeRetorno;
    setIndustry(data);
  }

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    HandleProducts();
    localStorage.setItem("indutry", event.target.value);
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    HandleProducts();
  }, []);
  return (
    <div>
      <div>
        <Button className={classes.button} onClick={handleOpen}>
          Abra para selecionar
        </Button>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Industrias
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Selecione...</em>
            </MenuItem>
            {industry.map(indy => (
              <MenuItem
                key={indy.id}
                value={indy.id}
                onChange={event => setIndustry(event.target.value)}
              >
                {indy.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
