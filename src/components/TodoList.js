/* Material Ui */
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

/*// Material Ui //*/

/* Dialog Import */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
/*=== Dialog Import ===*/

import { useState, useEffect, useMemo, useReducer } from "react";
import { useTodos, useTodosdispatch } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";
import Todo from "../components/Todo";
import { v4 as uuidv4 } from "uuid";
import todosReducer from "../reducers/todosReducer.js";

export default function TodoList() {
  const { showHideToast } = useToast();

  const todos = useTodos();
  const dispatch = useTodosdispatch();

  const [titleInput, setTitleInput] = useState("");
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);

  const [dialogTodo, setDialogTodo] = useState([]);
  const [displayedTodosType, setdisplayedTodosType] = useState("all");

  // Filtration Array
  const completedTodos = useMemo(() => {
    return todos.filter((el) => {
      return el.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodos = useMemo(() => {
    return todos.filter((el) => {
      return !el.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // === Filtration Array === //

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  // Change Between Tags All - completed - non completed
  function changeDisplayedType(e) {
    setdisplayedTodosType(e.target.value);
  }

  /* Events Handler */

  function handelAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("تمت الإضافة بنجاح ");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setshowDeleteDialog(true);
  }

  function handelDeleteClose() {
    setshowDeleteDialog(false);
  }

  function handeleDeleteCofirem() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setshowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setshowUpdateDialog(true);
  }

  function handelUpdateClose() {
    setshowUpdateDialog(false);
  }

  function handeleUpdateCofirem() {
    dispatch({ type: "updated", payload: dialogTodo });
    setshowUpdateDialog(false);
    showHideToast("تم التحديث بنجاح");
  }

  const todoJsx = todosToBeRendered.map((el) => {
    return (
      <Todo
        key={el.id}
        todo={el}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      ></Todo>
    );
  });

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
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
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
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
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

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 250 }}
          style={{ maxHeight: "80vh", overflowY: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2" fontWeight={"bold"}>
              مهامي
            </Typography>
            <Divider />
            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*====== Filter Buttons =====*/}

            {/* All Todo */}
            {todoJsx}

            {/*===== All Todo =======*/}

            {/* Input + Add Button */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid xs={8}>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handelAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>

            {/*{/*===== Input + Add Button =====*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
