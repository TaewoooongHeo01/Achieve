import React from 'react';
import Realm from 'realm';
import { View, Text, Button } from 'react-native';
import { DistanceDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { Distance } from '../../../realm/models';

const DistanceDetail = ({
  route,
  navigation,
}: DistanceDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const realm = useRealm();
  const Distance = useObject<Distance>('Distance', id);
  const todos = Distance?.todos;

  const deleteDistance = () => {
    navigation.goBack();
    realm.write(() => {
      realm.delete(todos);
      realm.delete(Distance);
    });
  };

  return (
    <View>
      <Text>Distance id: </Text>
      <Button
        title='delete'
        onPress={() => {
          deleteDistance();
        }}></Button>
    </View>
  );
};

export default DistanceDetail;
