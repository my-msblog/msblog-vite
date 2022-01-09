
export const htmlPlugin = (title: string) => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
    return html.replace(
        /<title>(.*?)<\/title>/,
        '<title>'+title+'</title>'
        );
      }
  };
};