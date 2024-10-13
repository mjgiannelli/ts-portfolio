import { send } from 'emailjs-com';
import { useState, ChangeEvent, FormEvent } from 'react';
import { capitalizeFirstLetter, validateEmail } from '../../../utilties/utils';

// Define the types for form state and response
interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactViewController = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    setErrorMessage('');
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
        setErrorMessage(`${capitalizeFirstLetter(name)} is required.`);
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
    setLoading(true);
    const from_name = formState.name;
    const message = formState.message;
    const reply_to = formState.email;

    const toSend = { from_name, message, reply_to };

    send(
      'service_106gwhj',
      'template_q48h3sn',
      toSend,
      'user_NVXWfdcOsviqZFCpy1AWZ',
    )
      .then((response) => {
        setFormState({
          name: '',
          email: '',
          message: '',
        });
        setResponse(response);
        setLoading(false);
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setErrorMessage(
          'There was error trying to send your email. Please try again.',
        );
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
    loading,
  };
};

export default ContactViewController;
