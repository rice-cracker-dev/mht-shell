import { App } from 'astal/gtk4';
import style from './styles/app.scss';
import MainBar from './windows/MainBar';

App.start({
  css: style,
  icons: './assets/icons/',
  main() {
    App.get_monitors().map(MainBar);
  },
});
