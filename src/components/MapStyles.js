import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    markerView: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    markerText: {
        color: 'black'
    },
    searchButton: {
        position: 'absolute',
        flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 25, 
        gap: 5, 
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { 
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        elevation:5, 
    },
    searchIcon: {
        color: 'darkgreen',
    },
    searchText: {
        color: 'darkgreen',
        fontWeight: '500',
    },
});
