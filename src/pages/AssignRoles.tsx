import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';
import RoleType from "../models/Role"
import Role from '../components/Role';
import { arrowForward, eyeOffOutline, eyeOutline } from 'ionicons/icons';

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const AssignRoles: React.FC = () => {
    const history = useHistory();
    const [playerName, setPlayerName] = useState("");

    const [visible, setVisible] = useState(false);

    const [currentRole, setCurrentRole] = useState(0);

    const roles = useLiveQuery(() => db.currentGame.toArray());
    const [mixedRoles, setMixedRoles] = useState<RoleType[]>([]);

    const next = () => {
        const newArray = mixedRoles.map((item: any) => {
            if (mixedRoles[currentRole].id === item.id) {
                // Create a new object with the same properties as the old object, except for the "name" property
                return { ...item, player: playerName };
            } else {
                // Return the original object unmodified
                return item;
            }
        });
        setMixedRoles(newArray);
        setCurrentRole((prev) => prev + 1);
        setVisible(false);
        setPlayerName("");
        if (currentRole == mixedRoles.length - 1) {
            db.currentGame.bulkPut(newArray);
            history.push("/game-started");
        }
    };

    useEffect(() => {
        if (roles) {
            const shuffledArray = shuffleArray([...roles]);
            setMixedRoles(shuffledArray);
        }
    }, [roles]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Assign Roles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {currentRole == mixedRoles?.length ?
                    <div className='h-full flex justify-center items-center flex-col'>
                        <IonText>Roles Assignment Is Finished</IonText>
                        <div>
                            <IonButton color="danger" onClick={() => history.push("/roles")}>New Game</IonButton>
                            <IonButton color="success" onClick={() => history.push("game-started")}>Continue</IonButton>
                        </div>
                    </div> :
                    <div className='py-5'>
                        <div className="flex flex-col gap-4 justify-center items-center h-full overflow-auto">
                            <Role
                                role={mixedRoles ? mixedRoles[currentRole] : {} as RoleType}
                                hidden={!visible}
                                imgHeight={visible ? 300 : 328}
                                textStyle="text-xl"
                            />

                            <div className="flex justify-center items-center">
                                <IonInput
                                    placeholder="Player Name"
                                    type="text"
                                    name="name"
                                    className="p-2"
                                    onIonInput={(e: any) => setPlayerName(e.detail.value)}
                                    value={playerName}
                                />
                            </div>
                        </div>
                    </div>
                }
            </IonContent>
            {currentRole == mixedRoles?.length ? <></> :
                <IonFooter>
                    <IonToolbar>
                        <div className="flex justify-around items-center h-full">
                            <button
                                className="flex flex-col items-center text-center bg-blue-400 rounded-full p-2"
                                onClick={() => setVisible(!visible)}
                            >
                                <IonIcon
                                    icon={visible ? eyeOffOutline : eyeOutline}
                                    className="h-6 w-6 text-white"
                                />
                            </button>

                            <button
                                onClick={next}
                                disabled={!playerName || !visible}
                                className={`flex flex-col items-center text-center rounded-full p-2 text-white ${!playerName || !visible
                                    ? "bg-gray-200 cursor-auto"
                                    : "bg-green-500"
                                    }`}
                            >
                                <IonIcon icon={arrowForward} className={`h-6 w-6 `} />
                            </button>
                        </div>
                    </IonToolbar>
                </IonFooter>}
        </IonPage>
    );
};

export default AssignRoles;
