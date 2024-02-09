/* Material Ui */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";

/* Icons components */
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
/* ==== Icons components ==== */
/*// Material Ui //*/

import { useToast } from "../contexts/ToastContext";
import { useTodosdispatch } from "../contexts/todosContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const dispatch = useTodosdispatch();
  const { showHideToast } = useToast();

  /* Event Handler */
  function handelCheckClicked() {
    dispatch({ type: "toggledCompleted", payload: todo });
    showHideToast("تم التعديل بنجاح");
  }

  function handeleDeleteClick() {
    showDelete(todo);
  }

  function handelUpdateClick() {
    showUpdate(todo);
  }

  /* //Event Handler// */

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* Actions Button */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Icon Button */}
              <IconButton
                onClick={() => {
                  handelCheckClicked();
                }}
                className="iconButton"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "3px solid #8bc34a",
                }}
                aria-label="CheckIcon"
                classes={"size"}
              >
                <CheckIcon />
              </IconButton>
              {/* //Check Icon Button// */}

              {/* Update Button */}
              <IconButton
                onClick={handelUpdateClick}
                className="iconButton"
                style={{
                  background: "white",
                  color: "#1769aa",
                  border: "3px solid #1769aa",
                }}
                aria-label="CheckIcon"
                classes={"size"}
              >
                <ModeEditOutlineIcon />
              </IconButton>
              {/* //Update Button// */}

              {/* Delete Button */}
              <IconButton
                onClick={handeleDeleteClick}
                className="iconButton"
                style={{
                  background: "white",
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                }}
                aria-label="CheckIcon"
                classes={"size"}
              >
                <DeleteIcon />
              </IconButton>
              {/* //Delete Button// */}
            </Grid>
            {/*==== Actions Button ===*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
