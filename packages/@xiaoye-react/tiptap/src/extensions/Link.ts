import TipTapLink from '@tiptap/extension-link';

export const Link = TipTapLink.extend({
  // 非 arrow：方法内经 this.editor 拿到编辑器实例
  addKeyboardShortcuts() {
    return {
      'Mod-k': () => {
        // 携带 editor 实例的 CustomEvent：此前全局无差别 Event 会让
        // 同页多个编辑器的 Link 弹层同时打开
        window.dispatchEvent(
          new CustomEvent('edit-link', { detail: { editor: this.editor } })
        );
        return true;
      },
    };
  },
}).configure({ openOnClick: false });
