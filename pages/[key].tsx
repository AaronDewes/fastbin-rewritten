import env from '@/lib/env';
import languages from '@/lib/languages';
import Mousetrap from 'mousetrap';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import globalKeyBind from '@/lib/globalKeyBind';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface DocumentPageProps {
  contents0: string;
  contents1: string;
  finalKey: string;
  originalKey: string;
  languageId: string;
}

const DocumentPage = ({ contents0, contents1, finalKey, originalKey, languageId }: DocumentPageProps) => {
  const router = useRouter();

  useEffect(() => {
    globalKeyBind(Mousetrap);

    Mousetrap.bindGlobal('ctrl+shift+r', e => {
      e.preventDefault();
      window.location.href = `/raw/${finalKey}`;
    });

    return () => {
      (Mousetrap as any).unbindGlobal('ctrl+shift+r');
    };
  }, []);

  return (
    <Tabs>
    <TabList>
      <Tab>Logs</Tab>
      <Tab>Dmesg</Tab>
    </TabList>

    <TabPanel>
      <code className="viewer">{contents0}</code>
    </TabPanel>
    <TabPanel>
      <code className="viewer">{contents1}</code>
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

  const baseUrl = env('site-url', true);

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
