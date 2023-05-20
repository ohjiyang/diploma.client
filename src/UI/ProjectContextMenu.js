import React, {useEffect, useRef} from 'react';
import {RiEditBoxLine, RiDeleteBin7Line, RiFileTransferLine} from "react-icons/ri";

const ProjectContextMenu = ({pageX, pageY, onCloseContextMenu, onShareProject, onEditProject, onDeleteProject})=> {
    const useOnClickOutside = (ref, handler) => {
        useEffect(
            () => {
                const listener = (event) => {
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            [ref, handler]
        );
    }

    const contextMenuRef = useRef()
    useOnClickOutside(contextMenuRef, onCloseContextMenu)

    const handleOnEditProject = () => {
        onEditProject()
        onCloseContextMenu()
    }

    const handleOnDeleteProject = () => {
        onDeleteProject()
        onCloseContextMenu()
    }

    const handleOnShareProject = () => {
        onShareProject()
        onCloseContextMenu()
    }

    return (
        <div>
            <div className={"projectContextMenu"} style={{top: `${pageY}px`, left: `${pageX}px`}} ref={contextMenuRef}>
                <div className={"projectContextMenu__body"}>
                    <button className={"projectContextMenu__button"} onClick={handleOnEditProject}>
                        Поменять название
                        <RiEditBoxLine size={20}/>
                    </button>
                    <button className={"projectContextMenu__button"} onClick={handleOnShareProject}>
                        Поделиться
                        <RiFileTransferLine size={20}/>
                    </button>
                    <button className={"projectContextMenu__button"} onClick={handleOnDeleteProject}>
                        Удалить
                        <RiDeleteBin7Line size={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectContextMenu;