import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleTask, deleteTask, updateTaskOrder } from './TaskSlice';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
  
    const reorderedTasks = Array.from(tasks);
    const [movedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedItem);
  
    dispatch(updateTaskOrder(reorderedTasks));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={task.completed ? "completed" : ""}
                  >
                    <span onClick={() => dispatch(toggleTask(task.id))}>
                      {task.text}
                    </span>
                    <button onClick={() => dispatch(deleteTask(task.id))}>
                      ❌
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
