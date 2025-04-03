import { App, Astal, Gdk } from 'astal/gtk4';
import TimeWidget from '../widgets/TimeWidget';
import HomeWidget from '../widgets/HomeWidget';
import SystemTrayWidget from '../widgets/SystemTrayWidget';
import NetworkWidget from '../widgets/NetworkWidget';
import MprisWidget from '../widgets/MprisWidget';
import PipewireWidget from '../widgets/PipewireWidget';

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      css_classes={['MainBar']}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
      default_height={36}
      margin_right={8}
      margin_left={8}
      margin_top={8}
    >
      <box spacing={8}>
        <box hexpand spacing={8}>
          <box hexpand css_classes={['card', 'card-base']}>
            <MprisWidget />
          </box>
        </box>
        <box spacing={8} css_classes={['widget-right']}>
          <box css_classes={['card', 'card-base']}>
            <SystemTrayWidget />
          </box>
          <box spacing={8} css_classes={['card', 'card-base']}>
            <NetworkWidget />
            <PipewireWidget />
          </box>
          <box css_classes={['card', 'card-base']}>
            <TimeWidget />
          </box>
          <box css_classes={['card', 'card-base']}>
            <HomeWidget />
          </box>
        </box>
      </box>
    </window>
  );
}
