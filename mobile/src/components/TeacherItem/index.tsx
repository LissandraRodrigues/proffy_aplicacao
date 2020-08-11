import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeArea } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";
import api from "../../services/api";

export interface Teacher {

    id: number;
    avatar: string;
    bio: string;
    cost: string;
    name: string;
    subject: string;
    whatsapp: string;

}

interface TeacherItemProps {

    teacher: Teacher;
    favorited: boolean;

}

const TeacherItem: React.FC<TeacherItemProps> = ( { teacher, favorited } ) => {

    // Sempre que uma variável pode ser manipulada pelo o usuário, ela precisar estar no estado.
    const [ isFavorited, setIsFavorited ] = useState(favorited);

    async function handleToggleFavorite() {

        // Pega os favoritos no banco de dados.
        const favorites = await AsyncStorage.getItem("favorites");

        let favoritesArray = [];

        // Se tiver alguma coisa (algum favorito).
        if (favorites) {

            // Coloca no array todos os favoritos.
            favoritesArray = JSON.parse(favorites);

        }
        
        // Retira dos favoritos.

        if(isFavorited) {

            // Verifica-se um id dentro do BD é igual ao id do professor.
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {

                 return teacherItem.id === teacher.id;   

            });

        favoritesArray.splice(favoriteIndex, 1);

        setIsFavorited(true);

        // Adiciona dos favoritos.

        } else {

            // Adiciona o novo favorito.
            favoritesArray.push(teacher);

            setIsFavorited(true);

        }

        // Atualiza o banco de dados.
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));

    }

    function handleLinkToWhatsapp() {

        // Atualiza o número de conexões realizadas.
        api.post("connections", {

            user_id: teacher.id,

        })

        Linking.openURL(`whatsapp://send?phone=${ teacher.whatsapp }`)

    }

    return (
   
        <View style = { styles.container }>

            <View style = { styles.profile } >

                <Image

                    style = { styles.avatar }
                    source = {{ uri: teacher.avatar }}
                
                />

                <View style = { styles.profileInfo }>

                    <Text style = { styles.name }>

                        { teacher.name }

                    </Text>

                    <Text style = { styles.subject }>

                        { teacher.subject }

                    </Text>

                </View>

            </View>

            <Text style = { styles.bio }>

                { teacher.bio }

            </Text>

            <View style = { styles.footer } >

                <Text style = { styles.price }>

                    Preço/hora { "  " }

                    <Text style = { styles.priceValue }>
                        
                        R$ { teacher.cost }

                    </Text> 

                </Text>

                <View style = { styles.buttonsContainer } >

                    <RectButton    

                        onPress = { handleToggleFavorite }
                    
                        style = {[ 
                            
                            styles.favoriteButton, 
                            
                            isFavorited ? styles.favorited : {},
                        
                        ]}
                    
                    >

                        { isFavorited
                        
                            ? <Image source = { heartOutlineIcon } /> 
                            : <Image source = { unfavoriteIcon } />

                        }

                    </RectButton>

                    <RectButton
                    
                        style = { styles.contactButton}
                        onPress = { handleLinkToWhatsapp }
                    
                    >

                        <Image source = { whatsappIcon } />

                        <Text style = { styles.contactButtonText }>

                            Entrar em contato

                        </Text>

                    </RectButton>

                </View>

            </View>

        </View>

    );

}

export default TeacherItem;


