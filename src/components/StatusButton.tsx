import { bind, Binding } from 'astal';
import { Gtk } from 'astal/gtk4';

const StatusButton = <T,>({
  status,
  action,
  icon,
  visible,
  css_classes,
  child,
}: {
  status: Binding<T>;
  action: () => void;
  icon?: [string, string] | Map<T, string>;
  visible?: boolean | Binding<boolean>
  css_classes?: string[];
  child?: Gtk.Widget | Binding<Gtk.Widget>;
}) => {
  if (Array.isArray(icon)) {
    const map = new Map<boolean, string>([
      [true, icon[0]],
      [false, icon[1]],
    ])

    return StatusButton<boolean>({
      status: status.as(Boolean),
      action,
      icon: map,
      visible,
      css_classes,
      child
    })
  }

  return (
    <button visible={visible} onClicked={action} css_classes={css_classes}>
      <box spacing={8} halign={Gtk.Align.CENTER}>
        {icon && <image icon_name={bind(status).as((status) => icon.get(status) ?? "")} />}
        {child}
      </box>
    </button>
  );
};

export default StatusButton;

