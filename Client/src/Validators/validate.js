import {toast} from 'react-hot-toast'

/*************validate reset password************** */
export async function resetPasswordValidation(values) {
    const errors = resetPasswordVerify({}, values); 
    return errors;
}

/*****validate reset Password**** */
function resetPasswordVerify(errors = {}, values) {
    if (values.password !== values.confirm_password) {
        errors.password=toast.error('Passwords not match')
    } else if (values.password.includes(' ')) {
        errors.password=toast.error('Invalid password!')
    } else if (values.password.length < 5) {
        errors.password=toast.error('Password must contain minimum 5 characters')
    }

}