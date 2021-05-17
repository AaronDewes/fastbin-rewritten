import env from '@/lib/env';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  default as AnsiUp
} from 'ansi_up';
interface DocumentPageProps {
  logs: string;
  dmesg: string;
  apps: string;
}

const DocumentPage = ({ logs, apps, dmesg }: DocumentPageProps) => {
  const router = useRouter();

  const ansi_up = new AnsiUp();

  return (
    <Tabs>
      <TabList>
        <Tab>Logs</Tab>
        <Tab>Dmesg</Tab>
        <Tab>Apps</Tab>
      </TabList>

      <TabPanel>
        <pre className="code">
          {logs.split("\n").map((value, index) => {
            return <code key={"0" + index} dangerouslySetInnerHTML={{ __html: `<span class="codeline"> ${ansi_up.ansi_to_html(value)}</span>` }}></code>;
          })}
        </pre>
      </TabPanel>
      <TabPanel>
        <pre className="code">
          {dmesg.split("\n").map((value, index) => {
            return <code key={"1" + index} dangerouslySetInnerHTML={{ __html: `<span class="codeline"> ${ansi_up.ansi_to_html(value)}</span>` }}></code>;
          })}
        </pre>
      </TabPanel>
      <TabPanel>
        <pre className="code">
          {apps.split("\n").map((value, index) => {
            return <code key={"1" + index} dangerouslySetInnerHTML={{ __html: `<span class="codeline"> ${ansi_up.ansi_to_html(value)}</span>` }}></code>;
          })}
        </pre>
      </TabPanel>
    </Tabs>
  );
};

export default DocumentPage;

export async function getServerSideProps({ req, res, params }) {
  // For the tor version
  const baseUrl = env('vercel-url', false) || "http://localhost:8080";
  const data = await fetch(`https://${baseUrl}/api/documents/${params.key}`, {
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

  return {
    props: {
      logs: json.main,
      apps: json.apps,
      dmesg: json.dmesg
    }
  };
};
