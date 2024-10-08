import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Exhibitors from './Exhibitors';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { SeparatorComponent } from './SeparatorComponent';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translate, translations } from '../util/utils';

const Distance = React.memo(({ getFormattedDistance, followUserMode, loading }) => {
    const [localLoading, setLocalLoading] = React.useState(true);
    const [distanceData, setDistanceData] = React.useState({ value: 0, unit: 'metros' });
    const { theme } = React.useContext(ThemeContext)
    const { languageState } = useLanguage();
    const [translation, setTranslation] = React.useState(translations.es);

    React.useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    React.useEffect(() => {
        setLocalLoading(true);
        if (!loading) {
            const newDistanceData = getFormattedDistance();
            setDistanceData(newDistanceData);
            setLocalLoading(false);
        }
    }, [loading, getFormattedDistance, followUserMode]);

    return (
        <>
            {localLoading && !followUserMode ? (
                <ActivityIndicator size="small" color={theme.customColors.activeColor} style={{ paddingHorizontal: 10 }} />
            ) : (
                followUserMode ? (
                    <>
                        <View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'baseline', justifyContent: 'flex-start', width: Dimensions.get("screen").width * 0.696, paddingLeft: 10 }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                {distanceData.value > 5 ? (
                                    <>
                                        <Text style={{ fontSize: 24, fontWeight: '700', color: theme.customColors.activeColor }}>
                                            {distanceData.value}
                                        </Text>
                                        <Text style={{ fontSize: 20, fontWeight: '300', color: 'gray' }}>
                                            {distanceData.unit}
                                        </Text>
                                    </>
                                ) : (
                                    <Text style={{ fontSize: 24, fontWeight: '600', color: theme.customColors.activeColor }}>
                                        {translation.bottomSheetNavigator.youHaveArrived}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </>
                ) : (
                    distanceData.value > -1 && !localLoading && (
                        <Text style={{ fontSize: 18, fontWeight: '500', color: theme.customColors.activeColor, paddingVertical: 20, textAlign: 'center' }}>
                            {distanceData.value <= 5
                                ? translation.bottomSheetNavigator.youAreAtTheSite
                                : (`${distanceData.value} ${distanceData.unit} ${translation.bottomSheetNavigator.distanceAway2}`)}
                        </Text>
                    )
                )
            )}
        </>
    );
});

const BottomSheet = ({
    slideAnim,
    heightAnim,
    selectedExhibitor,
    distance,
    onMapPress,
    navigationMode,
    toggleNavigationMode,
    isSearchMode,
    selectExhibitor,
    followUserMode,
    toggleFollowUserMode,
    adjustCamera,
    loading,
    cameraAdjusted,
}) => {

    const timeoutRef = React.useRef();
    const { theme } = React.useContext(ThemeContext)
    const { languageState } = useLanguage();
    const { language } = languageState
    const [translation, setTranslation] = React.useState(translations.es);
    const [translatedDescription, setTranslatedDescription] = React.useState('')
    const [translating, setTranslating] = React.useState(false)

    React.useEffect(() => {
        const fetchTranslations = async () => {
            setTranslating(true)
            try {
                const translated = await translate(selectedExhibitor.description, language);
                setTranslatedDescription(translated);

            } catch (error) {
                console.log('Error translating:', error);

                setTranslatedDescription(selectedExhibitor.description);
            } finally {
                setTranslating(false);
            }
        };
        if (language) {
            fetchTranslations();
        }
    }, [languageState, selectedExhibitor]);

    React.useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);
    React.useEffect(() => {
        const { value } = getFormattedDistance();
        if (followUserMode && navigationMode && value < 5) {
            timeoutRef.current = setTimeout(() => {
                onMapPress();
            }, 10000);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [followUserMode, navigationMode, distance, getFormattedDistance, onMapPress]);

    const [isImageLoading, setImageLoading] = React.useState(false);

    const getFormattedDistance = React.useCallback(() => {
        const rawDistance = Math.round(distance);

        if (typeof rawDistance !== 'undefined' && rawDistance !== null) {
            if (rawDistance >= 1000) {
                return { value: (rawDistance / 1000).toFixed(1), unit: 'km' };
            } else {
                return { value: rawDistance, unit: translation.bottomSheetNavigator.meters }; // para metros
            }
        } else {
            return { value: 0, unit: translation.bottomSheetNavigator.meters }; // Ejemplo de valor por defecto
        }

    }, [distance]);

    const renderSearchMode = React.useCallback(() => (
        <Animated.View
            style={{
                height: heightAnim.interpolate({
                    inputRange: [0, 0],
                    outputRange: ['0%', '95%']
                }),
                position: 'absolute',
                bottom: slideAnim,
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: theme.colors.background,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                shadowOpacity: 0.2,
                elevation: 3,
            }}>
            <Exhibitors onMapPress={onMapPress} selectExhibitor={selectExhibitor} toggleFollowUserMode={toggleFollowUserMode} toggleNavigationMode={toggleNavigationMode} navigationMode={navigationMode} />
        </Animated.View>
    ), [heightAnim, slideAnim, onMapPress, selectExhibitor]);

    const renderNormalMode = React.useCallback(() => (
        <Animated.View
            style={{
                height: heightAnim.interpolate({
                    inputRange: [60, 100],
                    outputRange: ['0%', Dimensions.get("screen").height < 800 ? '55.5%' : '52%']
                }),
                position: 'absolute',
                bottom: slideAnim,
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: theme.colors.background,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.5,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                justifyContent: 'space-around',
                paddingBottom: 20,
                elevation: 20,
            }}
        >
            {selectedExhibitor && (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'left', paddingLeft: 20, textTransform: 'capitalize', color: theme.colors.text }}>{selectedExhibitor && selectedExhibitor.name}</Text>
                        <TouchableOpacity style={{ paddingRight: 20 }} onPress={onMapPress} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            <AntDesign name="close" size={22} color={theme.customColors.activeColor} />
                        </TouchableOpacity>
                    </View>

                    <SeparatorComponent />

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 15, gap: 15, marginTop: 20 }}>
                        {selectedExhibitor.image ? (
                            <View style={{
                                width: Dimensions.get("screen").width * 0.51,
                                height: Dimensions.get("screen").height * (navigationMode && Dimensions.get("screen").height < 840 ? 0.16 : 0.185), // Ajusta la altura aquí
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                                overflow: 'hidden',
                                borderWidth: 0.15,
                                borderColor: 'darkgreen'
                            }}>
                                {isImageLoading && <ActivityIndicator size="auto" color={theme.customColors.activeColor} style={{ position: 'absolute' }} />}
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

                        <ScrollView
                            style={{
                                flex: 1,
                                maxHeight: Dimensions.get("screen").height * (navigationMode && Dimensions.get("screen").height < 840 ? 0.16 : 0.22),
                            }}
                        >
                            <Text style={{ fontSize: 17, color: theme.colors.text }}>{translating ? selectedExhibitor.description : translatedDescription}</Text>
                        </ScrollView>
                    </View>
                </>
            )}

            {selectedExhibitor ? (
                navigationMode ? (
                    <>
                        {loading ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="small" color={theme.customColors.activeColor} />
                            </View> :
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Distance getFormattedDistance={getFormattedDistance} />
                            </View>
                        }
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 10, gap: 15 }}>
                            <TouchableOpacity onPress={toggleFollowUserMode} style={buttonStyle}>
                                <MaterialCommunityIcons name="navigation" size={24} color={theme.customColors.activeColor} />
                                <Text style={{ fontSize: 15, color: theme.customColors.activeColor, fontWeight: '500' }}>{translation.bottomSheetNavigator.start}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleNavigationMode} style={buttonStyle}>
                                <MaterialCommunityIcons name="cancel" size={24} color={theme.customColors.activeColor} />
                                <Text style={{ fontSize: 15, color: theme.customColors.activeColor, fontWeight: '500' }}>{translation.bottomSheetNavigator.cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingTop: 10 }}>
                        <TouchableOpacity onPress={toggleNavigationMode} style={buttonStyle}>
                            <MaterialCommunityIcons name="arrow-right-top" size={24} color={theme.customColors.activeColor} />
                            <Text style={{ fontSize: 16, color: theme.customColors.activeColor, fontWeight: '500' }}>{translation.bottomSheetNavigator.howToGetThere}</Text>
                        </TouchableOpacity>
                    </View>
                )
            ) : null}
        </Animated.View>
    ), [heightAnim, slideAnim, selectedExhibitor, onMapPress, navigationMode, toggleNavigationMode, isImageLoading, distance, loading]);

    const buttonStyle = {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 25,
        gap: 5,
        backgroundColor: theme.colors.background,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 5,
    };

    return (
        <>
            {followUserMode ?
                <Animated.View
                    style={{
                        height: heightAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['100%', '59%']
                        }),
                        position: 'absolute',
                        bottom: slideAnim,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        backgroundColor: theme.colors.background,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowOpacity: 0.2,
                        elevation: 5,
                    }}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', fontSize: 18, fontWeight: '500', textAlign: 'left', paddingLeft: 10 }}>{translation.bottomSheetNavigator.onTheWayTo} {selectedExhibitor && selectedExhibitor.name}</Text>
                            <TouchableOpacity style={{ paddingRight: 5 }} onPress={onMapPress} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                                <AntDesign name="close" size={24} color={theme.customColors.activeColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Distance getFormattedDistance={getFormattedDistance} followUserMode={followUserMode} loading={loading} />
                            <TouchableOpacity onPress={adjustCamera} style={{
                                padding: 10, borderRadius: 25, shadowColor: '#000', backgroundColor: theme.colors.background,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.5,
                                elevation: 5,
                            }}>
                                {cameraAdjusted ? (
                                    <MaterialCommunityIcons name="crosshairs-gps" size={28} color={theme.customColors.activeColor} />
                                ) : (
                                    <MaterialCommunityIcons name="navigation-variant" size={28} color={theme.customColors.activeColor} />
                                )}
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

