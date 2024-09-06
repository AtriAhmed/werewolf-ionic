import React from "react";
import { db } from "../../db";
import { IonIcon } from "@ionic/react";
import { close, closeCircle } from "ionicons/icons";
import RoleType from "../models/Role";

export default function Role({
    role,
    hidden,
    buttonType,
    addRole,
    imgHeight,
    imgWidth,
    textStyle,
    showPlayerName,
}: { role: RoleType, hidden?: boolean, buttonType?: string, addRole?: () => void, imgHeight?: number, imgWidth?: number, textStyle?: string, showPlayerName?: boolean }) {
    async function deleteRole(role: RoleType) {
        db.currentGame.delete(role.id);
    }
    return (
        <div
            className=" col-span-4 sm:col-span-3 flex flex-col gap-1 justify-center items-center relative"
            key={role.id}
        >
            <img
                src={hidden ? "images/hidden.jpg" : "images/roles/" + role.image}
                style={{
                    width: `${imgWidth ? imgWidth + "px" : "100%"}`,
                    height: `${imgHeight ? imgHeight + "px" : "100%"}`,
                }}
                className={`rounded`}
            />

            <div className="font-bold">
                {role.player && showPlayerName ? role.player : ""}
            </div>
            <div className={`font-bold ${textStyle}`}>
                {hidden ? "" : role.name}
            </div>
            {buttonType == "delete" ? (
                <button
                    className="absolute top-0 right-0 rounded-full bg-red-500 w-6 h-6 flex justify-center items-center"
                    onClick={() => deleteRole(role)}
                >
                    <IonIcon icon={close} className="text-white w-5 h-5" />
                </button>
            ) : buttonType == "add" ? (
                <button
                    className="text-xl absolute top-0 right-0 bg-blue-500 rounded-full w-7 h-7 text-center"
                    onClick={addRole}
                >
                    +
                </button>
            ) : (
                ""
            )}
        </div>
    );
}
