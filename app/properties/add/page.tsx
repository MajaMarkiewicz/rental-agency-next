import PropertyAddEditForm from "@/app/components/PropertyAddEditForm"
import addProperty from '@/app/actions/addProperty'

const AddProperty = () => {
    return <section className="bg-blue-50">
      <div className="container m-auto max-2-2xl py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddEditForm action={addProperty} title="Add Property" buttonText="Add Property"/>
        </div>
      </div>
    </section>
  }
  
  export default AddProperty