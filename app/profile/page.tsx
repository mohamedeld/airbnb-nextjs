import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction, fetchProfile, updateProfileImageAction } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const profile = await fetchProfile();
  if(!profile){
    redirect("/profile/create")
  }
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>user profile</h1>
      <div className='border p-8 rounded-md'>
        {/* image input container */}
        <ImageInputContainer name={profile?.userName} image={profile?.profileImage} action={updateProfileImageAction} text={"Update Profile Image"}/>
        <FormContainer action={updateProfileAction}>
          <div className='grid gap-4 md:grid-cols-2 mt-4 '>
            <FormInput
              type='text'
              name='firstName'
              label='First Name'
              defaultValue={profile?.firstName}
            />
            <FormInput
              type='text'
              name='lasName'
              label='Last Name'
              defaultValue={profile?.lasName}
            />
            <FormInput
              type='text'
              name='userName'
              label='Username'
              defaultValue={profile?.userName}
            />
          </div>
          <SubmitButton size='lg' text='Update Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default ProfilePage;