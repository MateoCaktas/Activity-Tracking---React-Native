import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomHeader from "../navigation/CustomHeader";
import { Picker } from "@react-native-community/picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from "react-native-gesture-handler";

import { addActivity } from "../redux/actions";

import DateTimePicker from "@react-native-community/datetimepicker";

import CalendarIcon from "../assets/Activities/calendar-purple.png";
import ClockIcon from "../assets/Activities/watch-purple.png";

//Change activity.json file and other files (dates)

export default function AddActivity({ navigation }) {
    const [activityType, changeActivityType] = useState('Music');
    const [title, changeActivityTitle] = useState('');
    const [startDate, changeStartDate] = useState(new Date());
    const [endDate, changeEndDate] = useState(new Date());
    const [id, changeId] = useState(Math.floor(Math.random() * 1000000));

    const [showStartDate, setShowStartDate] = useState(false);
    const [mode, setMode] = useState('date');
    const [showEndDate, setShowEndDate] = useState(false);

    const add = () => {
        addActivity({ activityType, title, startDate, endDate, id });
        navigation.goBack('');
    }

    const cancel = () => {
        navigation.goBack('');
    }

    const showStartMode = currentMode => {
        setShowStartDate(true);
        setMode(currentMode);
    }

    const showStartDatePicker = () => {
        showStartMode('date')
    }

    const showStartTimePicker = () => {
        showStartMode('time')
    }

  
    const showEndMode = currentMode => {
        setShowEndDate(true);
        setMode(currentMode);
    }

    const showEndDatePicker = () => {
        showEndMode('date')
    }

    const showEndTimePicker = () => {
        showEndMode('time')
    }
    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDate(Platform.OS === 'ios');
        changeStartDate(currentDate);        
        if(mode === 'date'){
            changeEndDate(currentDate);
        }
    }

    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDate(Platform.OS === 'ios');
        changeEndDate(currentDate);        
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
            <CustomHeader title="Add Activity" navigation={navigation} />
            <View style={{ marginTop: 50, justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
                <Text style={{ width: '80%', color: 'gray' }}>Title</Text>
                
                <TextInput
                    style={styles.titleInput}
                    onChangeText={text => changeActivityTitle(text)}
                    value={title}
                    placeholder="Title"
                />
                
                <Text style={{ width: '80%', color: 'gray' }}>Category</Text>

                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={activityType}
                        style={styles.typeDropdown}
                        onValueChange={(itemValue, itemIndex) => changeActivityType(itemValue)}
                    >
                        <Picker.Item label="Music" value="Music" />
                        <Picker.Item label="Sport" value="Sport" />
                    </Picker>
                </View>

                <Text style={{ marginTop: 20, width: '80%', color: 'gray', marginBottom: 10 }}> Pick your date and time by clicking on the icons</Text>

                {/* START TIME */}
                <Text style={{ marginTop: 10, marginBottom: 10, color: 'gray' }}> Pick the date </Text>

                <View style={{ height: 50, width: '80%', marginTop: 0, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                    style={{}}
                        onPress={showStartDatePicker}
                    >
                        <Image source={CalendarIcon} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>

                    <View style={{marginLeft: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{startDate.getDate().toString()}-{startDate.getMonth().toString()}-{startDate.getFullYear().toString()}</Text>
                    </View>
                </View>

                {/* END TIME */}
                <Text style={{ marginTop: 30, marginBottom: 10, color: 'gray' }}> Pick the starting and ending time </Text>
                <View style={{ height: 50, width: '80%', marginTop: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={showStartTimePicker}>
                        <Image source={ClockIcon} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>

                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>                        
                    <Text>{startDate.getHours().toString()}:{startDate.getMinutes().toString()} - {endDate.getHours().toString()}:{endDate.getMinutes().toString()}</Text>
                    </View>

                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={showEndTimePicker}>
                        <Image source={ClockIcon} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                </View>
                {showStartDate &&
                    <DateTimePicker
                        testID="startDateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={startDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeStartDate}
                        style={{ backgroundColor: 'purple' }}
                    />
                }
                {
                    showEndDate &&
                    <DateTimePicker
                        testID="endDateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEndDate}
                        style={{ backgroundColor: 'purple' }}
                    />
                }
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={cancel}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addActivityButton}
                        onPress={add}>
                        <Text style={styles.addActivityButtonText}> Save </Text>
                    </TouchableOpacity>
                </View>

            </View>
            </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleInput: {
        height: 50,
        borderColor: 'purple',
        borderWidth: 2, width: '80%',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    pickerWrapper: {
        width: '80%',
        borderColor: 'purple',
        borderWidth: 2,
        borderRadius: 5
    },
    typeDropdown: {
        height: 50
    },
    buttons: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cancelButton: {
        marginTop: 50,
        width: 120,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'purple'
    },
    cancelButtonText: {
        color: 'purple'
    },
    addActivityButton: {
        marginTop: 50,
        width: 120,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addActivityButtonText: {
        color: 'white'
    }
})