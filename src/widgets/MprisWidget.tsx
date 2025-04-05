import { bind, Variable } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalMpris from 'gi://AstalMpris';
import Pango from 'gi://Pango';
import StatusButton from '../components/StatusButton';
import IconButton from '../components/IconButton';

const mpris = AstalMpris.get_default();

const activePlayer = bind(mpris, 'players').as((players) =>
  players.length > 0 ? players[0] : null
);

const playPauseMap = new Map<AstalMpris.PlaybackStatus, string>([
  [AstalMpris.PlaybackStatus.PLAYING, 'pause-symbolic'],
  [AstalMpris.PlaybackStatus.PAUSED, 'play-symbolic'],
  [AstalMpris.PlaybackStatus.STOPPED, 'play-symbolic'],
]);

const loopStatusMap = new Map<AstalMpris.Loop, string>([
  [AstalMpris.Loop.TRACK, 'loop-once-symbolic'],
  [AstalMpris.Loop.PLAYLIST, 'loop-symbolic'],
  [AstalMpris.Loop.NONE, 'loop-off-symbolic'],
]);

const shuffleStatusMap = new Map<AstalMpris.Shuffle, string>([
  [AstalMpris.Shuffle.ON, 'shuffle-symbolic'],
  [AstalMpris.Shuffle.OFF, 'shuffle-off-symbolic'],
]);

const MprisButton = (player: AstalMpris.Player | null) => {
  if (!player) {
    return (
      <box halign={Gtk.Align.FILL} spacing={8}>
        <image icon_name="headphones-off-symbolic" css_classes={['mpris-icon']} />
        <label label="No song is playing" />
      </box>
    );
  }

  const playerStatus = Variable.derive([bind(player, 'canPlay'), bind(player, 'title')]);

  return (
    <box halign={Gtk.Align.FILL} spacing={8}>
      <image
        css_classes={['mpris-icon']}
        icon_name={bind(player, 'canPlay').as((canPlay) =>
          canPlay ? 'headphones-symbolic' : 'headphones-off-symbolic'
        )}
      />
      <label
        label={bind(playerStatus).as(([canPlay, title]) =>
          canPlay ? title : 'No song is playing'
        )}
        ellipsize={Pango.EllipsizeMode.END}
        xalign={0}
        single_line_mode
      />

      <box hexpand halign={Gtk.Align.END} spacing={4} visible={bind(player, 'canPlay')}>
        <IconButton
          icon="skip-previous-symbolic"
          css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
          enabled={bind(player, 'can_go_previous')}
          action={() => player.previous()}
        />

        <StatusButton
          status={bind(player, 'loop_status')}
          action={() => player.loop()}
          visible={bind(player, 'loop_status').as((s) => s !== AstalMpris.Loop.UNSUPPORTED)}
          icon={loopStatusMap}
          css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
        />
        <StatusButton
          status={bind(player, 'playback_status')}
          action={() => player.play_pause()}
          icon={playPauseMap}
          css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
        />
        <StatusButton
          status={bind(player, 'shuffle_status')}
          action={() => player.shuffle()}
          visible={bind(player, 'shuffle_status').as((s) => s !== AstalMpris.Shuffle.UNSUPPORTED)}
          icon={shuffleStatusMap}
          css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
        />
        <IconButton
          icon="skip-next-symbolic"
          css_classes={['btn', 'btn-neutral', 'btn-ghost', 'btn-icon']}
          enabled={bind(player, 'can_go_next')}
          action={() => player.next()}
        />
      </box>
    </box>
  );
};

const MprisWidget = () => {
  return <box css_classes={['mpris']}>{bind(activePlayer).as(MprisButton)}</box>;
};

export default MprisWidget;
