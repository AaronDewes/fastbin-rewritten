import FastbinEditor from '@/components/editor/FastbinEditor';

const INDEX_PAGE = `# Umbrel debug server

The server for storing debug logs of Umbrel.

`;

const Frontpage = () => {
  return (
    <FastbinEditor
      language="markdown"
      contents={INDEX_PAGE}
      readOnly
    />
  );
};

export default Frontpage;
