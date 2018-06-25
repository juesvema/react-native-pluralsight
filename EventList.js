import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import uuid from 'uuid';

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
        const events = require('./db.json').events.map(e => ({
            ...e,
            date: new Date(e.date),
        }));
        this.setState({ events });
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
                keyExtractor={item => item.id}
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