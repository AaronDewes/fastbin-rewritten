const ERROR_PAGE = `# Error 404

The requested page/snippet could not be found. Either it was never created, or
it got deleted from our database. If you're sure the snippet must be here,
contact me on Telegram: t.me/AaronDewes
`;

const NotFound = () => {
  const items0 = [];

  for (const value0 of ERROR_PAGE.split("\n")) {
    items0.push(<code>{value0}</code>);
  }

  return (
    <div>
      <pre className="code">
        {items0.map((value, index) => {
          return value;
        })}
      </pre>
    </div>
  );
};

export default NotFound;
