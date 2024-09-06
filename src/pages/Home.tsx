import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useHistory } from 'react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { db } from "../../db"

const Home: React.FC = () => {

  const history = useHistory();
  const [playersNumber, setPlayersNumber] = useState<number>(0)

  const roles = useLiveQuery(
    () => db.roles.limit(playersNumber).toArray()
    , [playersNumber]);

  const handleChange = (e: any) => {
    setPlayersNumber(e.detail.value)
  }

  const startGame = () => {
    db.currentGame.clear().then((res) => {
      console.log(roles)
      db.currentGame.bulkPut(roles as any).then(res => {
        console.log(res)
        history.push("/roles")
      }).catch((err: any) => {
        console.log(err);
      })
    })

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Werewolf by Ahmed Atri</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='h-full flex flex-col justify-center items-center gap-4'>
          <IonInput className='text-center' placeholder='Players Number (7 minimum)' type="number" onIonInput={handleChange} />
          <IonButton onClick={startGame}>START</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
