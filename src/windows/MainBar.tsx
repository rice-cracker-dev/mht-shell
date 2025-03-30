import { App, Astal, Gdk } from 'astal/gtk4';
import { TimeWidget } from '../widgets/TimeWidget';
import { HomeWidget } from '../widgets/HomeWidget';
import { SystemTrayWidget } from '../widgets/SystemTrayWidget';
import { NetworkWidget } from '../widgets/NetworkWidget';

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      css_classes={["MainBar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <box css_classes={["main"]}>
        <box hexpand></box>
        <box spacing={4}>
          <SystemTrayWidget />
          <NetworkWidget />
          <TimeWidget />
          <HomeWidget />
        </box>
      </box>
    </window>
  );
}
