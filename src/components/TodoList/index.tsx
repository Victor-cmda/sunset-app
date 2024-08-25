import React from "react";
import TodoItem from "../TodoItem";

interface TodoListProps {
  items: {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
  }[];
  onToggleComplete: (id: number) => void;
  onToggleImportant: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  items,
  onToggleComplete,
  onToggleImportant,
}) => {
  return (
    <div>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          important={item.important}
          onToggleComplete={() => onToggleComplete(item.id)}
          onToggleImportant={() => onToggleImportant(item.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
