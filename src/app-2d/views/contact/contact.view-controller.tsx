import { send } from 'emailjs-com';
import { useState, ChangeEvent, FormEvent } from 'react';
import { validateEmail } from '../../../utilties/utils';

// Define the types for form state and response
interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactViewController = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const { name, email, message } = formState;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const isValid = validateEmail(value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
      } else {
        setErrorMessage('');
      }
    } else {
      if (!value.length) {
        setErrorMessage(`${name} is required.`);
      } else {
        setErrorMessage('');
      }
    }

    if (!errorMessage) {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const from_name = formState.name;
    const message = formState.message;
    const reply_to = formState.email;

    const toSend = { from_name, message, reply_to };

    // Reset input fields after submit
    Array.from(document.querySelectorAll<HTMLInputElement>('input')).forEach(
      (input) => (input.value = ''),
    );

    // Reset textarea fields after submit
    Array.from(
      document.querySelectorAll<HTMLTextAreaElement>('textarea'),
    ).forEach((input) => (input.value = ''));

    send(
      'service_106gwhj',
      'template_q48h3sn',
      toSend,
      'user_NVXWfdcOsviqZFCpy1AWZ',
    )
      .then((response) => {
        setResponse(response);
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };
  return {
    handleChange,
    handleSubmit,
    email,
    name,
    message,
    errorMessage,
    response,
  };
};

export default ContactViewController;
