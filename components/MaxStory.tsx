import { useEffect, useState } from 'react';
import CardForLimit from './CardForLimit';
import { getMaxStories } from '@/utils/actions/database/getMaxStories';

export default async function MaxStory() {

    const storiesData = await getMaxStories();

    return (
        <CardForLimit stories={storiesData!!}></CardForLimit>
    );
}
