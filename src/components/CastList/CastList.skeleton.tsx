import "./CastList.skeleton.style.scss";

const CastListSkeleton = () => {
  return [...Array(4)].map((_, index) => (
    <div key={index} className="skeleton skeleton-cast" />
  ));
};

export default CastListSkeleton;
