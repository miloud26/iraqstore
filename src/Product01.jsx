import { Box } from "@mui/material";

import Form from "./components/Form";
import { data } from "./data";

function Product01() {
  const id = "l-2";
  const { descImag } = data.filter((item) => item?.id === id)[0];

  return (
    <Box>
      <Box
        padding={"12px 250px"}
        justifyContent={"space-between"}
        alignItems={"start"}
        flexWrap={"wrap-reverse"}
        sx={{
          "@media(max-width:1600px)": {
            padding: "12px 180px",
          },
          "@media(max-width:1300px)": {
            padding: "12px 120px",
          },
          "@media(max-width:1100px)": {
            padding: "10px 80px",
          },
          "@media(max-width:900px)": {
            padding: "5px 5px",
          },
        }}
      >
        <Box
          sx={{
            width: "49%",
            padding: "0px",
            backgroundColor: "#eee",
            borderRadius: "12px",
            "@media(max-width:900px)": {
              width: "100%",
            },
          }}
        >
          <Box>
            <Box width={"100%"}>
              <img
                src={descImag}
                alt=""
                style={{
                  margin: "2px 0",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box padding="0px 5px 2px">
        <Form id={id} />
      </Box>
    </Box>
  );
}

export default Product01;
