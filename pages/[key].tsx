import env from '@/lib/env';
import languages from '@/lib/languages';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  default as AnsiUp
} from 'ansi_up';
interface DocumentPageProps {
  contents0: string;
  contents1: string;
}

const DocumentPage = ({ contents0, contents1 }: DocumentPageProps) => {
  const router = useRouter();

  const ansi_up = new AnsiUp();

  return (
    <Tabs>
      <TabList>
        <Tab>Logs</Tab>
        <Tab>Dmesg</Tab>
      </TabList>

      <TabPanel>
        <pre className="code">
          {contents0.split("\n").map((value, index) => {
            return <code key={"0" + index} dangerouslySetInnerHTML={{ __html: `<span class="codeline"> ${ansi_up.ansi_to_html(value)}</span>` }}></code>;
          })}
        </pre>
      </TabPanel>
      <TabPanel>
        <pre className="code">
          {contents0.split("\n").map((value, index) => {
            return <code key={"1" + index} dangerouslySetInnerHTML={{ __html: `<span class="codeline"> ${ansi_up.ansi_to_html(value)}</span>` }}></code>;
          })}
        </pre>
      </TabPanel>
    </Tabs>
  );
};

export default DocumentPage;

export async function getServerSideProps({ req, res, params }) {
  let key = params.key;
  let originalKey = key;

  let languageId = 'plain';

  const components = key.split('.');
  if (components.length > 1) {
    const extension = components.pop();
    key = components.join('.');

    const targetLanguage = Object.values(languages)
      .find(l => l.extension === extension);

    if (targetLanguage) {
      languageId = targetLanguage.id;
    }
  }

  // For local testing
  const baseUrl = env('site-url', true) || "http://localhost:3000";

  const data = await fetch(`${baseUrl}/api/documents/${key + "0"}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  });

  const json = await data.json();

  if (!json.ok) {
    return {
      notFound: true
    };
  }

  const contents0 = json.contents;

  const data1 = await fetch(`${baseUrl}/api/documents/${key + "1"}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  });

  const json1 = await data1.json();

  if (!json1.ok) {
    return {
      notFound: true
    };
  }

  const contents1 = json1.contents;

  return {
    props: {
      contents0,
      contents1,
      finalKey: key,
      originalKey,
      languageId
    }
  };
};
