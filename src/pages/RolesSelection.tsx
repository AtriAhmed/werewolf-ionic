import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';
import RoleType from '../models/Role';
import AddRoleCmp from '../components/AddRole';
import Role from '../components/Role';
import { add, arrowForward } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';

const RolesSelection: React.FC = () => {
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<RoleType[]>([])
    const roles = useLiveQuery(
        () => db.currentGame.toArray()
    );

    useEffect(() => {
        setSelectedRoles(roles as RoleType[])
    }, [roles])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Roles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='grid grid-cols-12 gap-4 py-5 px-5'>
                    {selectedRoles?.map((role: RoleType) => <Role key={role.id} role={role} buttonType={"delete"} />)}
                </div>
                <AddRoleCmp show={modalShow} setShow={setModalShow} />
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="flex justify-around items-center h-full">
                        <IonButton shape='round' onClick={() => setModalShow(true)}>
                            <IonIcon slot='icon-only' icon={add} className='h-6 w-6 ' />
                        </IonButton>
                        <div className='bg-white rounded-full p-2 font-bold text-blue-700 w-[36px] h-[36px] flex items-center justify-center'>{selectedRoles?.length}</div>
                        <IonButton shape='round' color="success" onClick={() => history.push(selectedRoles?.length > 6 ? "/assign-roles" : "#")} >
                            <IonIcon slot='icon-only' icon={arrowForward} className={`h-6 w-6 `} />
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default RolesSelection;
