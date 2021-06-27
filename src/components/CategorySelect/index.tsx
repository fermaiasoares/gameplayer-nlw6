import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import Category from '../Category';

import { styles } from './styles';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
}

const CategorySelect: React.FC<Props> = ({ 
  categorySelected, 
  setCategory,
  hasCheckBox = false
}) => {

  return(
    <ScrollView 
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        categories.map(category => (
          <Category 
            key={category.id} 
            title={category.title} 
            icon={category.icon} 
            checked={category.id === categorySelected}
            hasCheckBox={hasCheckBox}
            onPress={() => setCategory(category.id)}
          />
        ))
      }
    </ScrollView>
  );

}
export default CategorySelect;