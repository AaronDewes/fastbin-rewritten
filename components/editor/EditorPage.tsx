import AppTemplate from '@/components/AppTemplate';
import FastbinEditor from '@/components/editor/FastbinEditor';
import React, { useEffect, useRef, useState } from 'react';
import Mousetrap from 'mousetrap';
import globalKeyBind from '@/lib/globalKeyBind';
import { useRouter } from 'next/router';

interface EditorPageProps {
  contents?: string;
  languageId: string;
}

const EditorPage = ({ contents, languageId }: EditorPageProps) => {
  const [documentLanguage, _setDocumentLanguage] = useState(languageId);
  const documentLanguageRef = useRef(languageId);
  const setDocumentLanguage = (l: string) => {
    _setDocumentLanguage(l);
    documentLanguageRef.current = l;
  };

  const documentContents = useRef(contents ?? '');
  const setDocumentContents = (c: string) => documentContents.current = c;

  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    globalKeyBind(Mousetrap);

    Mousetrap.bindGlobal('ctrl+s', e => {
      e.preventDefault();
    });

    return () => {
      (Mousetrap as any).unbindGlobal('ctrl+s');
      mounted = false;
    };
  }, []);

  return (
    <AppTemplate>
      <FastbinEditor
        contents={documentContents.current}
        setContents={setDocumentContents}
        language={documentLanguage}
      />

    </AppTemplate>
  );
};

export default EditorPage;
