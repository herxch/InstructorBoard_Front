import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Countdown from "./components/Countdown";
import TimerButton from "./components/TimerButton";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [studentIsLoggedIn, setStudentIsLoggedIn] = useState(false);
  const [instructorIsLoggedIn, setInstructorIsLoggedIn] = useState(false);
  const [connectedStudents, setConnectedStudents] = useState([]);
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const nameInputRef = useRef();
  const answerInputRef = useRef();
  const buttonRef = useRef();
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === 1 && buttonRef.current) {
        buttonRef.current.click();
      }
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevCounter - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setStudentIsLoggedIn(false);
      setInstructorIsLoggedIn(false);
      setEnteredAnswer("");
      setAnswers([]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const joinStudentHandler = (e) => {
    e.preventDefault();
    const enteredNameValue = nameInputRef.current.value;
    if (enteredNameValue.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredName(enteredNameValue);
    setEnteredNameIsValid(true);
    setStudentIsLoggedIn(true);
    socket.emit("join student", enteredNameValue);
    nameInputRef.current.value = "";
  };

  const joinInstructorHandler = (e) => {
    e.preventDefault();
    const enteredNameValue = nameInputRef.current.value;
    if (enteredNameValue.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredName(enteredNameValue);
    setEnteredNameIsValid(true);
    setInstructorIsLoggedIn(true);
    socket.emit("join instructor");
  };

  const sendAnswerHandler = (e) => {
    e.preventDefault();
    const enteredAnswerValue = answerInputRef.current.value;
    if (enteredAnswerValue.trim() === "") {
      return;
    }
    const payload = {
      name: enteredName,
      answer: enteredAnswerValue,
    };
    setEnteredAnswer(enteredAnswerValue);
    socket.emit("send answer", payload);
    answerInputRef.current.value = "";
  };

  const sendQuestionHandler = (e) => {
    e.preventDefault();
    const enteredQuestionValue = answerInputRef.current.value;
    if (enteredQuestionValue.trim() === "") {
      return;
    }
    const payload = {
      name: enteredName,
      question: enteredQuestionValue,
    };
    socket.emit("send question", payload);
    answerInputRef.current.value = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  socket.on("new user", (users) => {
    setConnectedStudents(users);
  });

  socket.on("new answer", (answers) => {
    setAnswers(answers);
  });

  const onTimerClickHandler = (e) => {
    e.preventDefault();
    socket.emit("set timer", +e.target.innerText);
  };

  const onClearClickHandler = (e) => {
    e.preventDefault();
    setAnswers([]);
  };

  const onKeyDownHandler = (e) => {
    const { value } = e.target;
    if (e.key === "Tab") {
      // Prevent the default action to not lose focus when tab
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const cursorEndPosition = e.target.selectionEnd;
      const tab = "\t";

      e.target.value =
        value.substring(0, cursorPosition) +
        tab +
        value.substring(cursorEndPosition);

      // if you modify the value programmatically, the cursor is moved
      // to the end of the value, we need to reset it to the correct
      // position again
      e.target.selectionStart = cursorPosition + 1;
      e.target.selectionEnd = cursorPosition + 1;
    }
  };

  socket.on("start timer", (timer) => {
    setCounter(timer);
  });

  socket.on("new question", (question) => {
    setQuestion(question);
  });

  const connectionStatus = isConnected ? "connected" : "disconnected";

  return (
    <Stack gap={2} className="col-md-5 mx-auto px-5 mt-5">
      {!studentIsLoggedIn && !instructorIsLoggedIn && (
        <Form onSubmit={submitHandler}>
          <FloatingLabel
            controlId="floatingInput"
            label="Your Name"
            className="mb-3"
          >
            <Form.Control ref={nameInputRef} type="text" />
            {!enteredNameIsValid && (
              <Form.Text className="text-danger" id="nameValidation">
                Name must not be empty.
              </Form.Text>
            )}
          </FloatingLabel>
          <Row>
            <Col>
              <div className="d-grid gap-2">
                <Button onClick={joinStudentHandler} variant="outline-primary">
                  Student
                </Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  onClick={joinInstructorHandler}
                  variant="outline-primary"
                >
                  Instructor
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
      {studentIsLoggedIn && (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Label>{`Student: ${enteredName}, you are ${connectionStatus}!`}</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder={question}
                //aria-label='answer-input'
                //aria-describedby='basic-addon2'
                as="textarea"
                rows={5}
                //ref={answerInputRef}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter Your Answer..."
                aria-label="answer-input"
                aria-describedby="basic-addon2"
                as="textarea"
                rows={5}
                ref={answerInputRef}
                onKeyDown={onKeyDownHandler}
              />

              <Button
                ref={buttonRef}
                onClick={sendAnswerHandler}
                variant="outline-primary"
                id="button-addon2"
                disabled={!counter}
              >
                Submit
              </Button>
            </InputGroup>
            {counter !== 0 && <Countdown counter={counter} />}
            <ListGroup className="mb-3">
              <ListGroup.Item className="border-0">
                Your answer is:
              </ListGroup.Item>
              <Form.Control
                placeholder={enteredAnswer}
                //aria-label="answer-input"
                //aria-describedby="basic-addon2"
                as="textarea"
                rows={5}
                //ref={answerInputRef}
                disabled
              />
            </ListGroup>
          </Form.Group>
        </Form>
      )}
      {instructorIsLoggedIn && (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Label>{`Instructor: ${enteredName}, you are ${connectionStatus}!`}</Form.Label>

            <ListGroup horizontal>
              <ListGroup.Item className="border-0">
                Connected Students:
              </ListGroup.Item>
              {connectedStudents.map((student) => {
                return (
                  <ListGroup.Item className="border-0" key={student.id}>
                    {student.username}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Col className="mb-3">
              <TimerButton value={5} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={15} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={30} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={45} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={60} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={90} onClick={onTimerClickHandler} />{" "}
              <TimerButton value={120} onClick={onTimerClickHandler} />{" "}
              <TimerButton
                className="ms-5"
                value={"Clear"}
                onClick={onClearClickHandler}
              />
            </Col>
            <Countdown counter={counter} />

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter Your Question..."
                aria-label="answer-input"
                aria-describedby="basic-addon2"
                as="textarea"
                rows={5}
                ref={answerInputRef}
              />
              <Button
                onClick={sendQuestionHandler}
                variant="outline-primary"
                id="button-addon2"
              >
                Submit
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder={question}
                //aria-label='answer-input'
                //aria-describedby='basic-addon2'
                as="textarea"
                rows={5}
                //ref={answerInputRef}
                disabled
              />
            </InputGroup>

            <ListGroup className="mb-3">
              {answers.map((answer) => {
                return (
                  <Form.Control
                    key={answer.id}
                    placeholder={`${answer.name}'s answer: \n${answer.answer}`}
                    //aria-label='answer-input'
                    //aria-describedby='basic-addon2'
                    as="textarea"
                    rows={5}
                    //ref={answerInputRef}
                    disabled
                  />
                );
              })}
            </ListGroup>
          </Form.Group>
        </Form>
      )}
    </Stack>
  );
}

export default App;
