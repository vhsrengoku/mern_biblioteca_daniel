import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import BookCard from "./BookCard";
import { useBooks } from "../lib/queries";
import BookCardSkeleton from "./BookCardSkeleton";

const BookGrid = () => {
  const { isLoading, isError, data } = useBooks();

  if (isError) {
    return (
      <Typography paragraph color="error">
        Ocorreu um erro ao carregar os livros
      </Typography>
    );
  }

  return (
    <Grid container spacing={5}>
      {isLoading ? (
        <BookCardSkeleton count={4} />
      ) : data.length ? (
        data.map((book) => <BookCard key={book._id} {...book} />)
      ) : (
        <Grid xs={12}>
          <Container maxWidth="sm" sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h4" component="h5">
              Nenhum livro cadastrado
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to={"/create-book"}
              sx={{ mt: 2 }}
            >
              Cadastrar livro
            </Button>
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

export default BookGrid;