import { bind } from 'astal';
import AstalWp from 'gi://AstalWp';
import { getIndexFromPercentage, getPercentageFromRange } from '../utils/math';
import { Variable } from 'astal';

const wp = AstalWp.get_default();

const speakerIconLevels = [
  'volume-1-symbolic',
  'volume-2-symbolic',
  'volume-3-symbolic',
];

const SpeakerIconLevel = (endpoint: AstalWp.Endpoint) => {
  const derived = Variable.derive([bind(endpoint, 'volume'), bind(endpoint, 'mute')], (v, mute) => {
    if (mute) {
      return 'volume-muted-symbolic';
    }

    const perc = getPercentageFromRange(v, 0, 1);
    return speakerIconLevels[getIndexFromPercentage(speakerIconLevels, perc)];
  });

  return <image icon_name={bind(derived)} />;
};

const PipewireWidget = () => {
  if (!wp) {
    throw new Error('Wireplumber not init!');
  }

  return (
    <button
      onClicked={() => wp.default_speaker.set_mute(!wp.default_speaker.get_mute())}
      css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
    >
      {bind(wp, 'default_speaker').as(SpeakerIconLevel)}
    </button>
  );
};

export default PipewireWidget;
