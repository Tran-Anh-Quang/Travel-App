import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings@public.json'
import ListingsMap from '@/components/ListingsMap'
import ListingsDataGeo from '@/assets/data/airbnb-listings@public.geo.json'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    console.log('CHANGE_', category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
      }}/>
      {/* <Listings listings={items} category={category}/> */}
      <ListingsMap listings={ListingsDataGeo}/>
    </View>
  )
}

export default Page