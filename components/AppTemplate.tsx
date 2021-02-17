import { ReactNode } from 'react';
import TheHeader, { NavigationItem } from './the-header/TheHeader';

export interface AppTemplateProps {
  displayLanguages?: boolean;
  documentLanguage?: string;
  setDocumentLanguage?(language: string): any;
  children: ReactNode;
}

const AppTemplate = ({
  displayLanguages,
  documentLanguage,
  setDocumentLanguage,
  children
}: AppTemplateProps) => {
  return (
    <section>
      <TheHeader
        displayLanguages={displayLanguages}
        documentLanguage={documentLanguage}
        setDocumentLanguage={setDocumentLanguage}
      />

      {children}
    </section>
  );
};

export default AppTemplate;
