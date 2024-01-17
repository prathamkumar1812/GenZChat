import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),  
    username:Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter a username'),
    email: Yup.string().email('Invalid email').required('Please enter a valid email address'),
    password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
});

export const SignInSchema = Yup.object({ 
    // username:Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter a username'),
    email: Yup.string().email('Invalid email').required('Please enter a valid email address'),
    password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
});