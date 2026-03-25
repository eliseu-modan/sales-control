/**
 *
 * Dashboard List Component
 *
 */
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Select, Space, Form, Button } from "antd";
import ChartPizza from "../charts/chartPizza/index.jsx";
import ChartThree from "../charts/chartLine/index.jsx";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { DatePicker } from "antd";
function dashboardList() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [dataChart, setDataChart] = useState([])

  const handleProductChange = (value) => {
    setSelectedProduct(value);
  };
  const service = useService();

  const onChange = (date, dateString) => {
    const filterDate = [dateString];
    setFilter(filterDate);
  };

  useEffect(() => {
    getDataDashboard();
    getProductsLists();
  }, []);
  useEffect(() => {
    if (selectedProduct && filter) {
      getDataDashboard();
    }
  }, [selectedProduct, filter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDate() {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }
  const getDataDashboard = async () => {
    try {
      const values = {
        product: selectedProduct,
        date: filter,
      };

      const { data } = await service.post(
        "/dashboard/auth/dashboardData",
        values
       );
       setDataChart(data)
      
    } catch (error) {
      console.error("Erro ao chamar API:", error);
    }
  };

  async function getProductsLists() {
    setLoading(true);
    try {
      const { data } = await service.get("/products/auth/getProductsLists");
      setDataProducts(data);
      console.log("data Products", data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <Form form={form} layout="vertical">
        <FormItem
          style={{
            position: "relative",
            top: "0px",
            width: "600px",
            left: "60px",
          }}
          name="name"
          label="Selecionar o Produto"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={handleProductChange} value={selectedProduct}>
            {dataProducts.map((Product) => (
              <Option
                key={Product.id}
                value={`${Product.name}-${Product.code}`}
              >
                {Product.name} - R${Product.price} - Código: {Product.code}
              </Option>
            ))}
          </Select>
        </FormItem>
        <Space
          direction="vertical"
          style={{
            position: "relative",
            width: 120,
            left: 670,
            top: -55,
          }}
        >
          <DatePicker onChange={onChange} picker="year" />
        </Space>
      </Form>

      <Card
        style={{
          position: "absolute",
          width: "750px",
          height: "400px",
          left: "80px",
          top: "12%",
          background: "white",
          borderColor: "BLACK",
        }}
      >
        <ChartThree dataChart={dataChart}></ChartThree>
      </Card>
     
      <Card
        style={{
          position: "absolute",
          width: "400px",
          height: "170px",
          left: "920px",
          top: "58%",
          background: "white",
          borderColor: "BLACK",
        }}
      >
        <div style={{ fontSize: "45px" }}>
          <b>{getCurrentDate()}</b>
          <p></p>
          <b>{getCurrentTime()}</b>
        </div>
      </Card>
     
      <Card
        style={{
          position: "absolute",
          width: "400px",
          height: "250px",
          left: "920px",
          top: "18px",
          background: "white",
          borderColor: "BLACK",
        }}
      >
        <ChartPizza dataChart={dataChart}></ChartPizza>
      </Card>
    </>
  );
}

export default dashboardList;
