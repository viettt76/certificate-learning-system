import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const convertBufferToBase64 = (buffer = '') => {
    if (buffer) {
        return new Buffer(buffer, 'base64').toString('binary');
    } else {
        return '';
    }
};

export const formatPrice = (price, style) => {
    switch (style) {
        case 'VND':
            return price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        case 'USD':
            return price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        default:
            return price;
    }
};

export const secondsConvertHoursAndMinutesAndSeconds = (seconds) => {
    let h = (seconds - (seconds % 3600)) / 3600;
    let m = (seconds - h * 3600 - ((seconds - h * 3600) % 60)) / 60;
    let s = seconds % 60;
    return { h, m, s };
};

export const customToast = (type, message) => {
    switch (type) {
        case 'info':
            return toast.info(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        case 'success':
            return toast.success(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        case 'warning':
            return toast.success(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        case 'error':
            return toast.success(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        default:
            return toast(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
    }
};
