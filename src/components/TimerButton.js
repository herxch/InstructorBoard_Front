import Button from 'react-bootstrap/Button';
const TimerButton = (props) => {
  return (
    <Button variant='primary' onClick={props.onClick}>
      {props.value}
    </Button>
  );
};

export default TimerButton;
