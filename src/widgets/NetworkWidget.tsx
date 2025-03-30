import { bind, Variable, interval } from 'astal';
import AstalNetwork from 'gi://AstalNetwork';
import { getIndexFromPercentage, getPercentageFromRange, wrapAround } from '../utils/math';

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
    <image icon_name={bind(iconIndex).as((i) => wifiStrengthIcons[i])} onDestroy={() => time.cancel()} />
  );
};

const WifiLabelConnected = (wifi: AstalNetwork.Wifi) => {
  const strengthIcon = bind(wifi, 'strength').as((strength) => {
    const perc = getPercentageFromRange(strength, 0, 100);
    return wifiStrengthIcons[getIndexFromPercentage(wifiStrengthIcons, perc)];
  });

  return <image icon_name={strengthIcon} />;
};

const WifiIcon = (wifi: AstalNetwork.Wifi) => {
  if (wifi.internet === AstalNetwork.Internet.CONNECTED) {
    return WifiLabelConnected(wifi);
  }

  if (wifi.internet === AstalNetwork.Internet.DISCONNECTED) {
    return <image icon_name="ph-wifi-slash-symbolic" />;
  }

  return <WifiLabelConnecting />;
};

// TODO: Implement this.
const WiredIcon = (wired: AstalNetwork.Wired) => {
  return <box>{wired.speed}</box>;
};

const NetworkPopover = () => { 
}

export const NetworkWidget = () => {
  const icon = bind(network, 'primary').as((p) => {
    return p === AstalNetwork.Primary.WIFI ? WifiIcon(network.wifi) : WiredIcon(network.wired);
  });

  return <button css_classes={["btn", "btn-neutral", "btn-ghost", "btn-icon"]}>{icon}</button>;
};
