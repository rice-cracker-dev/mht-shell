import { bind, Binding, Variable, interval, exec } from 'astal';
import AstalNetwork from 'gi://AstalNetwork';
import { getIndexFromPercentage, getPercentageFromRange, wrapAround } from '../utils/math';
import { Gtk } from 'astal/gtk4';

const network = AstalNetwork.get_default();

const wifiStrengthIcons: string[] = [
  'ph-wifi-none-symbolic',
  'ph-wifi-low-symbolic',
  'ph-wifi-medium-symbolic',
  'ph-wifi-high-symbolic',
];

const WifiLabelConnecting = () => {
  const iconIndex = Variable(0);
  const time = interval(500, () => {
    iconIndex.set(wrapAround(iconIndex.get() + 1, 0, wifiStrengthIcons.length - 1));
  });

  return (
    <image
      icon_name={bind(iconIndex).as((i) => wifiStrengthIcons[i])}
      onDestroy={() => time.cancel()}
    />
  );
};

const NetworkStrength = ({ strength, css_classes }: { strength: Binding<number>, css_classes?: string[] }) => {
  const strengthIcon = strength.as((s) => {
    const perc = getPercentageFromRange(s, 0, 100);
    return wifiStrengthIcons[getIndexFromPercentage(wifiStrengthIcons, perc)];
  });

  return <image icon_name={strengthIcon} css_classes={css_classes} />;
};

const WifiIcon = (wifi: AstalNetwork.Wifi) => {
  const wifiBind = bind(wifi, 'internet').as((internet) => {
    if (internet === AstalNetwork.Internet.CONNECTED) {
      return <NetworkStrength strength={bind(wifi, 'strength')} />;
    }

    if (internet === AstalNetwork.Internet.DISCONNECTED) {
      return <image icon_name="ph-wifi-slash-symbolic" />;
    }

    return <WifiLabelConnecting />;
  });

  return (
    <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
      {wifiBind}
    </box>
  );
};

// TODO: Implement this.
const WiredIcon = (wired: AstalNetwork.Wired) => {
  return <box>{wired.speed}</box>;
};

export const NetworkWidget = () => {
  const icon = bind(network, 'primary').as((p) => {
    return p === AstalNetwork.Primary.WIFI ? WifiIcon(network.wifi) : WiredIcon(network.wired);
  });

  return (
    <button
      onClicked={() => exec(['kitty', 'nmtui'])}
      css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon', 'btn-pill']}
    >
      {icon}
    </button>
  );
};
