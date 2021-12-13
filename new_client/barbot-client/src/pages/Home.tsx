import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Home.css';

import React, {useEffect} from 'react';
import Recipes from '../components/recipes/Recipes';
import {useActions} from '../hooks/useAction';

const Home: React.FC = () => {
  const { getRecipes, getIngredients } = useActions();

  useEffect(() => {
    getRecipes();
    getIngredients();
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barbot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Recipes/>
      </IonContent>
    </IonPage>
  );

};

export default Home;
