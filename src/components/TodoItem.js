import { ListItem, ListItemText, ListItemButton } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const text = {
  color: "gray",
};

export default function TodoItem({ item, handleDelete, handleClick }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            handleDelete(item.id);
          }}
          style={{ color: "firebrick" }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={() => handleClick(item.id)}>
        <ListItemText
          primaryTypographyProps={
            item.data.done ? { style: text } : { style: { color: "black" } }
          }
          secondaryTypographyProps={
            item.data.done ? { style: text } : { style: { color: "black" } }
          }
          primary={item.data.title}
          secondary={item.data.description}
        />
      </ListItemButton>
    </ListItem>
  );
}
