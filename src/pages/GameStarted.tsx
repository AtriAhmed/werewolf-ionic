import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';
import Role from '../components/Role';

const GameStarted: React.FC = () => {
    const [started, setStarted] = useState(false)
    const players = useLiveQuery(() => db.currentGame.toArray())

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Game</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {!started ? <div className='w-full h-full flex justify-center items-center'>
                    <IonButton onClick={() => setStarted(true)}>START</IonButton>
                </div> : <div className='grid grid-cols-12 gap-4 p-5'>
                    {players?.map((player, index) => <Role key={index} role={player} showPlayerName />)}
                </div>}
            </IonContent>
        </IonPage>
    );
};

export default GameStarted;
