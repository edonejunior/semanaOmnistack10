//useEffect é para montar algo assim que o componente carregar em tela.
import React, {useState,useEffect} from 'react';
//Importar os estilos pra não deixar inline
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native'
//Importamos o mapa pra dentro desse arquivo. //Importamos marcações
import MapView, {Marker, Callout} from 'react-native-maps'
//Importar a localização
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

import{MaterialIcons} from '@expo/vector-icons'

import api from '../services/api';
import socket, { connect } from '../services/socket';


//Pego o navigation que é o props padrão dele, já com a desestruturação e paço la no onpress
function Main({navigation}){
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');
    //Criamos um estado para armazenar as cordenadas iniciais
    const [currentRegion, setCurrentRegion] = useState(null);
    //Colocamos ele na função, que recebe uma função e quando executar
    useEffect(()=>{
        async function loadInitialPosition(){
            //Esse request retorna um objeto com informações sobre a permissão do usuário
            const {granted} = await requestPermissionsAsync();

            //Se ele deu permissão (granted) ele vai pegar a posição do usuário com essa função
            if(granted){
                //usando a desestruturação eu to pegando apenas as cordenadas do objeto passado
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true
                });
                //Aqui desestruturo novamente e pego somente a latitude e longitude.
                const {latitude, longitude} = coords;

                //Aqui passamos as cordenadas e inclusive esse Delta é para o zoom, calculos navais
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04 ,
                    longitudeDelta: 0.04,

                })
            }
        }
        loadInitialPosition()
    },[]);

    function setupWebsocket(){
        const {latitude, longitude} = currentRegion;
        
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs(){
        const {latitude, longitude} = currentRegion;
       
        const response = await api.get('/search',{
            params: {
                latitude, 
                longitude, 
                techs,
            }
        });
        setDevs(response.data.devs);
        
        setupWebsocket();

    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    //Enquanto não tiver preenchido ele n volta nada, sómente mostrara quando carregar.
    if(!currentRegion) {
        return null
    }
    //Agora estamos passando o estilo que criamos abaixo
    //Agora passamos a posição inicial que calculamos acima
    //Abrimos o map e usamos como tag e usamos o marker dentro dele.
    //Dentro do marker mudamos a imagem
    //onPress é quando clicar
    return (
    <>
        <MapView 
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion} 
        style={styles.map} >
           {devs.map(dev=>(
             <Marker
             key={dev._id}
             coordinate={{
                 latitude:dev.location.coordinates[1] , 
                 longitude: dev.location.coordinates[0]}} >
             <Image 
             style={styles.avatar} 
             source={{uri:dev.avatar_url}} />
             <Callout onPress={()=>{
                 navigation.navigate('Profile',{ github_username: dev.github_username })
             }}>
                 <View style={styles.callout}>
                     <Text style={styles.devName}> {dev.name} </Text>
                     <Text style={styles.devBio}> {dev.bio} </Text>
                     <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                 </View>
             </Callout>
            </Marker>   
           ))}
        </MapView>
        
        <View style={styles.seachForm} >
            <TextInput 
            style={styles.seachInput}
            placeholder="Buscar dev por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
            />

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
    );
    
} 

//Criar um objeto de estilos
const styles = StyleSheet.create({
    map: {
        flex:1
    }, 

    avatar: {
        width: 54,
        height: 54,
        borderRadius:4,
        borderWidth: 4,
        borderColor: '#FFF'
    }, 
    callout:{
        width: 260,
    },
    devName:{
        fontWeight:'bold',
        fontSize:16,
    },
    devBio:{
        color:'#666',
        marginTop:5,
    },
    devTechs:{
        marginTop:5,
    },
    seachForm:{
        position:'absolute',
        top:20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row',
    },
    seachInput:{
        flex:1,
        height:50,
        backgroundColor:'#FFF',
        color:'#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor: '#000',
        shadowOpacity:0.2,
        shadowOffset:{
            width:4,
            height:4,
        },
        elevation:2,
    },
    loadButton:{
        width:50,
        height:50,
        backgroundColor:'#8E4Dff',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15,
    }

})

export default Main