import { MdxCode, MdxLink, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function FlexboxGapSupport({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="browser-support">浏览器支持</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 使用{' '}
        <MdxLink href="https://caniuse.com/flexbox-gap">flexbox gap</MdxLink>在子元素之间添加间距。
        在旧版浏览器中，<MdxCode>{component}</MdxCode> 的子元素可能没有间距。
        你可以安装 PostCSS{' '}
        <MdxLink href="https://github.com/gavinmcfarland/flex-gap-polyfill">
          flex-gap-polyfill
        </MdxLink>{' '}
        以支持旧版浏览器。
      </MdxParagraph>
    </>
  );
}
