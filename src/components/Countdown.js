import Alert from 'react-bootstrap/Alert';

const Countdown = (props) => {
  let variant = 'success';
  if (props.counter > 10) {
    variant = 'success';
  } else if (props.counter <= 10 && props.counter > 0) {
    variant = 'warning';
  } else {
    variant = 'danger';
  }

  return (
    <Alert variant={variant} className='text-center'>
      {props.counter}
    </Alert>
  );
};

export default Countdown;
