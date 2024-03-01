import { ListingGeo } from '@/app/interfaces/listingGeo';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 37.83,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
    const router = useRouter();

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
            animationEnabled={false} 
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>$ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
});

export default ListingsMap;
