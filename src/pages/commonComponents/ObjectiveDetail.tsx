import React from 'react';
import Realm from 'realm';
import { View, Text, Button } from 'react-native';
import { ObjectiveDetailScreenProps } from '../../../App';
import { useObject, useRealm } from '@realm/react';
import { Objective } from '../../../realm/models';

const ObjectiveDetail = ({
  route,
  navigation,
}: ObjectiveDetailScreenProps): React.ReactElement => {
  const id = new Realm.BSON.ObjectId(route.params._id);
  const realm = useRealm();
  const objective = useObject<Objective>('Objective', id);
  const todos = objective?.todos;

  const deleteObjective = () => {
    navigation.goBack();
    realm.write(() => {
      realm.delete(todos);
      realm.delete(Objective);
    });
  };

  return (
    <View>
      <Text>Objective id: </Text>
      <Button
        title='delete'
        onPress={() => {
          deleteObjective();
        }}></Button>
    </View>
  );
};

export default ObjectiveDetail;
