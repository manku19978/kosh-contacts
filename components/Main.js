import React, { useState } from 'react'
import { View, Button, StyleSheet, FlatList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

const Main = ({ navigation }) => {
    const [ selectedContacts, setSelectedContacts ] = useState([])

    const setContacts = (data) => {
        setSelectedContacts(data)
    }
    
    const renderItem = ({item})=> (
        <ListItem
            title={item.name}
            subtitle={item.phn[0].number}
            bottomDivider
            chevron
        />
    )

    return (
      <View style={styles.container}>

        {
            selectedContacts.length ? (
                <View>
                    <FlatList 
                        data={selectedContacts} 
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <View style={styles.btnContainer}>
                        <Button
                            title="Reset"
                            onPress={() => setSelectedContacts([])}
                            color='orange'
                        />
                    </View>
                </View>
            ) : (
                <Text style={styles.text}>No contacts selected yet. Go to next screen.</Text>
            )
        }
        
        

        <View style={styles.btnContainer}>
            <Button
            title="Go to contacts"
            onPress={() => navigation.navigate('Contacts', {setContacts})}
            color='orange'
            />
        </View>



      </View>
    );
}

export const styles = StyleSheet.create({
    btnContainer: {
        width: 150,
        alignSelf: 'center',
        paddingTop: 20
      },
    container: {
        flex:1, 
        flexDirection: 'column', 
        padding: 10  
    },
    text: {
        alignSelf: 'center',
    }
  })

export default Main