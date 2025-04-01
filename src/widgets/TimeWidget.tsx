import { Gtk } from 'astal/gtk4';
import { bind } from 'astal';
import { formatTime, time } from '../services/time';

export const TimeWidget = () => (
  <button css_classes={["btn", "btn-neutral", "btn-ghost", "btn-pill"]}>
    <box spacing={4}>
      <image valign={Gtk.Align.CENTER} icon_name="ph-clock-symbolic" />
      <label valign={Gtk.Align.CENTER} label={bind(time).as(formatTime)} />
    </box>
  </button>
);
