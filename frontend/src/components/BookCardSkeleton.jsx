import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Paper, Skeleton } from "@mui/material";

const BookCardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={5}>
            <Skeleton variant="rectangular" width="100%" height={650} />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

BookCardSkeleton.propTypes = {
  count: PropTypes.number,
};

export default BookCardSkeleton;