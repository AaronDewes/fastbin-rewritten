import { ReactNode } from 'react';

export interface AppTemplateProps {
  children: ReactNode;
}

const AppTemplate = ({
  children
}: AppTemplateProps) => {
  return (
    <section>
      {children}
    </section>
  );
};

export default AppTemplate;
