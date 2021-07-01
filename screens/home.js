import React,{Component} from "react";
import {View,Text,FlatList, Alert,StyleSheet, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            listData:[],
            url:'http://localhost:5000'
        }
    }

    componentDidMount(){
        this.getPlanets();
    }

    getPlanets=()=>{
        const { url } = this.state;
        axios.get(url).then(response => {
            return this.setState({
            listData: response.data.data
            });
        }).catch(error => {
            Alert.alert(error.message);
        });
    }

    renderItem=()=>(
        <ListItem
            key={index}
            title={`Planet:${item.name}`}
            subtitle={`DistanceFromEarth:${item.distance_from_earth}`}
            titleStyle={styles.title}
            containerStyle={styles.listContainer}
            bottomDivider
            onPress={()=>this.props.navigation.navigate("Details",{planet_name:item.name})}
        />
    )

    keyExtractor=(item,index)=>index.toSting();

    render(){
        const {listData}=this.state;
        if(listData.length===0){
            return(
                <View>
                    <Text>
                        'Loading'
                    </Text>
                </View>
            );
        }
        return(
            <View>
                <SafeAreaView/>
                <View>
                    <Text>
                        Planets World
                    </Text>
                </View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });