import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Exhibitors from './Exhibitors';

const Distance = React.memo(({ getFormattedDistance, followUserMode }) => {
    return (
        <>
            {followUserMode ? (
        <>
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 10, alignItems: 'baseline', justifyContent: 'flex-start', width: '25%' }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 26, fontWeight: '700', color: 'darkgreen' }}>
                        {`${getFormattedDistance()}`}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: '300', color: 'gray' }}>
                        Metros
                    </Text>
                </View>
            </View>
        </>
            
            
            ) : (
                <Text style={{ fontSize:16, fontWeight: '500', color: 'darkgreen', paddingVertical: 20 }}>
                    {`A ${getFormattedDistance()} metros de distancia`}
                </Text>
            )}
        </>
    );
});



const BottomSheet = ({
    slideAnim,
    heightAnim,
    selectedExhibitor,
    distance,
    formatDistance,
    onMapPress,
    navigationMode,
    toggleNavigationMode,
    isSearchMode,
    selectExhibitor,
    followUserMode,
    toggleFollowUserMode,
    adjustCamera
}) => {

    const [isImageLoading, setImageLoading] = React.useState(false);

    const getFormattedDistance = React.useCallback(() => {
        return formatDistance(distance);
    }, [distance, formatDistance]);

    const renderSearchMode = React.useCallback(() => (
        <Animated.View
            style={{
                height: heightAnim.interpolate({
                    inputRange: [0, 0],
                    outputRange: ['0%', '90%']
                }),
                position: 'absolute',
                bottom: slideAnim, 
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: 'white',
                borderRadius: 20,
                shadowOpacity: 0.2,
                elevation: 3,
            }}>
            <Exhibitors onMapPress={onMapPress} selectExhibitor={selectExhibitor} />
        </Animated.View>
    ), [heightAnim, slideAnim, onMapPress, selectExhibitor]);
    
    const renderNormalMode = React.useCallback(() => (
        <Animated.View
            style={{
                height: heightAnim.interpolate({
                    inputRange: [60, 100],
                    outputRange: ['0%', '50%']
                }),
                position: 'absolute',
                bottom: slideAnim,
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { 
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.5,
                borderRadius: 20,
                justifyContent: 'space-around',
                paddingBottom: 20,
                elevation: 20,
            }}> 
            {selectedExhibitor && (
                <>
                    <View style={{ flexDirection: 'row', alignItems:'flex-start', justifyContent: 'space-between', alignItems: 'center', paddingVertical:10}}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', paddingLeft:20 }}>{selectedExhibitor.name}</Text>                         
                        <TouchableOpacity style={{paddingRight:20}} onPress={onMapPress}>
                            <AntDesign name="close" size={22} color="darkgreen" />
                        </TouchableOpacity>
                    </View>

                    <View style={{height: 1, backgroundColor: '#E0E0E0', marginLeft: 20, marginRight: 20, marginBottom: 5}} />
                
                    <View style={{flex: 1, justifyContent:'center', alignItems: 'center', gap: 15, paddingHorizontal: 15}}>
                    <ScrollView
                        style={{ maxHeight: selectedExhibitor.image ? 70 : 180, width: '100%', marginTop: navigationMode ? 5 : 0 }}>
                        {!navigationMode || !selectedExhibitor.image ? (
                            <Text style={{ fontSize:16 }}>{selectedExhibitor.description}</Text>
                        ) : null}
                    </ScrollView>
                        {selectedExhibitor.image ? (
                            <View style={{ width: '100%', height: Dimensions.get("screen").height*0.15, justifyContent: 'center', alignItems: 'center', borderRadius: 15, overflow: 'hidden', borderWidth: 0.15, borderColor: 'darkgreen' }}>
                                {isImageLoading && 
                                    <ActivityIndicator size="large" color="darkgreen" style={{ position: 'absolute' }}/>
                                }
                                <Image 
                                    source={{ uri: selectedExhibitor.image }} 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        resizeMode: 'cover', 
                                        opacity: isImageLoading ? 0 : 1 
                                    }} 
                                    onLoadStart={() => setImageLoading(true)}
                                    onLoadEnd={() => setImageLoading(false)}
                                />
                            </View>
                        ) : null}
                    </View>
                </>
            )}
            {selectedExhibitor ? (
                navigationMode ? (
                    <>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Distance getFormattedDistance={getFormattedDistance} />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection:'row', paddingBottom: 5, gap: 15}}>
                        <TouchableOpacity onPress={toggleFollowUserMode} style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', padding:12, borderRadius: 25, gap: 5, backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { 
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            elevation:5, }}>
                            <MaterialCommunityIcons name="navigation" size={24} color="darkgreen" />
                            <Text style={{fontSize:15, color: 'darkgreen', fontWeight: '500'}}>Iniciar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleNavigationMode} style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', padding:12, borderRadius: 25, gap: 5, backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { 
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            elevation:5, }}>
                            <MaterialCommunityIcons name="cancel" size={24} color="darkgreen" />
                            <Text style={{fontSize:15, color: 'darkgreen', fontWeight: '500'}}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                ) : 
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingTop:5}}>
                        <TouchableOpacity onPress={toggleNavigationMode} style={{marginTop: 5,flexDirection:'row', justifyContent: 'center', alignItems: 'center', padding:12, borderRadius: 25, gap: 5, backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { 
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            elevation:5, }}>
                            <MaterialCommunityIcons name="arrow-right-top" size={24} color="darkgreen" />
                            <Text style={{fontSize:15, color: 'darkgreen', fontWeight: '500'}}>Como llegar</Text>
                        </TouchableOpacity>
                    </View>
                    
            ) : null}
            
        </Animated.View>
    ), [heightAnim, slideAnim, selectedExhibitor, onMapPress, navigationMode, toggleNavigationMode, isImageLoading, distance]);    

    return (
        <>
            {followUserMode ? 
                <Animated.View
                style={{
                    height: heightAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['100%', '60%']
                    }),
                    position: 'absolute',
                    bottom: slideAnim, 
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    shadowOpacity: 0.2,
                    elevation: 5,
                }}>
                    <View style={{flex:1,padding: 10}}>
                        <View style={{ flexDirection: 'row', alignItems:'flex-start', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5}}>
                            <Text style={{ color: 'gray', fontSize: 20, fontWeight: '500', textAlign: 'left', paddingLeft:10 }}>En camino a {selectedExhibitor.name}</Text>                         
                            <TouchableOpacity style={{paddingRight:5}} onPress={onMapPress}>
                                <AntDesign name="close" size={24} color="darkgreen" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center'}}>
                            <Distance getFormattedDistance={getFormattedDistance} followUserMode={followUserMode} />
                            <TouchableOpacity onPress={adjustCamera} style={{borderWidth:1, padding: 10, borderRadius:50, borderColor:'gray'}}>
                                <MaterialCommunityIcons name="navigation-variant" size={30} color="darkgreen" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View> 
                : 
                (isSearchMode ? renderSearchMode() : renderNormalMode())
            }
        </>
    );
    
};

export default React.memo(BottomSheet);

