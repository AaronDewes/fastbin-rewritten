import AppTemplate from '@/components/AppTemplate';
import FastbinEditor from '@/components/editor/FastbinEditor';

const ERROR_PAGE = `# Error 404

The requested page/snippet could not be found. Either it was never created, or
it got deleted from our database. If you're sure the snippet must be here,
contact me on Telegram: t.me/AaronDewes

If this is the front page, you can't create a snippet from the web interface.
`;

const NotFound = () => {
  return (
    <AppTemplate>
      <FastbinEditor
        language="markdown"
        contents={ERROR_PAGE}
        readOnly
      />
    </AppTemplate>
  );
};

export default NotFound;
