import { useState } from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import PropTypes from "prop-types";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditBookDialog from "./EditBookDialog";
import { useDeleteBook, useUpdateBook } from "../lib/mutations";
import { useSnackbarContext } from "../hooks/useSnackbarContext";

const BookCard = ({ _id: id, title, subtitle, author, genre, cover }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const bookUpdateMutation = useUpdateBook(id);
  const bookDeleteMutation = useDeleteBook(id);
  const { showSnackbar } = useSnackbarContext();

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSaveBook = async (data) => {
    try {
      await bookUpdateMutation.mutateAsync(data);
      showSnackbar("Livro atualizado com sucesso", "success");
    } catch (error) {
      console.error("Error updating book: ", error);
      showSnackbar("Erro ao atualizar o livro", "error");
    }
    handleEditDialogClose();
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setIsDeleting(false);
  };

  const handleDeleteBook = async () => {
    try {
      setIsDeleting(true);
      await bookDeleteMutation.mutateAsync(id);
      showSnackbar("Livro deletado com sucesso", "success");
    } catch (error) {
      console.error("Error deleting book: ", error);
      showSnackbar("Erro ao deletar o livro", "error");
    }
    handleDeleteDialogClose();
  };

  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={5}>
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            img: {
              width: "100%",
              objectFit: "cover",
              aspectRatio: "9/16",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <img src={cover} alt={`Capa do livro ${title} (${id})`} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="h3" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" component="h4" noWrap>
            {subtitle ? subtitle : "\u00A0"}
          </Typography>
          <Typography variant="body2" component="p" noWrap>
            {author}
          </Typography>
          <Typography variant="body2" component="p" noWrap>
            {genre}
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={handleEditDialogOpen}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton onClick={handleDeleteDialogOpen}>
            <DeleteTwoToneIcon />
          </IconButton>
        </Stack>
      </Paper>
      <EditBookDialog
        book={{ id, title, subtitle, author, genre, cover }}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        onSave={handleEditSaveBook}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onDelete={handleDeleteBook}
        isDeleting={isDeleting}
      />
    </Grid>
  );
};

BookCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default BookCard;