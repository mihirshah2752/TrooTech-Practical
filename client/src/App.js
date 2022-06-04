import React from "react";
import { Row, Col } from "antd";
import ToDoForm from "./Pages/ToDo/ToDoForm";
import ToDoList from "./Pages/ToDo/ToDoList";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Row>
        <Col flex={2}>
          <ToDoForm />
        </Col>
        <Col flex={3}>
          <ToDoList />
        </Col>
      </Row>
    </div>
  );
}

export default App;
