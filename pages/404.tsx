const ERROR_PAGE = `# Error 404

The requested page/snippet could not be found. Either it was never created, or
it got deleted from our database. If you're sure the snippet must be here,
contact me on Telegram: t.me/AaronDewes
`;

const NotFound = () => {
  return (
    <code>{ERROR_PAGE}</code>
  );
};

export default NotFound;
