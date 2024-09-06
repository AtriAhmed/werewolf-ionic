import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { db } from '../../db';
import { debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Role from './Role';
import Modal from './Modal';
import RoleType from "../models/Role";
import { IonContent } from '@ionic/react';

export default function AddRoleCmp({ show, setShow }: { show: boolean, setShow: (state: boolean) => any }) {

    const [selectedRoles, setSelectedRoles] = useState<RoleType[]>([])

    const currentRoles = useLiveQuery(
        () => db.currentGame.toArray()
    );

    const roles = useLiveQuery(
        () => db.roles.toArray()
    );

    useEffect(() => {
        setSelectedRoles(currentRoles as RoleType[])
    }, [currentRoles])

    function addRole(role: RoleType) {
        if (canAdd(role)) {
            console.log(selectedRoles?.length)
            role.id = uuidv4();
            db.currentGame.add(role).then(res => {
                console.log("success")
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log("not added")
        }
    }


    const canAdd = (role: RoleType) => {
        if (selectedRoles?.some((currentRole: RoleType) => currentRole.name == role.name) && role.repeat == false) {
            return false
        }
        return true
    }

    return (
        <Modal title="Add Role" show={show} setShow={setShow}>
            <IonContent>
                <div className='p-5'>
                    <div className='grid grid-cols-12 gap-2 p-2'>{roles?.map((role, index) => <Role key={role.id} role={role} textStyle='' buttonType={canAdd(role) ? "add" : ""} addRole={() => addRole(role)} />)}</div>
                </div>
            </IonContent>
        </Modal>
    )
}
