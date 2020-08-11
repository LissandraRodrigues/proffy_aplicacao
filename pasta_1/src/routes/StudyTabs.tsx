import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Vários ícones disponíveis.

import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {

    return (

        <Navigator
        
            // Estilo das abas.
            tabBarOptions = {{

                style: {

                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,


                },

                tabStyle: {

                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",

                },

                iconStyle: {

                    flex: 0, // Tira a capacidade do Icon ocupar todo o espaço.
                    width: 20,
                    height: 20,


                },

                labelStyle: {

                    fontFamily: "Archivo_700Bold",
                    fontSize: 13,
                    marginLeft: 16,

                },

                inactiveBackgroundColor: "#fafafc",
                activeBackgroundColor: "#ebebf5",
                inactiveTintColor: "#c1bccc",
                activeTintColor: "#32264d" 

            }}
        
        >

            <Screen 

                name = "TeacherList"
                component = { TeacherList }
                options = {{

                    tabBarLabel: "Proffys",
                    tabBarIcon: ( { color, size, focused }) => {

                        return (

                            <Ionicons
                            
                                name = "ios-easel"
                                size = { size }
                            
                                // Se estiver focado, muda a cor para: "#8257e5", se não, fica a cor definida mesmo.
                                color = {focused ? "#8257e5": color }
                            
                            />

                        );

                    }

                }}
                
            />
                
            <Screen 

                name = "Favorites"
                component = { Favorites }
                options = {{

                    tabBarLabel: "Favoritos",
                    tabBarIcon: ( { color, size, focused }) => {

                        return (

                            <Ionicons
                            
                                name = "ios-heart" 
                                size = { size } 
                                color = {focused ? "#8257e5": color }
                            
                            />

                        );

                    }

                }}


            />

        </Navigator>

    );

}

export default StudyTabs;
