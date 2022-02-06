import {
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import TodoItem from "./TodoItem";

export default function ItemList({
  fetchedData,
  datas,
  handleDelete,
  setAsDone,
}) {
  return (
    <List>
      {fetchedData ? (
        datas.length > 0 ? (
          datas.map((doc) => {
            return (
              <TodoItem
                key={doc.id}
                item={doc}
                handleDelete={handleDelete}
                handleClick={setAsDone}
              />
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="Non ci sono task da mostrare" />
          </ListItem>
        )
      ) : (
        <Box
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </List>
  );
}
