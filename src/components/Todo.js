/* Material Ui */
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

/* Icons components */
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
/* ==== Icons components ==== */
/*// Material Ui //*/

/* Dialog Import */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function Todo({ todo }) {
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  /* Event Handler */
  function handelCheckClicked() {
    const updatedTodos = todos.map((el) => {
      if (el.id == todo.id) {
        el.isCompleted = !el.isCompleted;
      }
      return el;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handeleDeleteClick() {
    setshowDeleteDialog(true);
  }

  function handelUpdateClick() {
    setshowUpdateDialog(true);
  }

  function handelDeleteClose() {
    setshowDeleteDialog(false);
  }

  function handelUpdateClose() {
    setshowUpdateDialog(false);
  }

  function handeleDeleteCofirem() {
    const updatedTodos = todos.filter((el) => {
      return el.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handeleUpdateCofirem() {
    const updatedTodos = todos.map((el) => {
      if (el.id == todo.id) {
        return {
          ...el,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else {
        return el;
      }
    });

    setTodos(updatedTodos);
    setshowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  /* //Event Handler// */

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeleteClose}>إغلاق</Button>
          <Button autoFocus on onClick={handeleDeleteCofirem}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/*// Delete Dialog //*/}

      {/* Update Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateClose}>إغلاق</Button>
          <Button autoFocus on onClick={handeleUpdateCofirem}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/*// Update Dialog //*/}

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
