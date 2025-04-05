import { Gtk } from 'astal/gtk4';
import { bind } from 'astal';
import { formatTime, time } from '../services/time';

const TimeWidget = () => (
  <button css_classes={["btn", "btn-neutral", "btn-ghost"]}>
    <box spacing={4}>
      <image valign={Gtk.Align.CENTER} icon_name="clock-symbolic" />
      <label valign={Gtk.Align.CENTER} label={bind(time).as(formatTime)} />
    </box>
  </button>
);

export default TimeWidget;

