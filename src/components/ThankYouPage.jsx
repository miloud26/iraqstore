import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ThankYouPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2ff, #ffffff)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: "520px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "40px 30px",
          textAlign: "center",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: "90px",
            color: "#16a34a",
            marginBottom: "20px",
          }}
        />

        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          تم استلام طلبك بنجاح
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "25px",
            lineHeight: 1.7,
          }}
        >
          شكرًا لثقتك بنا. سيتم الاتصال بك قريبًا لتأكيد الطلب والتوصيل.
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f1f5f9",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "25px",
          }}
        >
          <Typography sx={{ fontSize: "15px", color: "#333" }}>
            ⏱️ مدة الاتصال: خلال 24 ساعة
          </Typography>
          <Typography sx={{ fontSize: "15px", color: "#333" }}>
            🚚 الدفع عند الاستلام
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: "14px",
            fontSize: "16px",
            fontWeight: 700,
            borderRadius: "14px",
            backgroundColor: "#0f172a",
            "&:hover": {
              backgroundColor: "#020617",
            },
          }}
          onClick={() => {
            const baseURL = localStorage.getItem("baseURL");
            const isMakeOrder = JSON.parse(localStorage.getItem("makeOrder"));
            if (baseURL || isMakeOrder?.value === 1) {
              window.location.href = "/products/thankyou";
            } else {
              window.location.href = baseURL;
            }
          }}
        >
          العودة للصفحة الرئيسية
        </Button>
      </Box>
    </Box>
  );
}
