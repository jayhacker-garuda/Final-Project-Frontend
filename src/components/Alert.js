
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const SimpleSuccess = (message) => {

    Swal.fire({
        icon: 'success',
        title: message ? message : null,
        
    })
}
const SimpleError = (message) => {

    Swal.fire({
        icon: 'error',
        title: message ? message : null,
        
    })
}

const ToastErrorSuccess = (error) => {

    Toast.fire({
        icon: error ? 'error' : 'success',
        title: error ? error : 'Signed in successfully',
    })
}




export {
    ToastErrorSuccess,
    SimpleSuccess,
    SimpleError
}