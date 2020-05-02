import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { Button, Card, CardItem, Input, Item, List, ListItem} from 'native-base';
import * as APIS from './API';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Asteroid_ID: "",
            IsDisabled: true,
            ShowRandomList: false,
            Asteroid_ID_Date: null,
            Asteroid_ID_List: [],
        };
    }

    updateField(itemValue) {
        this.state.Asteroid_ID = itemValue;
        this.state.IsDisabled = (itemValue == '') ? true : false;
        this.setState({});
    }
    fetchData(itemValue){
        if(itemValue == 'random') {
            this.setState({
                ShowRandomList: true
            });
            fetch(APIS.Random_Url).then(response => {
                return response.json();
            }).then(responseJson => {
                if(responseJson != null) {
                    let objects = responseJson.near_earth_objects;
                    console.log("Object-->", objects.length);
                    let asteroid_ids = [];
                    for(let i = 0; i < objects.length; i++) {
                        asteroid_ids.push(
                            <ListItem onPress = {() => this.updateField(objects[i].id)}>
                                <Text>{objects[i].id}</Text>
                            </ListItem>);
                    }
                    this.setState({
                        Asteroid_ID_Date: null,
                        Asteroid_ID_List: asteroid_ids
                    });
                }
            }).catch(error => {
                console.error(error);
            })
        }else {
            this.setState({
                ShowRandomList: false
            });
            fetch(APIS.BASE_URL + this.state.Asteroid_ID + "api_key=" + APIS.API_KEY).then(response => {
                return (response.status != 404 ) ? response.json() : null;
            }).then(responseJson => {
                console.log("responseJson----------------->", JSON.stringify(responseJson));
                let asteroid_id_date = [];
                if(responseJson != null) {
                    asteroid_id_date.push(
                        <View> <ListItem> <Text>name: <Text style={CommonStyle.BoldText}>{responseJson.name}</Text></Text>
                            </ListItem>
                            <ListItem>
                                <Text>nasa_jpl_url: <Text style={CommonStyle.BoldText}>{responseJson.nasa_jpl_url}</Text></Text>
                            </ListItem>
                            <ListItem>
                                <Text>is_potentially_hazardous_asteroid: <Text style={CommonStyle.BoldText}>{responseJson.is_potentially_hazardous_asteroid.toString()}</Text></Text>
                            </ListItem>
                        </View>
                    )
                }else {
                    asteroid_id_date.push(
                        <View>
                            <ListItem>
                                <Text>No Data available</Text>
                            </ListItem>
                        </View>
                    );
                }
                this.setState({
                    Asteroid_ID_List: [],
                    asteroid_id_date: asteroid_id_date
                });
            }).catch(error => {
                console.error(error);
            })
        }
    }
    randomList () {
        if(this.state.ShowRandomList) { 
            return this.state.Asteroid_ID_List;
        } else{
            this.state.Asteroid_ID_Date;
        }
    }
    render(){
        return (
            <View style={CommonStyle.Container}>
                <Card>
                    <CardItem>
                        <Text>
                            <Input value={this.state.Asteroid_ID} placeholder="Enter Asteroid ID" onChangeText={(value) => this.updateField(value)}></Input>
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            <Button style={[(this.state.IsDisabled) ? CommonStyle.DisableButton : CommonStyle.EnableButton]} disabled={this.state.IsDisabled} onPress={() => this.fetchData('normal')}>
                                <Text style= {CommonStyle.ButtonText} >Submit</Text>
                            </Button>
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            <Button style={CommonStyle.EnableButton} onPress={() => this.fetchData('random')}>
                                <Text style= {CommonStyle.ButtonText}>Random Asteroid</Text>
                            </Button>
                        </Text>
                    </CardItem>
                </Card>
                <Card>
                    <SafeAreaView>
                        <ScrollView>
                            <List>{ this.randomList()  // (this.state.ShowRandomList) ? (this.state.Asteroid_ID_List) : (this.state.Asteroid_ID_Date)
                                }
                            </List>
                        </ScrollView>
                    </SafeAreaView>
                </Card>
            </View>
        )
    }
};

export const CommonStyle = StyleSheet.create({
    Container: {
        flex: 1
    },
    DisableButton : {
        backgroundColor: '#D3D3D3'
    },
    EnableButton : {
        backgroundColor: 'blue'
    },
    ButtonText : {
        width: '100%',
        textAlign: 'center',
        color: '#ffffff',
        textTransform: 'uppercase'
    },
    BoldText:{
        fontWeight: 'bold'
    }
})

export default Welcome;