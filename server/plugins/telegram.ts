export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
      html.head.push(
        `<script src="https://telegram.org/js/telegram-web-app.js"></script>`,
      )
    })
  })