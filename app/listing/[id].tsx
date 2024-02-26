import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings@public.json'
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Listing } from '../interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { TouchableOpacity } from 'react-native';

const IMG_HEIGHT = 300;
const { width} = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }> ();
    const listing: Listing = (listingsData as any[]).find((item) => item.id === id);
  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <Animated.Image source={{ uri: listing.xl_picture_url }} style={styles.image}/>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>

          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>

          <Text style={styles.rooms}>
            {listing.guests_included} guests &middot; {listing.bedrooms} bedrooms &middot; {listing.bed_type} bed type 
            &middot; {listing.bathrooms} bathrooms
          </Text>

          <View style={{ flexDirection: 'row', gap: 4}}>
            <Ionicons name='star' size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} &middot; {listing.number_of_reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url}} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16}}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          
          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>$ {listing.price}</Text>
            <Text>/ night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20}]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
      height: IMG_HEIGHT,
      width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
});

export default Page