import React, { useEffect, useState } from "react";
import api from "../../service/api";
import "./style.css";
// import { Container } from './styles';

export default function Cards() {
  const [industry, setIndustry] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  async function HandleIndutry() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };
    const response = await api.get("/Industry/AllIndustry", config);
    const data = response.data.objetoDeRetorno;
    setIndustry(data);
  }
  async function HandleUsers() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };
    const response = await api.get("/Industry/AllUsers", config);
    const data = response.data.objetoDeRetorno;
    setUsers(data);
  }

  async function handleProducts() {
    let config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };
    const response = await api.get("/Product/AllProducts", config);
    const data = response.data.objetoDeRetorno;
    setProducts(data);
  }

  return (
    <>
      <div class="container-cards">
        <div class="card" onMouseOver={() => HandleIndutry()}>
          <h3 class="title">Industrias cadastradas</h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>
          <div class="circle">
            <h1>{industry.length}</h1>
          </div>
        </div>

        <div class="card" onMouseOver={() => handleProducts()}>
          <h3 class="title">Produtos cadastradas</h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>
          <div class="circle">
            <h1>{products.length}</h1>
          </div>
        </div>

        <div class="card">
          <h3 class="title">Usuarios cadastradas</h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
          </div>
          <div class="circle">
            <h1>150</h1>
          </div>
        </div>
      </div>
    </>
  );
}
