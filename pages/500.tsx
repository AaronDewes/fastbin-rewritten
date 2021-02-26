const ERROR_PAGE = `# Error 500

Something bad happened on the server side. This might be a temporary issue, so
please try checking back later. If the problem persists, please
contact me on Telegram: t.me/AaronDewes
`;

const InternalServerError = () => {
  return (
    <code>{ERROR_PAGE}</code>
  );
};

export default InternalServerError;
