import React from 'react';
import ReviewCard from './ReviewCard';
import ReviewSearch from './ReviewSearch';

const BrowseReview = () => {
    return (
        <div>
            <ReviewSearch></ReviewSearch>
            <ReviewCard courseTitle="CS771A: Intro to Machine Learning" courseRating="4.6"></ReviewCard>
        </div>
    );
};

export default BrowseReview;