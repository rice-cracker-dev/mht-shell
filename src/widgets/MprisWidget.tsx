import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalMpris from 'gi://AstalMpris';
import Pango from 'gi://Pango';

const mpris = AstalMpris.get_default();

const activePlayer = bind(mpris, 'players').as((players) =>
  players.length > 0 ? players[0] : null
);

const MprisButton = (player: AstalMpris.Player | null) => {
  if (!player) {
    return <label label="No song is playing" />;
  }

  return (
      <box halign={Gtk.Align.FILL} spacing={8} css_classes={['content']}>
        <image icon_name="ph-headphones-symbolic" />
        <label
          label={bind(player, 'title')}
          ellipsize={Pango.EllipsizeMode.END}
          xalign={0}
          single_line_mode
          hexpand
        />
      </box>
  );
};

const MprisWidget = () => {
  return <box css_classes={['mpris']}>{bind(activePlayer).as(MprisButton)}</box>;
};

export default MprisWidget;
