import React, { useEffect, useCallback } from "react";
import { selectToDo, fetchToDo, deleteToDo, selectedToDo } from "./ToDoSlice";
import { useSelector, useDispatch } from "react-redux";
import { Table, Popconfirm, Typography } from "antd";
import { getRequest, deleteRequest } from "../../api/ApiServices";
import styles from "./ToDoList.module.css";
const { Column } = Table;

export default function ToDoList() {
  const todoList = useSelector(selectToDo);
  const dispatch = useDispatch();
  const { Title } = Typography;

  const fetchToDoList = useCallback(async () => {
    try {
      const result = await getRequest("todo");
      if (result.data.length) {
        dispatch(fetchToDo(result.data));
      }
    } catch (error) {
      //Log errors
    }
  }, [dispatch]);

  useEffect(() => {
    fetchToDoList();
  }, [fetchToDoList]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteRequest("todo", id);
      if (result.status === 200) {
        dispatch(deleteToDo(id));
      }
    } catch (error) {
      //Log errors
    }
  };

  const handleUpdate = async (id) => {
    dispatch(selectedToDo(id));
  };

  return (
    <div>
      <Title level={3} underline>
        To Do List
      </Title>

      <Table dataSource={todoList}>
        <Column title="User Name" dataIndex="username" key="username" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column title="Hobby" dataIndex="hobby" key="hobby" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Task Name" dataIndex="taskname" key="taskname" />
        <Column title="Status" dataIndex="status" key="status" />
        <Column
          title="Action"
          key="action"
          render={(_, record) =>
            todoList.length >= 1 ? (
              <>
                <div>
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.id)}
                    className={[styles.pointer, styles.action].join(" ")}
                  >
                    Delete
                  </Popconfirm>
                </div>
                <Popconfirm
                  title="Sure to update?"
                  onConfirm={() => handleUpdate(record.id)}
                  className={[styles.pointer, styles.action].join(" ")}
                >
                  Update
                </Popconfirm>
              </>
            ) : null
          }
        />
      </Table>
    </div>
  );
}
