import React, { useState } from 'react'
import {
View,
Text,
StyleSheet,
Pressable,
Image,
Dimensions,
ScrollView
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import {
request,
PERMISSIONS,
RESULTS
} from 'react-native-permissions'

import ToggleOn from '../../../assets/tab-icons/permission/Toggle.svg'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../../navigation/RootNavigator'

const phoneIcon = require('../../../assets/tab-icons/permission/phoneIcon.png')
const smsIcon = require('../../../assets/tab-icons/permission/smsIcon.png')
const locationIcon = require('../../../assets/tab-icons/permission/locationIcon.png')
const cameraIcon = require('../../../assets/tab-icons/permission/cameraIcon.png')
const micIcon = require('../../../assets/tab-icons/permission/micIcon.png')
const shieldIcon = require('../../../assets/tab-icons/permission/shieldIcon.png')

const { width } = Dimensions.get('window')

type Props = NativeStackScreenProps<RootStackParamList,'Permissions'>

export default function Permissions({navigation}:Props){

const [phone,setPhone] = useState(false)
const [sms,setSms] = useState(false)
const [location,setLocation] = useState(false)
const [camera,setCamera] = useState(false)
const [mic,setMic] = useState(false)

const requestPermission = async(type:string)=>{

let result

switch(type){

case 'phone':
result = await request(PERMISSIONS.ANDROID.READ_PHONE_STATE)
if(result === RESULTS.GRANTED) setPhone(true)
break

case 'sms':
result = await request(PERMISSIONS.ANDROID.RECEIVE_SMS)
if(result === RESULTS.GRANTED) setSms(true)
break

case 'location':
result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
if(result === RESULTS.GRANTED) setLocation(true)
break

case 'camera':
result = await request(PERMISSIONS.ANDROID.CAMERA)
if(result === RESULTS.GRANTED) setCamera(true)
break

case 'mic':
result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
if(result === RESULTS.GRANTED) setMic(true)
break

}

}

const enableAll = async()=>{

await requestPermission('phone')
await requestPermission('sms')
await requestPermission('location')
await requestPermission('camera')
await requestPermission('mic')

}

const nextStep = ()=>{

navigation.reset({
index:0,
routes:[{name:'MainTabs'}]
})

}

const PermissionItem = ({
icon,
title,
subtitle,
enabled,
type
}:any)=>{

return(

<Pressable
style={styles.card}
onPress={()=>requestPermission(type)}
>

<View style={styles.left}>

<Image source={icon} style={styles.icon}/>

<View>

<Text style={styles.title}>
{title}
</Text>

<Text style={styles.sub}>
{subtitle}
</Text>

</View>

</View>

<View style={styles.toggle}>

{enabled && <ToggleOn width={40} height={22}/>}

</View>

</Pressable>

)

}

return(

<SafeAreaView style={styles.safe}>

<ScrollView contentContainerStyle={styles.container}>

<Image source={shieldIcon} style={styles.shield}/>

<Text style={styles.heading}>
App Permissions
</Text>

<Text style={styles.desc}>
Allow Dwaari to access these features for the best experience
</Text>

<View style={{width:'100%',gap:14}}>

<PermissionItem
icon={phoneIcon}
title="Phone"
subtitle="Make and manage phone calls"
enabled={phone}
type="phone"
/>

<PermissionItem
icon={smsIcon}
title="SMS"
subtitle="Send and receive text messages"
enabled={sms}
type="sms"
/>

<PermissionItem
icon={locationIcon}
title="Location"
subtitle="Access your device location"
enabled={location}
type="location"
/>

<PermissionItem
icon={cameraIcon}
title="Camera"
subtitle="Take photos and record videos"
enabled={camera}
type="camera"
/>

<PermissionItem
icon={micIcon}
title="Microphone"
subtitle="Record audio"
enabled={mic}
type="mic"
/>

</View>

<Pressable
style={styles.enableBtn}
onPress={enableAll}
>

<Text style={styles.enableText}>
Enable All Permissions
</Text>

</Pressable>

<Pressable
style={styles.homeBtn}
onPress={nextStep}
>

<Text style={styles.homeText}>
Continue to Home
</Text>

</Pressable>

</ScrollView>

</SafeAreaView>

)

}

const styles = StyleSheet.create({

safe:{
flex:1,
backgroundColor:'#F6F7FB'
},

container:{
padding:24,
alignItems:'center'
},

shield:{
width:64,
height:64,
marginBottom:16
},

heading:{
fontSize:22,
fontWeight:'700'
},

desc:{
textAlign:'center',
color:'#6B7280',
marginTop:6,
marginBottom:20,
width:width*0.8
},

card:{
backgroundColor:'#fff',
borderRadius:14,
padding:16,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
elevation:2
},

left:{
flexDirection:'row',
alignItems:'center',
gap:12
},

icon:{
width:26,
height:26,
resizeMode:'contain'
},

title:{
fontSize:16,
fontWeight:'600'
},

sub:{
fontSize:12,
color:'#6B7280'
},

toggle:{
width:40,
height:22,
justifyContent:'center',
alignItems:'center'
},

enableBtn:{
marginTop:24,
width:'100%',
borderWidth:1,
borderColor:'#2563EB',
borderRadius:12,
paddingVertical:14,
alignItems:'center'
},

enableText:{
color:'#2563EB',
fontWeight:'600'
},

homeBtn:{
marginTop:12,
width:'100%',
backgroundColor:'#2563EB',
borderRadius:12,
paddingVertical:16,
alignItems:'center'
},

homeText:{
color:'#fff',
fontWeight:'700'
}

})