import React from 'react';
import {IonImg, IonItem, IonLabel, IonList, IonThumbnail} from '@ionic/react';
import {useSelectors} from '../../hooks/useSelectors';
import {useActions} from '../../hooks/useAction';

const Recipes: React.FC = () => {
  const { getRecipes } = useSelectors();
  const { serve } = useActions();

  const recipes = getRecipes();

  const onClick = async (recipe: any) => {
    await serve(recipe);
  };

  return (
    <IonList>
      {recipes.map((recipe: any) => (
          <IonItem key={recipe?.id} onClick={() => onClick(recipe)}>
            <IonThumbnail slot="start">
              <IonImg src={`assets/images/cocktails/${recipe?.image}`}/>
            </IonThumbnail>
            <IonLabel>
              {recipe?.name}
            </IonLabel>
          </IonItem>
        )
      )}
    </IonList>
  );
};

export default Recipes;
