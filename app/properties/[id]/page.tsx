interface PropertyParams {
    id: string;
}

interface PropertyProps {
    params: PropertyParams;
}

const Property: React.FC<PropertyProps> = ({ params }) => {
    return <div className="text-2xl">Property {params.id}</div>;
  };
  
export default Property