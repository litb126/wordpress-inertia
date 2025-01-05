import PropTypes from 'prop-types';

import { hash } from '../../../utilities/client';
import {
  isArrHasLen,
  isObjHasProps,
  isStrHasLen,
} from 'utilities/cond';

import Image from '../components/Image';

const TeamCards = ({ content, members }) => {
  if (!isStrHasLen(content) && !isArrHasLen(members)) return null;

  return (
    <section className='w-full'>
      {isStrHasLen(content) && (
        <div className='lg:max-w-3xl px-6 lg:mx-auto mb-10 w-full text-left lg:text-center flex lg:justify-center'>
          <div
            className='prose w-full text-white prose-headings:text-white'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
      {isArrHasLen(members) && (
        <div className='max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {members.map((member) => (
            <div
              key={`team_${hash(member.name)}`}
              className='w-full p-6 aspect-portrait rounded-md border border-gray-200 relative overflow-hidden flex flex-col justify-end items-end'
            >
              {isObjHasProps(member.image) && (
                <>
                  <Image {...member.image} width='288' height='360' />
                  <div className='overlay' />
                </>
              )}
              <div className='w-full text-center text-white'>
                {isStrHasLen(member.name) && (
                  <h3 className='text-xl font-bold'>{member.name}</h3>
                )}
                {isStrHasLen(member.position) && (
                  <p className='text-lg mt-1'>{member.position}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

TeamCards.propTypes = {
  content: PropTypes.string,
  members: PropTypes.array,
};

export default TeamCards;
