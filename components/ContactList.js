import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import { View, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { styles } from './Main'

const ContactScreen = ({ navigation, route }) => {
    const [contactList, setContactList] = useState([])
  
    const fetchData = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        let list
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS,
                Contacts.EMAILS,
            ],
            sort: Contacts.SortTypes.FirstName
            });
    
            if (data.length > 0) {
                const contact = data;
                list = contact.map(item => {
                    const { id, name } = item
                    return {
                        id,
                        name,
                        isSelected: false,
                        phn: item.phoneNumbers
                    }
                })    
            }
        }
        return list 
    }

    useEffect(() => {
        fetchData()
            .then(data => {
                const validatedData = data.filter(item => {
                    return item.phn && item.phn[0].number
                })

                setContactList(validatedData)
            })
            .catch(err => {
                throw err
            })   
    }, []) 

    const pressHandler = (id) => {
        const withSelectedList = contactList.map(contact => {
            if( contact.id == id) {
                contact.isSelected = !contact.isSelected
            }
            return {...contact}
        })
        setContactList(withSelectedList)
    }

    const renderItem = ({item})=> (
        <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <ListItem
                title={item.name}
                subtitle={item.isSelected ? 'Selected' : 'Not Selected'}
                bottomDivider
                chevron
            />
        </TouchableOpacity>
    )

    const goToHome = () => {
        const selectedArray = contactList.filter(contact => {
            return contact.isSelected == true
        })

        if(selectedArray.length) {
            route.params.setContacts(selectedArray)
            navigation.navigate('Home')
        } else {
            alert('You have not selected any contact')
        }
    }

    return (
        <View style={styles.container}>

            <FlatList 
                data={contactList} 
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <View style={styles.btnContainer}>
                <Button
                    title="Done selecting contacts"
                    onPress={goToHome}
                    color='orange'
                />
            </View>

        </View>
    )
}

export default ContactScreen
  