import React from 'react';
import FindMealsPage from '../../../components/pages/find-meals/FindMealsPage';
import WithAuth from '@/role-wrappers/WithAuth';

const page = () => {
    return (
        <WithAuth>
            <FindMealsPage />
        </WithAuth>
    );
};

export default page;