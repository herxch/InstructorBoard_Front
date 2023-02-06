// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Countdown from './components/Countdown';
// import TimerButton from './components/TimerButton'; 

// import { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';


const LoginPage = () => {
 
    const {state} = useLocation()
    console.log(state)
    
 // const [isConnected, setIsConnected] = useState(socket.connected);


//  const [studentIsLoggedIn, setStudentIsLoggedIn] = useState(false);
//  const [instructorIsLoggedIn, setInstructorIsLoggedIn] = useState(false);
//  const [connectedStudents, setConnectedStudents] = useState([]);
//  const [enteredAnswer, setEnteredAnswer] = useState('');
//  const [answers, setAnswers] = useState([]);

//  const answerInputRef = useRef();
//  const [counter, setCounter] = useState(0);
//  const [socket, setSocket] = useState()

//  useEffect(() => {
//    const interval = setInterval(() => {
//      setCounter((prevCounter) => {
//        if (prevCounter === 0) {
//          clearInterval(interval);
//          return 0;
//        } else {
//          return prevCounter - 1;
//        }
//      });
//    }, 1000);
//    return () => clearInterval(interval);
//  }, [counter]);

//  useEffect(() => {
//    // socket.on('connect', () => {
//    //    setIsConnected(true);
//    // });

//    socket.on('disconnect', () => {
//      // setIsConnected(false);
//      setStudentIsLoggedIn(false);
//      setInstructorIsLoggedIn(false);
//      setEnteredAnswer('');
//      setAnswers([]);
//    });

//    return () => {
//      socket.off('connect');
//      socket.off('disconnect');
//    };
//  }, [socket]);

 

//  const sendAnswerHandler = (e) => {
//    e.preventDefault();
//    const enteredAnswerValue = answerInputRef.current.value;
//    if (enteredAnswerValue.trim() === '') {
//      return;
//    }
//    const payload = {
//      name: enteredName,
//      answer: enteredAnswerValue,
//    };
//    setEnteredAnswer(enteredAnswerValue);
//    socket.emit('send answer', payload);
//    answerInputRef.current.value = '';
//  };

//  const submitHandler = (e) => {
//    e.preventDefault();
//  };

//  socket.on('new user', (users) => {
//    setConnectedStudents(users);
//  });

//  socket.on('new answer', (answers) => {
//    setAnswers(answers);
//  });

//  const onTimerClickHandler = (e) => {
//    e.preventDefault();
//    socket.emit('set timer', +e.target.innerText);
//  };

//  socket.on('start timer', (timer) => {
//    setCounter(timer);
//  });


 return (
<>
 {/* {studentIsLoggedIn && (
    <Form onSubmit={submitHandler}>
      <Form.Group className='mb-3' controlId='ControlTextarea1'>
        <Form.Label>{`Student: ${enteredName}, you are connected!`}</Form.Label>

        <ListGroup className='mb-3'>
          <ListGroup.Item className='border-0'>
            Your answer is:
          </ListGroup.Item>
          <ListGroup.Item className='border-0'>
            {enteredAnswer}
          </ListGroup.Item>
        </ListGroup>
      </Form.Group>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder='Enter Your Answer...'
          aria-label='answer-input'
          aria-describedby='basic-addon2'
          ref={answerInputRef}
        />
        <Button
          onClick={sendAnswerHandler}
          variant='outline-primary'
          id='button-addon2'
          disabled={!counter}
        >
          Submit
        </Button>
      </InputGroup>
      <Countdown counter={counter} />
    </Form>
  )}
  {instructorIsLoggedIn && (
    <Form onSubmit={submitHandler}>
      <Form.Group className='mb-3' controlId='ControlTextarea1'>
        <Form.Label>{`Instructor: ${enteredName}, you are connected!`}</Form.Label>

        <ListGroup horizontal>
          <ListGroup.Item className='border-0'>
            Connected Students:
          </ListGroup.Item>
          {connectedStudents.map((student) => {
            return (
              <ListGroup.Item className='border-0' key={student.id}>
                {student.username}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Col className='mb-3'>
          <TimerButton value={5} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={15} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={30} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={45} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={60} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={90} onClick={onTimerClickHandler} />{' '}
          <TimerButton value={120} onClick={onTimerClickHandler} />
        </Col>
        <Countdown counter={counter} />
        <ListGroup className='mb-3'>
          {answers.map((answer) => {
            return (
              <ListGroup.Item
                key={answer.id}
              >{`${answer.name}'s answer: ${answer.answer}`}</ListGroup.Item>
            );
          })}
        </ListGroup>
      </Form.Group>
    </Form>
  )} */}
  </>)
}

export default LoginPage