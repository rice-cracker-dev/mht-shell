import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalTray from 'gi://AstalTray';

const tray = AstalTray.get_default();

const TrayItem = (item: AstalTray.TrayItem) => {
  const popup = Gtk.PopoverMenu.new_from_model(item.menu_model);
  popup.halign = Gtk.Align.CENTER;
  popup.has_arrow = false;

  return (
    <menubutton
      popover={popup}
      css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
      setup={(self) => {
        self.insert_action_group('dbusmenu', item.actionGroup);
      }}
    >
      <image gicon={bind(item, 'gicon')} />
    </menubutton>
  );
};

const SystemTrayWidget = () => {
  return (
    <box spacing={4}>
      {bind(tray, 'items').as((items) => items.map(TrayItem))}
    </box>
  );
};

export default SystemTrayWidget;
