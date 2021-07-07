import ResourceCard from '@components/resources/resourceCard';
import React from 'react';

type ResourceSection = {
  title: string;
  children: JSX.Element | JSX.Element[] | any;
};

function ResourceSection({ title, children }: ResourceSection) {
  return (
    <div className="fr-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <h3>{title}</h3>
        </div>
        {children?.map((child: ResourceCard, index: number) => (
          <div key={index} className="fr-col-lg-4 fr-col-sm-6">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceSection;
