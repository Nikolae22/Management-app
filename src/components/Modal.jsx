import {createPortal} from "react-dom";
import {useImperativeHandle, useRef} from "react";

export default function Modal({children,ref}) {

    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog}>
            {children}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    )
}