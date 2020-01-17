//useEffect é para montar algo assim que o componente carregar em tela.
import React, {useState,useEffect} from 'react';
//Importar os estilos pra não deixar inline
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native'
//Importamos o mapa pra dentro desse arquivo. //Importamos marcações
import MapView, {Marker, Callout} from 'react-native-maps'
//Importar a localização
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

import{MaterialIcons} from '@expo/vector-icons'


//Pego o navigation que é o props padrão dele, já com a desestruturação e paço la no onpress
function Main({navigation}){
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
        <MapView initialRegion={currentRegion} style={styles.map} >
            <Marker coordinate={{latitude:-22.9555537 , longitude: -46.5451525}}>
                <Image style={styles.avatar} source={{uri:'https://avatars1.githubusercontent.com/u/59746951?s=460&v=4'}} />
                <Callout onPress={()=>{
                    navigation.navigate('Profile',{ github_username: 'edonejunior' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Edvaldo Junior</Text>
                        <Text style={styles.devBio}>Teste da BIO hsauhsuahusuhsuau</Text>
                        <Text style={styles.devTechs}>PHP, React, Node Js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        
        <View style={styles.seachForm} >
            <TextInput 
            style={styles.seachInput}
            placeholder="Buscar dev por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            />

            <TouchableOpacity onPress={()=>{}} style={styles.loadButton}>
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
        bottom:20,
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
        
    }

})

export default Main