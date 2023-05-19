import React, {useEffect, useRef} from 'react';
import {RiEditBoxLine, RiDeleteBin7Line, RiFileTransferLine} from "react-icons/ri";

const ProjectContextMenu = ({pageX, pageY, onCloseContextMenu})=> {
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

    return (
        <div>
            <div className={"projectContextMenu"} style={{top: `${pageY}px`, left: `${pageX}px`}} ref={contextMenuRef}>
                <div className={"projectContextMenu__body"}>
                    <button className={"projectContextMenu__button"}>
                        Поменять название
                        <RiEditBoxLine size={20}/>
                    </button>
                    <button className={"projectContextMenu__button"}>
                        Поделиться
                        <RiFileTransferLine size={20}/>
                    </button>
                    <button className={"projectContextMenu__button"}>
                        Удалить
                        <RiDeleteBin7Line size={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectContextMenu;