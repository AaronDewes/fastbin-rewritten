import css from './TheHeader.module.scss';

import { Col, Row, Select, Tooltip } from '@geist-ui/react';
import { FilePlus, Icon, Info } from '@geist-ui/react-icons';
import Link from 'next/link';

import languages from '@/lib/languages';

import { useState, useEffect } from 'react';
import checkMobile from 'ismobilejs';

export interface NavigationItem {
  url?: string;
  external?: boolean;
  icon: Icon;
  tooltip: string;
  onClick?(): any;
}

export interface TheHeaderProps {
  displayLanguages?: boolean;
  documentLanguage?: string;
  setDocumentLanguage?(language: string): any;
}

const TheHeader = ({
  displayLanguages,
  documentLanguage,
  setDocumentLanguage
}: TheHeaderProps) => {

  const [ headerClasses, setHeaderClasses ] = useState([ css.wrapper, css.mobileHeader ].join(' '));
  const [ tooltipPlacement, setTooltipPlacement ] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    const isMobile = checkMobile(window.navigator).any;

    if (isMobile) {
      setTooltipPlacement('top');
    } else {
      setHeaderClasses(css.wrapper);
    }
  }, []);

  return (
    <header className={headerClasses}>
      <Row align="middle" justify="space-between" style={{ height: '65px' }}>
        <Col style={{ width: 'auto' }} className={css.sitename}>
          <h1>fastbin<sup><small><strong>v2</strong></small></sup></h1>
        </Col>

        <Col className={css.navigationWrapper}>
          <Row align="middle" gap={.8}>
            {displayLanguages && (
              <Col className={css.languageRow}>
                <Select initialValue={documentLanguage || 'plain'} onChange={setDocumentLanguage}>
                  {Object.keys(languages).map(id => {
                    const language = languages[id];

                    return (
                      <Select.Option
                        value={language.id}
                        key={id}
                      >
                        {language.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default TheHeader;
