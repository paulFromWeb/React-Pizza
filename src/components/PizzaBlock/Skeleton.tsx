import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="120" />
    <rect x="-3" y="270" rx="10" ry="10" width="280" height="27" />
    <rect x="1" y="315" rx="10" ry="10" width="280" height="85" />
    <rect x="130" y="420" rx="25" ry="25" width="150" height="50" />
    <rect x="2" y="432" rx="10" ry="10" width="90" height="30" />
  </ContentLoader>
);

export default Skeleton;
