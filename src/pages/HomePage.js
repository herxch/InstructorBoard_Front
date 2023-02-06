import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import ListGroup from 'react-bootstrap/ListGroup';
import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    const nameInputRef = useRef();
    const [enteredNameAndType, setEnteredNameAndType] = useState();
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

    // const joinStudentHandler = (e) => {
    //     e.preventDefault();
    //     // const studentSocket = io(process.env.REACT_APP_BACKEND_URL);
    //     // setSocket(studentSocket);
    //      const enteredNameValue = nameInputRef.current.value;
    //     if (enteredNameValue.trim() === '') {
    //       setEnteredNameIsValid(false);
    //       return;
    //     }
    //     // setEnteredName(enteredNameValue);
    //      setEnteredNameIsValid(true);
    //      Navigate('/login', {state:{enteredNameValue}})
         
    //     // setStudentIsLoggedIn(true);
    //     // studentSocket.emit('join student', enteredNameValue);
    //     nameInputRef.current.value = '';
    //   };
     
    //   const joinInstructorHandler = (e) => {
    //     e.preventDefault();
    //     // const instructorSocket = io(process.env.REACT_APP_BACKEND_URL);
    //     const enteredNameValue = nameInputRef.current.value;
    //     if (enteredNameValue.trim() === '') {
    //       setEnteredNameIsValid(false);
    //       return;
    //     }
    //     // setEnteredName(enteredNameValue);
    //     setEnteredNameIsValid(true);
    //     Navigate('/login', {state:{enteredNameValue}})
    //     // setInstructorIsLoggedIn(true);
    //     // instructorSocket.emit('join instructor');
    //   };

      const joinHandler = (e) => {
        e.preventDefault();
        const enteredNameValue = nameInputRef.current.value;
        if (enteredNameValue.trim() === '') {
          setEnteredNameIsValid(false);
          return;
        }
        console.log(e.target.innerText)
        setEnteredNameAndType({name:enteredNameValue, type: e.target.innerText});
        setEnteredNameIsValid(true);
     
      };
     
    const submitHandler = (e) => {
        e.preventDefault();
      };
     
    return (

<Stack gap={2} className='col-md-5 mx-auto mt-5'>
      
        <Form onSubmit={submitHandler}>
          <FloatingLabel
            controlId='floatingInput'
            label='Your Name'
            className='mb-3'
          >
            <Form.Control ref={nameInputRef} type='text' />
            {!enteredNameIsValid && (
              <Form.Text className='text-danger' id='nameValidation'>
                Name must not be empty.
              </Form.Text>
            )}
          </FloatingLabel>
          <Row>
            <Col>
              <div className='d-grid gap-2'>
                <Button onClick={joinHandler} variant='outline-primary'>
                  Student
                </Button>
              </div>
            </Col>
            <Col>
              <div className='d-grid gap-2'>
                <Button
                  onClick={joinHandler}
                  variant='outline-primary'
                >
                  Instructor
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
    {enteredNameAndType && <Navigate to='/login' state={enteredNameAndType} />}
      
    </Stack>)
}

export default HomePage;