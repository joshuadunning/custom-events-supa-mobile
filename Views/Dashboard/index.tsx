import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import ROUTES from '~/router/routes';
import { supabase } from '~/lib/supabase';

const Dashboard = ({navigation}:any) => {
    return (
        <SafeAreaView style={{marginTop: 40}}>
            <Text>Dashboard</Text>
            <Button title={"Go to Event"} onPress={() => navigation.navigate(ROUTES.EVENT)} />
            <Button
                title="Sign Out"
                onPress={() => supabase.auth.signOut()}
            />
        </SafeAreaView>
    );
};

export default Dashboard;
