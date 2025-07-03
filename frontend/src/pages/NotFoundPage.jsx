import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mt: 8, textAlign: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        404 - Página não encotrada
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A página que você está procurando não existe.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Voltar para a página inicial
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;