import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Stack,
    TextField,
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  
  import { useCreateBook } from "../lib/mutations";
  import { useSnackbarContext } from "../hooks/useSnackbarContext";
  
  const CreateBookPage = () => {
    const navigate = useNavigate();
    const { mutateAsync } = useCreateBook();
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm();
    const { showSnackbar } = useSnackbarContext();
  
    const onSubmit = async (data) => {
      try {
        await mutateAsync(data);
        showSnackbar("Livro cadastrado com sucesso", "success");
      } catch (error) {
        console.error("Error saving book: ", error);
        showSnackbar("Erro ao cadastrar o livro", "error");
      }
      reset();
      navigate("/");
    };
  
    return (
      <Card sx={{ p: 2, my: 5 }}>
        <CardHeader title="Cadastrar novo livro" />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Stack
              spacing={2}
              direction={{
                sm: "column",
                md: "row",
              }}
            >
              <TextField
                label="Título"
                fullWidth
                margin="normal"
                {...register("title", {
                  required: "Campo obrigatório",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={isSubmitting}
              />
              <TextField
                label="SubTítulo"
                fullWidth
                margin="normal"
                {...register("subtitle", {
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                })}
                error={!!errors.subtitle}
                helperText={errors.subtitle?.message}
                disabled={isSubmitting}
              />
            </Stack>
            <Stack
              marginTop={{ sm: 2 }}
              spacing={2}
              direction={{
                sm: "column",
                md: "row",
              }}
            ></Stack>
            <Stack
              mt={2}
              spacing={2}
              direction={{
                sm: "column",
                md: "row",
              }}
            >
              <TextField
                label="Autor"
                fullWidth
                margin="normal"
                {...register("author", {
                  required: "Campo obrigatório",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                })}
                error={!!errors.author}
                helperText={errors.author?.message}
                disabled={isSubmitting}
              />
              <TextField
                label="Gênero"
                fullWidth
                margin="normal"
                {...register("genre", {
                  required: "Campo obrigatório",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                })}
                error={!!errors.genre}
                helperText={errors.genre?.message}
                disabled={isSubmitting}
              />
            </Stack>
            <TextField
              label="Imagem da Capa"
              fullWidth
              margin="normal"
              {...register("cover", {
                required: "Campo obrigatório",
                pattern: {
                  value:
                    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|tiff))(?:\?.*)?$/i,
                  message: "URL da imagem inválida",
                },
              })}
              error={!!errors.cover}
              helperText={errors.cover?.message}
              disabled={isSubmitting}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  };
  
  export default CreateBookPage;