import { bind } from 'astal';
import AstalTray from 'gi://AstalTray';

const tray = AstalTray.get_default();

export const TrayItem = (item: AstalTray.TrayItem) => {
  return (
    <menubutton
      tooltip_markup={bind(item, 'tooltipMarkup')}
      menu_model={bind(item, 'menuModel')}
      css_classes={["btn", "btn-neutral", "btn-ghost", "btn-icon"]}
    >
      <image gicon={bind(item, 'gicon')} />
    </menubutton>
  );
};

export const SystemTrayWidget = () => {
  return <box spacing={4}>{bind(tray, 'items').as((items) => items.map(TrayItem))}</box>;
};
