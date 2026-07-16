import { ElementProps, Text, TextProps } from '@react-ui/ui';
import classes from './HtmlText.module.css';

interface HtmlTextProps extends TextProps, ElementProps<'span', 'color'> {
  children: string;
}

function replaceMarkdown(str: string): string {
  return str
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!important!/g, '<b>重要</b>')
    .replace(/@deprecated/g, '<i>已弃用：</i>')
    .replace(/\[([^\]]+)\]\((.*?)\)/g, '<a href="$2" target="_blank" ref="noreferrer">$1</a>')
    .replace(/(?:^|\n)((?:- .+(?:\n|$))+)/g, (_, list) => {
      const items = list.replace(/(?:^|\n)- (.+)/g, '<li>$1</li>');
      return `<ul>${items}</ul>`;
    });
}

export function HtmlText({ children, ...others }: HtmlTextProps) {
  return (
    <Text
      component="span"
      className={classes.text}
      dangerouslySetInnerHTML={{ __html: replaceMarkdown(children) }}
      fz="sm"
      {...others}
    />
  );
}
