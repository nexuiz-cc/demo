import "./styles.css";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import Column, { ColumnType } from "./Column";
import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import "./task.css";
import axios from "axios";

export default function TaskList() {
  let uuId = uuidv4();
  let data: ColumnType[] = [
    {
      id: "todo",
      title: "TODO",
      cards: [
        {
          id: "a",
          title: "title 1",
          content: "todo",
        },
      ],
    },
    {
      id: "doing",
      title: "DOING",
      cards: [
        {
          id: "b",
          title: "title 2",
          content: "doing",
        },
      ],
    },
    {
      id: "3",
      title: "DONE",
      cards: [],
    },
  ];
  const [columns, setColumns] = useState<ColumnType[]>(data);

  const [dragBefore, setDragBefore] = useState("");
  const [dragAfter, setDragAfter] = useState("");
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragStart = (event: DragOverEvent) => {
    setDragBefore(event.active.data.current?.sortable.containerId);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDragAfter(event.active.data.current?.sortable.containerId);

    if (event) {
      setDragAfter(event.active.data.current!.sortable.containerId);
    }

    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    console.log("overColumn:", overColumn);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }

    if (dragBefore === "todo") {
      const filteredData = data.filter((item) => item.id === "todo");
      let temp = filteredData[0].cards.filter((card) => card.id !== activeId);
      data[0].cards = temp;
    } else if (dragBefore === "doing") {
      const filteredData = data.filter((item) => item.id === "doing");
      let temp = filteredData[0].cards.filter((card) => card.id !== activeId);
      data[0].cards = temp;
    } else if (dragBefore === "done") {
      const filteredData = data.filter((item) => item.id === "done");
      let temp = filteredData[0].cards.filter((card) => card.id !== activeId);
      data[0].cards = temp;
    }

    if (overColumn.id === "todo") {
      data[0].cards = activeColumn.cards;
    } else if (overColumn.id === "doing") {
      data[1].cards = activeColumn.cards;
    } else if (overColumn.id === "done") {
      data[2].cards = activeColumn.cards;
    }
    console.log("data:", data);
    axios.put("http://localhost:8082/tasks", {id:1,data:data}).then((response) => {
      console.log(response);
    })
      
      
  };

  // const handleDragMove = (event: DragEndEvent) => {
  //   console.log("handleDragMove:", event);
  // };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const newTask = () => {
    setOpen(true);
  };
  return (
    // 今回は長くなってしまうためsensors、collisionDetectionなどに関しての説明は省きます。
    // ひとまずは一番使われていそうなものを置いています。
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "15px",
          justifyContent: "center",
        }}
      >
        {theme.palette.mode === "light" ? (
          <Button
            variant="contained"
            onClick={newTask}
            className="newBtn"
            sx={{ backgroundColor: "#3B44F6", color: "#fff", display: "block" }}
          >
            New Task
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={newTask}
            className="newBtn"
            sx={{ backgroundColor: "#2D3250" }}
          >
            New Task
          </Button>
        )}
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              console.log(formJson);
              columns[0].cards.push({
                id: uuId,
                title: formJson.title,
                content: formJson.content,
              });
              setColumns(columns);
              handleClose();
            },
          }}
        >
          <DialogTitle>Create a new task...</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Task Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="content"
              name="content"
              label="Task Content"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>

          {theme.palette.mode === "light" ? (
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#3B44F6",
                  color: "#fff",
                  display: "block",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#3B44F6",
                  color: "#fff",
                  display: "block",
                }}
              >
                Subscribe
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{ backgroundColor: "#2D3250" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#2D3250" }}
              >
                Subscribe
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </div>
    </DndContext>
  );
}
