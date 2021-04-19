const INDEX_PAGE = `# Page not found

The server for storing debug logs of Umbrel.

If you think this is a bug in the server, please <a href="t.me/AaronDewes">[contact me on Telegram](t.me/AaronDewes)</a>.
`;

const Frontpage = () => {
  const items0 = [];

  for (const value0 of INDEX_PAGE.split("\n")) {
    items0.push(<code dangerouslySetInnerHTML={{__html: value0 }}></code>);
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

export default Frontpage;
