import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalMpris from 'gi://AstalMpris';
import Pango from 'gi://Pango?version=1.0';

const mpris = AstalMpris.get_default();

const activePlayer = bind(mpris, 'players').as((players) =>
  players.length > 0 ? players[0] : null
);

const MprisEmpty = () => {
    return <label label="No song is playing." />
  };

const MprisPlayer = ({ player }: { player: AstalMpris.Player}) => {
  return <box></box>
}

const MprisPopover = () => {

  return <popover>
    {bind(activePlayer).as((p) => !!p ? <MprisPlayer player={p} /> : <MprisEmpty />)}
  </popover>
};

const MprisButton = (player: AstalMpris.Player | null) => {
  if (!player) {
    return <label label="No song is playing" />;
  }

  const picture = new Gtk.Picture({ contentFit: Gtk.ContentFit.COVER, css_classes: ['cover-art'] });
  picture.set_filename(player.cover_art);

  const notifyId = player.connect('notify::cover-art', (self) =>
    picture.set_filename(self.cover_art)
  );

  return (
    <overlay onDestroy={() => player.disconnect(notifyId)} css_classes={['mpris']}>
      {picture}

      <box type="overlay" hexpand halign={Gtk.Align.FILL} spacing={8} css_classes={['content']}>
        <image icon_name="ph-headphones-symbolic" />
        <label
          css_classes={['song-title']}
          label={bind(player, 'title')}
          ellipsize={Pango.EllipsizeMode.END}
          xalign={0}
          single_line_mode
          hexpand
        />

        <menubutton
          valign={Gtk.Align.CENTER}
          css_classes={['btn', 'btn-primary', 'btn-ghost', 'btn-icon', 'btn-pill']}
        >
          <image icon_name="ph-caret-down-symbolic" />
        </menubutton>
      </box>

      <slider
        type="overlay"
        valign={Gtk.Align.END}
        css_classes={['progress']}
        value={bind(player, 'position')}
        max={bind(player, 'length')}
        hexpand
      />
    </overlay>
  );
};

const MprisWidget = () => {
  return <box vexpand>{bind(activePlayer).as(MprisButton)}</box>;
};

export default MprisWidget;
