import { App } from 'astal/gtk3';
import style from './styles/app.scss';
import MainBar from './windows/MainBar';

App.start({
  css: style,
  main() {
    App.get_monitors().map(MainBar);
  },
});
