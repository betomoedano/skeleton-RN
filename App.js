import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';
import useSWR from 'swr';

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

function MySkeleton () {
  const [dark, toggle] = React.useReducer((s) => !s, true)

  const colorMode = dark ? 'dark' : 'light'
  return (
    <Pressable onPress={toggle} style={styles.container}>
    <MotiView
    transition={{
      type: 'timing',
    }}
    style={styles.skeletonContainer}
    animate={{ backgroundColor: dark ? '#000000' : '#ffffff' }}
  >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
      <View style={{paddingLeft: 20}}>
        <Skeleton colorMode={colorMode} width={250} height={15} />
        <Spacer height={10}/>
        <Skeleton colorMode={colorMode} width={200} height={15}/>
        <Spacer height={10}/>
        <Skeleton colorMode={colorMode} width={150} height={15}/>
      </View>
    </View>
    <Spacer />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'space-between'}}>
        <Skeleton colorMode={colorMode} width={20} height={15} />
        <Skeleton colorMode={colorMode} width={20} height={15}/>
        <Skeleton colorMode={colorMode} width={20} height={15}/>
      </View>
        <Skeleton colorMode={colorMode} width={100} height={15}/>
    </View>
    <Spacer />
    <View>
        <Skeleton colorMode={colorMode} width={'100%'} height={15} />
        <Spacer height={10}/>
        <Skeleton colorMode={colorMode} width={'90%'} height={15}/>
        <Spacer height={10}/>
        <Skeleton colorMode={colorMode} width={'95%'} height={15}/>
    </View>
    <Spacer height={10}/>
    <Skeleton colorMode={colorMode} width={'100%'} height={250} />
  </MotiView>
  </Pressable>
  ) 
}

function UserInfo() {
  const fetcher = (url) => fetch(url).then(r => r.json())
  const { data } = useSWR('https://randomuser.me/api', fetcher, {suspense: true})
  const useData = data.results[0];

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: useData.picture.large}}/>
        <View style={{paddingLeft: 20}}>
          <Text style={{fontSize: 22, color: 'white'}}>{useData.name.first}</Text>
          <Text style={{fontSize: 22, color: 'white'}}>{useData.name.last}</Text>
          <Text style={{fontSize: 22, color: 'white'}}>{useData.gender}</Text>
        </View>
      </View>
      <Text style={{fontSize: 22, color: 'white'}}>{useData.email}</Text>
      <Text style={{fontSize: 22, color: 'white'}}>{useData.cell}</Text>
      <Image style={{width: 300, height: 200, borderRadius: 10, marginTop: 20}} source={{uri: useData.picture.large}}/>
    </>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <React.Suspense fallback={<MySkeleton/> }>
        <UserInfo />
      </React.Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
