import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from "../Components/context";
import AuthAPI from "../services/AuthAPI";
import UsersAPI from "../services/UsersAPI";
import useInterval from "../Components/UseInterval";

export function DrawerContent(props) {
    const { signOut } = React.useContext(AuthContext);
    const [notif, setNotif] = useState(0);

    const getUserId = async () => {
        const id = await AuthAPI.getId();
        fetchNotifications(id);
    }

    const fetchNotifications = async (id) => {
        const response = await UsersAPI.getNotifications(id);
        setNotif(response.convocations.length+response.notif.length);
    }


    useInterval(() => {
        getUserId();
    }, 60000);

    useEffect(() => {
        getUserId();
    }, []);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {/*<View style={{flexDirection:'row',marginTop: 15}}>*/}
                            {/*<Avatar.Image*/}
                                {/*source={{*/}
                                    {/*uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'*/}
                                {/*}}*/}
                                {/*size={50}*/}
                            {/*/>*/}
                            {/*<View style={{marginLeft:15, flexDirection:'column'}}>*/}
                                {/*<Title style={styles.title}>John Doe</Title>*/}
                                {/*<Caption style={styles.caption}>@j_doe</Caption>*/}
                            {/*</View>*/}
                        {/*</View>*/}

                        {/*<View style={styles.row}>*/}
                            {/*<View style={styles.section}>*/}
                                {/*<Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>*/}
                                {/*<Caption style={styles.caption}>Following</Caption>*/}
                            {/*</View>*/}
                            {/*<View style={styles.section}>*/}
                                {/*<Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>*/}
                                {/*<Caption style={styles.caption}>Followers</Caption>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="calendar"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Calendrier"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profil"
                            onPress={() => {props.navigation.navigate('Profil')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="message"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Chat"
                            onPress={() => {props.navigation.navigate('Chat')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="flag"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={notif + " Notifications"}
                            onPress={() => {props.navigation.navigate('Notif')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Déconnexion"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});