import { App } from 'astal/gtk4';
import style from './styles/app.scss';
import MainBar from './windows/MainBar';

console.log('The source folder is: ' + SRC);

App.start({
  css: style,
  icons: `${SRC}/assets/icons/`,
  main() {
    App.get_monitors().map(MainBar);
  },
});
