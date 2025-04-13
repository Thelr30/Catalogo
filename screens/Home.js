import React, { useState } from 'react';
import { Icon } from '@rneui/themed';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TextInput,
 ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");
    const data = [
        { id: 1, name: "Alambre de cobre tipo THW", image: require("../assets/Alambre 1.jpg"), detail: "Detail" },
        { id: 2, name: "Alambre Dúplex tipo TWD", image: require("../assets/Alambre 2.jpg"), detail: "Detail2" },
        { id: 3, name: "Cable de cobre tipo TF-LS 600V", image: require("../assets/Cable 1.jpg"), detail: "Detail3" },
        { id: 4, name: "Cable de cobre tipo THW", image: require("../assets/Cable 2.jpg"), detail: "Detail4" },
        { id: 5, name: "Cable de uso rudo tipo SJT", image: require("../assets/Cable 3.jpg"), detail: "Detail5" },
        { id: 6, name: "Cable POT flexible tipo SPT", image: require("../assets/Cable 4.jpg"), detail: "Detail6" },
        { id: 7, name: "Cable uso rudo 2 por 10 tipo PVC", image: require("../assets/Cable 5.jpg"), detail: "Detail7" },
        { id: 8, name: "Cordón flexible Naranja Uso Rudo tipo SJT", image: require("../assets/Cable 6.jpg"), detail: "Detail8" },
        { id: 9, name: "Cordones y cables flexibles PVC", image: require("../assets/Cable 7.jpg"), detail: "Detail9" },
    ];

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
       <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
          <StatusBar translucent={false} backgroundColor={"#fff"} barStyle={"dark-content"} />
          <View style={styles.header}>
            <Text style={styles.textoProfile} >Catálogo</Text> 
            <Image source={require("../assets/Viakon.jpg")} style={styles.profileImage}/> 
          </View>

          <View style={styles.inputContainer}>
             <Icon raised name="search" type="font-awesome" size={12} color={"#ccc"}/>
             <TextInput placeholder="Buscar" value={searchText} onChangeText={setSearchText} />
          </View>

          <Text style={styles.result}>{filteredData.length} Resultados Encontrados</Text>

          <ScrollView>
              {filteredData.map(item => (
                  <TouchableOpacity key={item.id} style={styles.contenedorImage} onPress={() => navigation.navigate(item.detail)}>
                      <ImageBackground source={item.image} style={styles.estiloImagenes}>
                          <Text style={styles.textoSale}>En Venta</Text>
                          <View style={styles.contenedorInfor}>
                              <Text style={styles.textoInfo}>{item.name}</Text>
                          </View>
                      </ImageBackground> 
                  </TouchableOpacity>
              ))}
          </ScrollView>
       </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    header:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:20,
    },
    profileImage:{
        width:50,
        height:50,
        borderRadius:50,
    },
    textoProfile:{
        fontSize:22,
        fontWeight:'bold',
    },
    inputContainer:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:12,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30,
        borderBottomWidth:0.5,
        borderBottomColor:'slategray',
    },
    result:{
        fontSize:18,
        fontWeight:'bold',
        paddingHorizontal:20,
    },
    contenedorImage:{
        margin:20,
    },
    estiloImagenes:{
        height:230,
        justifyContent: 'flex-end',
        padding: 10,
    },
    textoSale:{
        position:'absolute',
        top:10,
        right:10,
        color:'white',
        backgroundColor:'#00CCFF',
        height:33,
        width:93,
        borderRadius:20,
        marginTop:10,
        marginLeft:10,
        paddingLeft:10,
        paddingTop:5,
        fontWeight:'bold',
    },
    contenedorInfor:{
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        borderRadius: 5,
    },
    textoInfo:{
        color:'white',
        fontWeight:'800',
        fontSize:16
    }
});

