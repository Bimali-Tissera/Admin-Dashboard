
export interface ModalProps{
    modalOpen:boolean
    setModalOpen:(open:boolean)=> boolean | void;
    children: React.ReactNode
}
const modalBoxStyle = {
    width: "auto", // Adjust the width
    height: "auto", // Auto adjusts to content up to the max-height
    // Enables scrolling within the modal if content exceeds the height
};

const Modal:React.FC<ModalProps> = ({modalOpen,setModalOpen,children})=> {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`} >
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button 
                onClick={() => setModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
                
            </div>
        </div>
    );
}

export default Modal;