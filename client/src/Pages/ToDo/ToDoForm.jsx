import React, { useRef, useEffect } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  Radio,
  Slider,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
} from "antd";
import { addToDo, selectUpdateToDo, updateToDo } from "./ToDoSlice";
import { useDispatch, useSelector } from "react-redux";
import { postRequest, patchRequest } from "../../api/ApiServices";
const { Option } = Select;
const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ToDoForm() {
  const selectedToDo = useSelector(selectUpdateToDo);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedToDo) {
      formRef.current.setFieldsValue({
        username: selectedToDo.username,
        gender: selectedToDo.gender,
        hobby: selectedToDo.hobby,
        age: selectedToDo.age,
        taskname: selectedToDo.taskname,
        status: selectedToDo.status,
      });
    }
  }, [selectedToDo]);

  const onFinish = async (values) => {
    try {
      if (selectedToDo) {
        const data = { ...values, id: selectedToDo.id };
        const result = await patchRequest("todo", selectedToDo.id, values);
        if (result.data) {
          dispatch(updateToDo(data));
          formRef.current.resetFields();
        } else {
          return;
        }
      } else {
        const result = await postRequest("todo", values);
        if (result.data) {
          dispatch(addToDo(values));
          formRef.current.resetFields();
        } else {
          return;
        }
      }
    } catch (error) {
      //Log errors
    }
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={
        selectedToDo && {
          username: selectedToDo.username,
        }
      }
      ref={formRef}
    >
      <Title level={3} underline>
        To Do
      </Title>
      <Form.Item
        name="username"
        label="User Name"
        rules={[
          {
            required: true,
            message: "Please input your user name",
          },
        ]}
      >
        <Input
          placeholder="Please input your user name"
          value={selectedToDo ? selectedToDo.username : ""}
        />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select your gender",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="hobby"
        label="Hobby"
        rules={[
          {
            required: true,
            message: "Please input your selection",
          },
        ]}
      >
        <Checkbox.Group>
          <Row>
            <Col>
              <Checkbox
                value="Sports"
                style={{
                  lineHeight: "32px",
                }}
              >
                Sports
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Reading"
                style={{
                  lineHeight: "32px",
                }}
              >
                Reading
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Music"
                style={{
                  lineHeight: "32px",
                }}
              >
                Music
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            required: true,
            message: "Please input your age",
          },
        ]}
      >
        <Slider min={18} max={55} />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[
          {
            required: true,
            message: "Please select date",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="taskname"
        label="Task Name"
        rules={[
          {
            required: true,
            message: "Please input your task name",
          },
        ]}
      >
        <Input placeholder="Please input task name" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your status!",
          },
        ]}
      >
        <Select placeholder="Please select a status">
          <Option value="Active">Active</Option>
          <Option value="InActive">InActive</Option>
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          {selectedToDo ? "Update" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
