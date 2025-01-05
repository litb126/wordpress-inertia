import PropTypes from 'prop-types';

import { isStrHasLen } from 'utilities/cond';

import Discord from '../../svg/Discord';
import Facebook from '../../svg/Facebook';
import Github from '../../svg/Github';
import Instagram from '../../svg/Instagram';
import Twitter from '../../svg/Twitter';

const Icon = ({ icon, ...props }) => {
  if (!isStrHasLen(icon)) return null;
  const renderIcon = () => {
    switch (icon) {
      case 'discord':
        return <Discord {...props} />;

      case 'facebook':
        return <Facebook {...props} />;

      case 'github':
        return <Github {...props} />;

      case 'instagram':
        return <Instagram {...props} />;

      case 'twitter':
        return <Twitter {...props} />;

      default:
        return null;
    }
  };

  return renderIcon();
};

Icon.propTypes = {
  icon: PropTypes.string,
};

export default Icon;
