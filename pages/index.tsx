import AppTemplate from '@/components/AppTemplate';
import FastbinEditor from '@/components/editor/FastbinEditor';

const INDEX_PAGE = `# Umbrel debug server

The server for storing debug logs of Umbrel.

`;

const NotFound = () => {
  return (
    <AppTemplate>
      <FastbinEditor
        language="markdown"
        contents={INDEX_PAGE}
        readOnly
      />
    </AppTemplate>
  );
};

export default NotFound;
