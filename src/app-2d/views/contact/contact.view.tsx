import ContactViewController from './contact.view-controller';
import './contact.view.scss';

const Contact: React.FC = () => {
  const {
    handleSubmit,
    handleChange,
    email,
    name,
    message,
    errorMessage,
    response,
  } = ContactViewController();
  return (
    <section>
      <h1 className="title">
        Contact me below or @{' '}
        <a id="email-link" href="mailto: giannellimj@gmail.com">
          giannellimj@gmail.com
        </a>
      </h1>
      <div id="contact-form-div" className="box">
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="row form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              onBlur={handleChange}
            />
          </div>
          <div className="row form">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              onBlur={handleChange}
            />
          </div>
          <div className="row form">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              rows={5}
              defaultValue={message}
              onBlur={handleChange}
            />
          </div>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          <div id="form-btn-div" className="row">
            <button id="form-btn" type="submit">
              Submit
            </button>
          </div>
          {response && (
            <div>
              <p className="response">Message Successfully Sent!</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
