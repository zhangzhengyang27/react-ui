import React from 'react';
import { AiOutlineInfoCircle, AiOutlinePushpin } from 'react-icons/ai';
import { get, set } from '@rc-component/util';
import { Button, Flex, Popover, Pill, Title, Text } from '@react-ui/ui';
import { clsx } from 'clsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import Markers from './Markers';
import styles from './SemanticPreview.module.css';

export interface SemanticPreviewInjectionProps {
  classNames?: Record<string, string>;
}

function getSemanticCells(semanticPath: string) {
  return semanticPath.split('.');
}

function HighlightExample(props: {
  componentName: string;
  semanticName: string;
  itemsAPI?: string;
}) {
  const { componentName, semanticName, itemsAPI } = props;

  const highlightCode = React.useMemo(() => {
    const classNames = set({}, getSemanticCells(semanticName), `my-classname`);
    const stylesObj = set({}, getSemanticCells(semanticName), { color: 'red' });

    function format(obj: object, offset = 1) {
      const str = JSON.stringify(obj, null, 2);
      return (
        str
          // Add space
          .split('\n')
          .map((line) => `${'  '.repeat(offset)}${line}`)
          .join('\n')
          .trim()
          // Replace quotes
          .replace(/"/g, "'")
          // Remove key quotes
          .replace(/'([^']+)':/g, '$1:')
      );
    }

    let code: string;

    if (itemsAPI) {
      // itemsAPI with array
      code = `
<${componentName}
  ${itemsAPI}={[{
    classNames: ${format(classNames, 2)},
    styles: ${format(stylesObj, 2)},
  }]}
/>`.trim();
    } else {
      // itemsAPI is not provided
      code = `
<${componentName}
  classNames={${format(classNames)}}
  styles={${format(stylesObj)}}
/>`.trim();
    }

    return Prism.highlight(code, Prism.languages.jsx || Prism.languages.javascript, 'jsx');
  }, [componentName, itemsAPI, semanticName]);

  return (
    <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
  );
}

const getMarkClassName = (semanticKey: string) =>
  `semantic-mark-${semanticKey}`.replace(/\./g, '-');

export interface SemanticPreviewProps {
  componentName: string;
  semantics: { name: string; desc: string; version?: string }[];
  itemsAPI?: string;
  children: React.ReactElement<any>;
  height?: number;
  padding?: false;
  style?: React.CSSProperties;
  motion?: boolean;
}

const SemanticPreview: React.FC<SemanticPreviewProps> = (props) => {
  const {
    semantics = [],
    children,
    height,
    padding,
    style,
    componentName = 'Component',
    itemsAPI,
    motion = false,
  } = props;

  const semanticClassNames = React.useMemo<Record<string, string>>(() => {
    let classNames: Record<string, string> = {};

    semantics.forEach((semantic) => {
      const pathCell = getSemanticCells(semantic.name);
      classNames = set(classNames, pathCell, getMarkClassName(semantic.name));
    });

    return classNames;
  }, [semantics]);

  // ======================== Hover =========================
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [pinSemantic, setPinSemantic] = React.useState<string | null>(null);
  const [hoverSemantic, setHoverSemantic] = React.useState<string | null>(null);

  const mergedSemantic = pinSemantic || hoverSemantic;

  const hoveredSemanticClassNames = React.useMemo(() => {
    if (!mergedSemantic) {
      return semanticClassNames;
    }

    const hoverCell = getSemanticCells(mergedSemantic);
    const clone = set(
      semanticClassNames,
      hoverCell,
      clsx(get(semanticClassNames, hoverCell), getMarkClassName('active')),
    );

    return clone;
  }, [semanticClassNames, mergedSemantic]);

  // ======================== Render ========================
  const cloneNode = React.cloneElement<SemanticPreviewInjectionProps>(children, {
    classNames: hoveredSemanticClassNames,
  });

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.row} style={{ minHeight: height }}>
        <div
          className={clsx(styles.colWrap, padding === false && styles.colWrapPaddingLess)}
          style={style}
        >
          {cloneNode}
        </div>
        <div className={styles.colList}>
          <ul className={styles.listWrap}>
            {semantics.map<React.ReactNode>((semantic) => (
              <li
                key={semantic.name}
                className={styles.listItem}
                onMouseEnter={() => setHoverSemantic(semantic.name)}
                onMouseLeave={() => setHoverSemantic(null)}
              >
                <Flex direction="column" gap="sm">
                  <Flex gap="sm" align="center" justify="space-between">
                    {/* Title + Version */}
                    <Flex gap="sm" align="center">
                      <Title order={5} className={styles.title}>
                        {semantic.name}
                      </Title>
                      {semantic.version && (
                        <Pill size="sm">{semantic.version}</Pill>
                      )}
                    </Flex>

                    {/* Pin + Sample */}
                    <Flex gap="sm" align="center">
                      <Button
                        aria-hidden="true"
                        size="sm"
                        variant={pinSemantic === semantic.name ? 'filled' : 'subtle'}
                        color={pinSemantic === semantic.name ? 'blue' : 'gray'}
                        className={styles.iconBtn}
                        onClick={() => {
                          setPinSemantic((prev) => (prev === semantic.name ? null : semantic.name));
                        }}
                      >
                        <AiOutlinePushpin />
                      </Button>
                      <Popover position="left" width={320}>
                        <Popover.Target>
                          <Button
                            aria-hidden="true"
                            size="sm"
                            variant="subtle"
                            className={styles.iconBtn}
                          >
                            <AiOutlineInfoCircle />
                          </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Text component="div" className={styles.popoverContent}>
                            <pre dir="ltr">
                              <code dir="ltr">
                                <HighlightExample
                                  componentName={componentName}
                                  semanticName={semantic.name}
                                  itemsAPI={itemsAPI}
                                />
                              </code>
                            </pre>
                          </Text>
                        </Popover.Dropdown>
                      </Popover>
                    </Flex>
                  </Flex>
                  <Text component="p" className={styles.desc}>
                    {semantic.desc}
                  </Text>
                </Flex>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Markers
        containerRef={containerRef}
        targetClassName={mergedSemantic ? getMarkClassName(mergedSemantic) : null}
      />
    </div>
  );
};

export default SemanticPreview;
