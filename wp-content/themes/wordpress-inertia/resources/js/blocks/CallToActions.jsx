import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { hash } from '../../../utilities/client';
import { isArrHasLen } from 'utilities/cond';

import Anchor from '../components/Anchor';

const CallToActions = ({ callToActions, className = '' }) => {
  if (!isArrHasLen(callToActions)) return null;

  const Container = tv({
    base: `flex flex-wrap gap-6 ${className}`,
  });

  return (
    <div className={Container()}>
      {callToActions.map((callToAction) => (
        <Anchor
          key={`cta_${hash(callToAction.call_to_action.url)}`}
          callToAction={callToAction.call_to_action}
          theme={callToAction.theme}
        />
      ))}
    </div>
  );
};

CallToActions.propTypes = {
  callToActions: PropTypes.array,
  className: PropTypes.string,
};

export default CallToActions;
