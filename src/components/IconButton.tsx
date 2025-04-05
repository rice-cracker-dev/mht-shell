import { Binding } from 'astal';

const IconButton = ({
  icon,
  enabled,
  css_classes,
  action
}: {
  icon: string | Binding<string>;
  enabled?: boolean | Binding<boolean>;
  css_classes?: string[] | Binding<string[]>;
  action?: () => void;
}) => {
  return <button onClicked={action} sensitive={enabled} css_classes={css_classes}>
    <image icon_name={icon} />
  </button>
};

export default IconButton;
