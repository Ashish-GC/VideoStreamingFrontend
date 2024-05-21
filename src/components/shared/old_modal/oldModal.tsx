
// import { useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom'

// function Modal({children , open ,className}:{children:React.ReactNode , open:string , className:any}) {

//   const dialog:any= useRef();

//    useEffect(()=>{
//     const modal = dialog.current;
//       if(open === "openModal"){
//              modal.showModal();
//       }
//      if(open ===''){
//         modal.close();
//      }

//    },[open])
  

//   return createPortal(
//     <dialog ref={dialog}  className={className}>
//        {children}
//     </dialog>,
//     document.getElementById('modal') as HTMLElement
//   )
// }

// export default Modal ;
