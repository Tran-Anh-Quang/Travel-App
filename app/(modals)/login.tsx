import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmupBrowser'

const Page = () => {
  useWarmUpBrowser();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  }
})
export default Page