import { Buffer } from 'buffer';

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
