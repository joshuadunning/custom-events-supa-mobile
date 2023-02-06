import React from 'react';
import { Button, View, Text } from 'react-native';
import ROUTES from '../../router/routes';

const Event = ({navigation}: any) => {
    return (
        <View>
            <Text>Event</Text>
            <Button title={"Go to Dashboard"} onPress={() => navigation.navigate(ROUTES.DASHBOARD)} />
        </View>
    );
};

export default Event;
