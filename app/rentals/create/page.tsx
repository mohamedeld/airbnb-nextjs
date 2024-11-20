import AmenitiesInput from "@/components/form/AmenitiesInput"
import CategoriesInput from "@/components/form/CategoriesInput"
import CounterInput from "@/components/form/CounterInput"
import CountryInput from "@/components/form/CountryInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import PriceInput from "@/components/form/PriceInput"
import SubmitButton from "@/components/form/SubmitButton"
import TextAreaInput from "@/components/form/TextAreaInput"
import { createPropertyAction } from "@/utils/actions"

const CreateRentalPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        create property
      </h1>
      <div className='border p-8 rounded-md'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue='Cabin in Latvia'
            />
            <FormInput
              name='tagline'
              type='text '
              label='Tagline (30 limit)'
              defaultValue='Dream Getaway Awaits You Here!'
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
            <CategoriesInput />
          </div>
          {/* text area / description */}
          <TextAreaInput name='description' labelText="Description (10 to 1000 words)" />
          <div className='grid sm:grid-cols-2 gap-8 mt-4'>
            <CountryInput />
            <ImageInput name="image" />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">Accommodation Details</h3>
          <CounterInput detail='guests' />
          <CounterInput detail='bedrooms' />
          <CounterInput detail='beds' />
          <CounterInput detail='baths' />
          <h3 className='text-lg mt-10 mb-6 font-medium'>Amenities</h3>
          <AmenitiesInput />
          <SubmitButton size="lg" text='create rental' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateRentalPage