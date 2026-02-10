import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { data } from "../data.js";

const wilayaCommuneInfo = [
  { id: 1, name: "بغداد" },
  { id: 2, name: "البصرة" },
  { id: 3, name: "نينوى (الموصل)" },
  { id: 4, name: "الأنبار" },
  { id: 5, name: "صلاح الدين" },
  { id: 6, name: "ديالى" },
  { id: 7, name: "كركوك" },
  { id: 8, name: "بابل" },
  { id: 9, name: "كربلاء" },
  { id: 10, name: "النجف" },
  { id: 11, name: "واسط" },
  { id: 12, name: "القادسية (الديوانية)" },
  { id: 13, name: "المثنى" },
  { id: 14, name: "ذي قار" },
  { id: 15, name: "ميسان" },
  { id: 16, name: "أربيل" },
  { id: 17, name: "السليمانية" },
  { id: 18, name: "دهوك" },
];

const wilayaInfo = wilayaCommuneInfo.map((item) => {
  const { id, name } = item;
  return { id, name };
});

export default function Form({ id }) {
  const [btnDisebled, setBtnDisebled] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("0777548798");
  const [wilaya, setWilaya] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [modelColr, setModelColr] = useState("");
  const [modelSize, setModelSize] = useState("");
  const [correctNumber, setCorrectNumber] = useState(false);
  const phoneInput = useRef(null);

  const { price, nameProdcut, delevery, size, clr } = data.filter(
    (item) => item.id === id,
  )[0];

  const handleModel = (e) => {
    e.target.classList.toggle("valid");
  };
  const isMakeOrder = JSON.parse(localStorage.getItem("makeOrder"));

  useEffect(() => {
    if (!isMakeOrder) return;

    const now = Date.now();

    if (isMakeOrder.expire < now) {
      localStorage.removeItem("makeOrder");
      return; // ⛔ امنع التحويل
    }

    if (isMakeOrder.value === 1) {
      window.location.pathname = "/products/thankyou";
    }
  }, [isMakeOrder]);

  useEffect(() => {
    const regex = /^(0?7\d{8})$/;
    if (!regex.test(phone.slice(1))) {
      setCorrectNumber(true);

      setBtnDisebled(true);
      document.querySelector('input[placeholder="رقم الهاتف"]').focus();
    } else {
      setBtnDisebled(false);
      setCorrectNumber(false);
    }
  }, [phone]);
  useEffect(() => {
    setBtnDisebled(true);
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    setBtnDisebled(true);

    try {
      const data = new FormData();
      data.append(
        "date",
        `${new Date().getDate()}/${
          new Date().getMonth() + 1
        } - ${new Date().getHours()}H : ${new Date().getMinutes()}M`,
      );
      data.append("product", nameProdcut);
      data.append("name", name);
      data.append("phone", `${phone}`);
      data.append("wilaya", wilaya);
      data.append("quantity", quantity.toString());
      data.append("model", `${modelColr} / ${modelSize}`);
      data.append("prix", `${price}`);

      await fetch(
        "https://script.google.com/macros/s/AKfycbz82sqnVLddNJrx3W3LNbBwKwtKTCVboNFXnpAxFEIf7MMZHlQfDy6LMAU-BKOvEjfdIA/exec",
        {
          method: "POST",
          body: data,
        },
      );

      setBtnDisebled(false);

      localStorage.setItem(
        "makeOrder",
        JSON.stringify({
          value: 1,
          expire: new Date().getTime() + 15 * 60 * 60 * 1000,
        }),
      );
      setTimeout(() => {
        window.location.pathname = "/products/thankyou";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(window.location.href[window.location.href.length - 1]);

  localStorage.setItem("baseURL", window.location.pathname);

  return (
    <Box>
      <form
        style={{
          border: "3px rgba(107, 107, 224, 0.623) solid",
          borderRadius: "8px",
          padding: "7px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        onSubmit={handleSubmitOrder}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            required
            sx={{
              width: "49%",
              marginBottom: "10px",
              "@media(max-width:700px)": {
                width: "100%",
              },
            }}
            placeholder={"الاسم الكامل"}
            label={"الاسم الكامل"}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            ref={phoneInput}
            required
            type="number"
            sx={{
              width: "49%",
              marginBottom: "10px",
              "@media(max-width:700px)": {
                width: "100%",
              },
            }}
            placeholder={"رقم الهاتف"}
            label={"رقم الهاتف"}
            onChange={(e) => setPhone(e.target.value)}
          />
          {correctNumber ? (
            <Typography
              sx={{
                marginTop: "-10px",
                textAlign: "center",
                width: "60%",
                color: "red",
                marginBottom: "15px",
              }}
            >
              أدخل رقم هاتف صحيح{" "}
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel>{"الولاية"}</InputLabel>
            <Select
              sx={{ direction: "ltr" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={wilaya}
              label="Wilaya"
              onChange={(e) => setWilaya(e.target.value)}
            >
              {wilayaInfo.slice(1).map((item, index) => {
                return (
                  <MenuItem
                    required
                    sx={{ direction: "ltr" }}
                    key={index}
                    value={item.name}
                  >
                    {item.id} - {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TextField
              required
              sx={{
                width: "100%",
                marginBottom: "10px",
                "@media(max-width:700px)": {
                  width: "100%",
                },
              }}
              placeholder={"العنوان التفصيلي"}
              label={"العنوان التفصيلي"}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            padding: "15px",
            marginTop: "12px",
            marginBottom: "12px",
            width: "100%",
            backgroundColor: "#dbeafe",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              direction: "rtl",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {"سعر المنتج"}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {price} د.ع
            </Typography>
          </Box>
          <Box
            sx={{
              direction: "rtl",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {"الكمية"}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {quantity}
            </Typography>
          </Box>
          <Box
            sx={{
              direction: "rtl",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {"سعر التوصيل"}
            </Typography>
            <Typography
              id="priceDelevery"
              sx={{ fontWeight: "bold", fontSize: "22px" }}
            >
              {`${delevery} د.ع`}
            </Typography>
          </Box>
          <Box
            sx={{
              direction: "rtl",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {"المجموع"}
            </Typography>
            <Typography
              id="total"
              sx={{ fontWeight: "bold", fontSize: "22px" }}
            >
              {`${quantity * price + delevery} د.ع`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, max-content)",
            gap: "6px",
            justifyContent: "center", // توسيط الصفوف في الوسط
          }}
        >
          {clr.map((item, i) => (
            <Box
              key={i}
              onClick={(e) => {
                handleModel(e);
                setModelColr(item);
              }}
              sx={{
                height: "40px",
                border: "1px solid red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                padding: "6px 14px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, max-content)",
            gap: "4px",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          {size.map((item, i) => (
            <Box
              key={i}
              onClick={(e) => {
                handleModel(e);
                setModelSize(item);
              }}
              sx={{
                height: "44px",
                border: "1px solid red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                padding: "4px 10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            disabled={btnDisebled === true ? true : false}
            sx={{
              fontWeight: "bold",
              width: "55%",
              margin: "8px 2px",
              color: "#000",
              backgroundColor: "#dbeafe",
              "&:hover": {
                backgroundColor: "#dbeafe",
              },
            }}
            variant="contained"
            type="submit"
          >
            {"اشتري الان"}
          </Button>
          <Box
            sx={{
              width: "45%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "15px ",
              padding: "15px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: "#000",
                backgroundColor: "#dbeafe",
                "&:hover": {
                  backgroundColor: "#dbeafe",
                },
                marginTop: "0px",
                padding: "8px 15px",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold" }}
                onClick={() => setQuantity(+quantity + 1)}
              >
                +
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>{quantity}</Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                onClick={() => {
                  if (quantity === 1) {
                    setQuantity(quantity);
                  } else {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
