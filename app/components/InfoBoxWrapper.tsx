import type React from 'react';
import InfoBox from './InfoBox';
import { propertiesPath, propertiesAddPath } from '@/utils/paths';

const InfoBoxWrapper: React.FC = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            title='For Renters'
            linkTo={propertiesPath}
            buttonText='Browse Properties'
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            title='For Property Owners'
            linkTo={propertiesAddPath}
            buttonText='Add Property'
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxWrapper;
