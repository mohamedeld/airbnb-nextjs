'use client';
import { useState } from 'react';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import RatingInput from '@/components/form/RatingInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import { createReviewAction } from '@/utils/actions';
import SubmitButton from '../form/SubmitButton';

type SubmitReviewProps = {
  propertyId:string;
}

const SubmitReview = ({propertyId}:SubmitReviewProps) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const toggleFormVisible = ()=>{
    setIsReviewFormVisible(prev => !prev);
  }

  return (
    <div className='mt-8'>
      <Button onClick={toggleFormVisible}>Leave a Review</Button>
      {
        isReviewFormVisible && <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId}/>
            <RatingInput name="rating" />
            <TextAreaInput name="comment" labelText='your thoughts on this property' defaultValue='Amazing place' />
            <SubmitButton text="Submit" size='lg' className='mt-4'/>
          </FormContainer>
        </Card>
      }
    </div>
  )
}

export default SubmitReview