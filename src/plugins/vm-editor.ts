import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// 复制插件
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createCopyCodePreview from '@kangc/v-md-editor/lib/plugins/copy-code/preview';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// 预览
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

// highlightjs
import hljs from 'highlight.js';

import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';


export default function loadEditor(app: any) {
  VMdEditor.use(githubTheme, {
    Hljs: hljs,
  });
  VMdEditor.use(createCopyCodePlugin());
  VMdEditor.use(createEmojiPlugin());
  VMdPreview.use(githubTheme, {
    Hljs: hljs,
  });
  VMdPreviewHtml.use(createCopyCodePreview());
  app.use(VMdEditor);
  app.use(VMdPreview);
  app.use(VMdPreviewHtml);
}
