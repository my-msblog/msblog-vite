import VMdEditor from '@kangc/v-md-editor';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// highlightjs
import hljs from 'highlight.js';


export default function loadEditor(app: any) {
  VMdEditor.use(githubTheme, {
    Hljs: hljs,
  });
  VMdEditor.use(createCopyCodePlugin());
  VMdPreview.use(githubTheme, {
    Hljs: hljs,
  });
  app.use(VMdEditor);
  app.use(VMdPreview);
}
