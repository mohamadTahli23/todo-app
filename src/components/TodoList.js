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
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import Todo from "../components/Todo";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitleInput("");
  }

  const todoJsx = todos.map((el) => {
    return <Todo key={el.id} todo={el}></Todo>;
  });
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2" fontWeight={"bold"}>
            مهامي
          </Typography>
          <Divider />
          {/* Filter Buttons */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            /*             value={alignment}
             */ exclusive
            /*             onChange={handleAlignment}
             */ aria-label="text alignment"
          >
            <ToggleButton value="right">غير المنجز</ToggleButton>
            <ToggleButton value="center">المنجز</ToggleButton>
            <ToggleButton value="left">الكل</ToggleButton>
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
              >
                إضافة
              </Button>
            </Grid>
          </Grid>

          {/*{/*===== Input + Add Button =====*/}
        </CardContent>
      </Card>
    </Container>
  );
}
