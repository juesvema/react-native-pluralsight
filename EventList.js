import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import uuid from 'uuid';
import { getEvents } from './api';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 5,
    },
});

class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt,
                    timer: Date.now(),
                })),
            });
        }, 1000);
        this.props.navigation.addListener(
            'didFocus',
            () => {
                getEvents().then(events => this.setState({ events }))
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        );
    }

    handleAddEvent = () => {
        this.props.navigation.navigate('form')
    }

    render() {
        return [
            <FlatList
                style={styles.list}
                data={this.state.events}
                renderItem={({ item }) => <EventCard event={item} />}
                key={uuid()}
            />,
            <ActionButton
                key={uuid()}
                buttonColor="rgba(231,76,60,1)"
                onPress={this.handleAddEvent}
            />,
        ];
    }
}

export default EventList;